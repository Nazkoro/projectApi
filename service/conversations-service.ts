import Conversation from "../models/Conversation";
import Message from "../models/Message";
import User from "../models/User";
import PostModel from "../models/Post";

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
    console.log(
      "=========================conversation================",
      conversation
    );
    // const conversation = await Conversation.find({
    //   members: { $in: [userId] },
    // });
    // console.log("conversation", conversation);
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
