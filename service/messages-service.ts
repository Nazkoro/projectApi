import Message from "../models/Message";

class ConversationService {
  async addMessage(body) {
    const newMessage = new Message(body);
    const savedMessage = await newMessage.save();
    return savedMessage;
  }

  async printMessages(conversatinId) {
    const messages = await Message.find({
      conversationId: conversatinId,
    });
    return messages;
  }
}

export default new ConversationService();
