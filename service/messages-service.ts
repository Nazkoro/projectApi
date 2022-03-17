import Message from "../models/Message";

class ConversationService {
  async addMessage(body) {
    const newMessage = new Message(body);
    const savedMessage = await newMessage.save();
    const messages = await Message.findById(savedMessage._id).populate(
      "sender"
    );
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
