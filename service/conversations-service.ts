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
      // { $project: { _id: { $toLower: "$_id" } } },
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
    // const conversation = await Conversation.find({
    //   members: { $in: [userId] },
    // });
    // console.log("conversation", conversation);
    return conversation;
  }

  async removeConversation(id) {
    console.log(111);
    const deleteMessage = await Message.deleteMany({
      conversationId: id,
    });
    console.log("delete message ", deleteMessage);
    const conversation = await Conversation.findByIdAndDelete(id);
    // console.log("delete message ", deleteMessage);
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
