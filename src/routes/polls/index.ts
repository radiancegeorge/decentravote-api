import { Router } from "express";
import { pollsFeed } from "../../controllers/polls";
import { PollsFeedValidation } from "../../middlewares/validations";
import { partialUserProtect } from "../../middlewares/protect";

const polls = Router();
polls.route("/").get(partialUserProtect, PollsFeedValidation, pollsFeed);

export default polls;
