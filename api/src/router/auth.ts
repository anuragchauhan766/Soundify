import { Router } from "express";
import { login, refresh, signup } from "../controller/auth.controller.js";

const router = Router();

router.post("/login", login);

router.post("/signup", signup);
router.post("/refresh", refresh);
export default router;
