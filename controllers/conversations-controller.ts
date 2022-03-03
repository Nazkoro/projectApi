import conversationsService from "../service/conversations-service";

class ConversationController {
  addNewConversation(req, res) {
    console.log(req.body);
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
}

export default new ConversationController();
