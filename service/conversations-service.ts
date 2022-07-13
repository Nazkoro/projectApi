import Conversation from "../models/Conversation";
import Message from "../models/Message";

class ConversationService {
  async createNewConversation(senderId, receiverId) {
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });
    const savedConversation = await newConversation.save();
    return savedConversation;
  }

  async printConversationOfUser(userId) {
    const conversation = await Conversation.aggregate([
      { $match: { members: { $in: [userId] } } },
      {
        $lookup: {
          from: Message.collection.name,
          localField: "_id",
          foreignField: "conversationId",
          as: "ListMessage",
        },
      },
    ]);

    return conversation;
  }

  async removeConversation(id) {;
    const deleteMessage = await Message.deleteMany({
      conversationId: id,
    });
    const conversation = await Conversation.findByIdAndDelete(id);
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
