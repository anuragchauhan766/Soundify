import { Response, Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { CustomRequest } from "../types/express/index.js";
const router = Router();

router.get("/", authenticate, (req: CustomRequest, res: Response) => {
  res.json(req.user);
  res.json({ message: "protected route" });
});
export default router;
