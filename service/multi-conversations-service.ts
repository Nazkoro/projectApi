import MultuConversation from "../models/MultiConversation";

class MultiConversationService {
  async createNewConversation(userList) {
    const listId = userList.map((item) => item._id);
    const newConversation = new MultuConversation({
      members: [...listId],
    });
    const savedConversation = await newConversation.save();
    return savedConversation;
  }

  async printConversationOfUser(userId) {
    console.log(userId);
    const conversation = await MultuConversation.find({
      members: { $in: [userId] },
    }).populate("members");
    return conversation;
  }

  async printconversationIncludesOfUserId(firstUserId, araySecondUserId) {
    const conversation = await MultuConversation.findOne({
      members: { $all: [firstUserId, ...araySecondUserId] },
    });
    return conversation;
  }
}

export default new MultiConversationService();
