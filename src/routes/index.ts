import { Router } from "express";
import auth from "./auth";
import project from "./project";
import polls from "./polls";

const router = Router();

router.use("/auth", auth);
router.use("/project", project);
router.use("/poll", polls);

export default router;
