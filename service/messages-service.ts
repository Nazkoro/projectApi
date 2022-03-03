import Message from "../models/Message";

class ConversationService {
  async addMessage(body) {
    const newMessage = new Message(body);
    const savedMessage = await newMessage.save();
    console.log("line 7 savedMessage", savedMessage);
    const messages = await Message.findById(savedMessage._id).populate(
      "sender"
    );
    console.log(" line 10 messages", messages);
    return messages;
  }

  async printMessages(conversatinId) {
    const messages = await Message.find({
      conversationId: conversatinId,
    }).populate("sender");

    return messages;
  }
}

export default new ConversationService();
