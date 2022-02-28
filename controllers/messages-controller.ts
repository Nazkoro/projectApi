import messagesService from "../service/messages-service";

class MessagesController {
  postMessage(req, res) {
    console.log("postMessage", req);
    return messagesService.addMessage(req.body);
  }

  getMessages(req, res) {
    return messagesService.printMessages(req.params.conversationId);
  }
}

export default new MessagesController();
