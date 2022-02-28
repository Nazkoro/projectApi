import Conversation from "../models/Conversation";

class ConversationService {
  async createNewConversation(senderId, receiverId) {
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    const savedConversation = await newConversation.save();
    return savedConversation;
  }

  async printConversationOfUser(userId) {
    console.log(userId);
    const conversation = await Conversation.find({
      members: { $in: [userId] },
    });
    console.log("conversation", conversation);
    return conversation;
  }

  async printconversationIncludesOfTwoUserId(firstUserId, secondUserId) {
    const conversation = await Conversation.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    return conversation;
  }
}

export default new ConversationService();
