import multiConversationsService from "../service/multi-conversations-service";

class MultiConversationController {
  addNewConversation(req, res) {
    console.log(req.body);
    return multiConversationsService.createNewConversation(
      req.body.senderId,
      req.body.receiverId
    );
  }

  getConversationOfUser(req, res) {
    return multiConversationsService.printConversationOfUser(req.params.userId);
  }

  getconversationIncludesOfTwoUserId(req, res) {
    return multiConversationsService.printconversationIncludesOfUserId(
      req.params.firstUserId,
      req.params.secondUserId
    );
  }
}

export default new MultiConversationController();
