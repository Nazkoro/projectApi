import UserModel from "../models/User";
import TokenModel from "../models/Token";

class UserService {
  async getAllUsers() {
    const users = await UserModel.find();
    // console.log(users);
    return users;
  }

  async getOnlineAllUsers() {
    // eslint-disable-next-line
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
    // const users = await UserModel.find({ _id: { $in: arrayUserID } });
    // console.log("users", users);
    return online;
  }

  // update user
  async updUser(id, bodyOfPost) {
    const user = await UserModel.findByIdAndUpdate(id, {
      $set: bodyOfPost,
    });
    // user.save()
    return user;
  }

  // delete user
  async removeUser(id) {
    await UserModel.findByIdAndDelete(id);
    return "Account has been deleted";
  }

  // get a user
  async printUser(id) {
    const user = await UserModel.findById(id);
    // console.log("user", user);
    // console.log("user._id.toString()", user._id.toString());
    return user;
    // const username = usrname;
    //
    // const user = userId
    //   ? await UserModel.findById(userId)
    //   : await UserModel.findOne({ username });
    // const { password, updatedAt, ...other } = user._doc;
    // return other;
  }

  // get friends
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

  // get myFriends
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
    console.log("=================Myfriends", friendList);
    return friendList;
  }

  // follow a user

  async followUser(id, userId) {
    const user = await UserModel.findById(id);
    const currentUser = await UserModel.findById(userId);
    if (!user.followers.includes(userId)) {
      await user.updateOne({ $push: { followers: userId } });
      await currentUser.updateOne({ $push: { followings: id } });
      return id;
    }
    // return res.status(403).json("you allready follow this user");
    return "you allready follow this user";
  }

  // unfollow a user

  async unfollowUser(id, userId) {
    const user = await UserModel.findById(id);
    const currentUser = await UserModel.findById(userId);
    if (user.followers.includes(userId)) {
      await user.updateOne({ $pull: { followers: userId } });
      await currentUser.updateOne({ $pull: { followings: id } });
      return "user has been unfollowed";
    }
    // return res.status(403).json("you dont follow this user");
    return "you dont follow this user";
  }
}
export default new UserService();
