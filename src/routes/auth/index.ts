import { Router } from "express";
import { Authenticate, RequestAuth } from "../../controllers/auth";
import {
  AuthValidation,
  ReqSignInValidation,
} from "../../middlewares/validations";

const auth = Router();

auth
  .route("/:walletAddress?")
  .get(ReqSignInValidation, RequestAuth)
  .post(AuthValidation, Authenticate);

export default auth;
