import UserModel from "../models/User";

class UserService {
  async getAllUsers() {
    const users = await UserModel.find();
    // console.log(users);
    return users;
  }

  // update user
  async updUser(id, bodyOfPost) {
    const user = await UserModel.findByIdAndUpdate(id, {
      $set: bodyOfPost,
    });
    return "Account has been updated";
  }

  // delete user
  async removeUser(id) {
    await UserModel.findByIdAndDelete(id);
    return "Account has been deleted";
  }

  // get a user
  async printUser(id, usrname) {
    const userId = id;
    const username = usrname;

    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username });
    const { password, updatedAt, ...other } = user._doc;
    return other;
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
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    return friendList;
  }

  // follow a user

  async followUser(id, userId) {
    const user = await UserModel.findById(id);
    const currentUser = await UserModel.findById(userId);
    if (!user.followers.includes(userId)) {
      await user.updateOne({ $push: { followers: userId } });
      await currentUser.updateOne({ $push: { followings: id } });
      return "user has been followed";
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
