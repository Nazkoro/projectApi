import Message from "../models/Message";

class ConversationService {
  async addMessage(body) {
    console.log("body", body);
    const newMessage = new Message(body);
    const savedMessage = await newMessage.save();
    console.log(savedMessage);
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
