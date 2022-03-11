import MultuConversation from "../models/MultiConversation";

class MultiConversationService {
  async createNewConversation(userList) {
    const listId = userList.map((item) => item._id);
    const newConversation = new MultuConversation({
      members: [...listId],
    });
    console.log("========members==========", newConversation);
    const savedConversation = await newConversation.save();
    return savedConversation;
  }

  async printConversationOfUser(userId) {
    console.log(userId);
    const conversation = await MultuConversation.find({
      members: { $in: [userId] },
    });
    console.log("conversation", conversation);
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
