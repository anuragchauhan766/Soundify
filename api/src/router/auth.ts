import { Router } from "express";
import {
  forgotpassword,
  login,
  refresh,
  resetpassword,
  signup,
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
export default router;
