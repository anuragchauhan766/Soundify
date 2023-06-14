import { Router } from "express";
import {
  forgotpassword,
  login,
  refresh,
  resetpassword,
  sendVerificationMail,
  signup,
  verifyemail,
} from "../controller/auth.controller.js";
import { checkSchema } from "express-validator";
import {
  loginschema,
  registrationSchema,
  validate,
} from "../utils/validator.js";

const router = Router();

router.post("/login", validate(checkSchema(loginschema)), login);

router.post("/signup", validate(checkSchema(registrationSchema)), signup);
router.post("/refresh", refresh);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetpassword);
router.get("/verifyemail", verifyemail);
router.post("/send-verification-mail", sendVerificationMail);
export default router;
