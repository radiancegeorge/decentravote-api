import { Router } from "express";
import auth from "./auth";
import project from "./project";

const router = Router();

router.use("/auth", auth);
router.use("/project", project);

export default router;
