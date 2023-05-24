import { Router } from "express";
import {
  forgotpassword,
  login,
  refresh,
  signup,
} from "../controller/auth.controller.js";

const router = Router();

router.post("/login", login);

router.post("/signup", signup);
router.post("/refresh", refresh);
router.post("/forgotpassword", forgotpassword);
export default router;
