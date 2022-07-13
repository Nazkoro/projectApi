import UserModel from "../models/User";
import TokenModel from "../models/Token";

class UserService {
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async printRecommindations(userId) {
    const client = await UserModel.findById(userId)
    const users = await UserModel.find();

    const result = []
    users.forEach(user => {
      let observerUser = this.isEqual(client, user)
      if(observerUser.count > 0 && observerUser.user.email !== client.email) {
        result.push(observerUser)
      }
    })

    result.sort((a, b) => {
      return b.count - a.count
    });
    const readyUsers = result.map((current) => current.user)

    return readyUsers;
  }

  isEqual(obj1, obj2){
    const props1 = Object.getOwnPropertyNames(obj1.toObject())
    const skipFields = ['followers','followings','gender','isActivated','isAdmin','profilePicture','__v']
    let count = 0

    for(let i = 0; i < props1.length; i++){
      const prop = props1[i]
      if(obj1[prop] == obj2[prop] && !skipFields.includes(prop)){
        count++
      }
    }
    return {user: obj2, count}
  }

  async getUserByUsername(name) {
    const user = await UserModel.find({ username: name });
    return user;
  }

  async UserByUsername(username) {
    const user = await UserModel.find({ username });
    return user;
  }

  async getUserInfoById(firstUserId, secondUserId) {
    const user1 = await UserModel.findById(firstUserId);
    const user2 = await UserModel.findById(secondUserId);
    return [user1, user2];
  }

  async getOnlineAllUsers() {
    let arrayUserID = [];
    const usersOnline = await TokenModel.find();

    usersOnline.forEach((currentToken) => {
      arrayUserID.push(currentToken.user);
    });
    const online = await Promise.all(
      arrayUserID.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );

    return online;
  }

  async updUser(id, bodyOfPost) {
    const user = await UserModel.findByIdAndUpdate(id, {
      $set: bodyOfPost,
    });
    return user;
  }

  async removeUser(id) {
    await UserModel.findByIdAndDelete(id);
    return "Account has been deleted";
  }

  async printUser(id) {
    const user = await UserModel.findById(id);
    return user;
  }

  async printChatUser(userId, usrname) {
    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username: usrname });
    const { password, updatedAt, ...other } = user._doc;
    return other;
  }

  async printFriends(id) {
    const user = await UserModel.findById(id);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );
    const friendList = [];
    // eslint-disable-next-line array-callback-return
    friends.map((friend) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, username, coverPicture } = friend;
      friendList.push({ _id, username, coverPicture });
    });
    console.log("friendList", friendList);
    return friendList;
  }

  async printMyFriends(id) {
    const user = await UserModel.findById(id);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );
    const friendList = [];
    // eslint-disable-next-line array-callback-return
    friends.map((friend) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, username, coverPicture } = friend;
      friendList.push({ _id, username, coverPicture });
    });
    return friendList;
  }

  async followUser(id, userId) {
    const user = await UserModel.findById(id);
    const currentUser = await UserModel.findById(userId);
    if (!user.followers.includes(userId)) {
      await user.updateOne({ $push: { followers: userId } });
      await currentUser.updateOne({ $push: { followings: id } });
      return id;
    }
    return "you allready follow this user";
  }

  async unfollowUser(id, userId) {
    const user = await UserModel.findById(id);
    const currentUser = await UserModel.findById(userId);
    if (user.followers.includes(userId)) {
      await user.updateOne({ $pull: { followers: userId } });
      await currentUser.updateOne({ $pull: { followings: id } });
      return "user has been unfollowed";
    }
    return "you dont follow this user";
  }
}
export default new UserService();
