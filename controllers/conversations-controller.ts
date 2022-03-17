import conversationsService from "../service/conversations-service";

class ConversationController {
  addNewConversation(req, res) {
    return conversationsService.createNewConversation(
      req.body.senderId,
      req.body.receiverId
    );
  }

  getConversationOfUser(req, res) {
    return conversationsService.printConversationOfUser(req.params.userId);
  }

  getconversationIncludesOfTwoUserId(req, res) {
    return conversationsService.printconversationIncludesOfTwoUserId(
      req.params.firstUserId,
      req.params.secondUserId
    );
  }

  deleteConversation(req, res) {
    console.log(req.params);
    console.log("deleteConversation");
    console.log("LOL KEK", req.params.id);
    return conversationsService.removeConversation(req.params.id);
  }
}

export default new ConversationController();
