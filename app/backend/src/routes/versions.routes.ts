import { Router } from "express";
import {
    publishVersion,
    getVersion,
    rollbackVersion,
    deleteVersion,
    verifyVersion,
} from "../controllers/versions.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router({ mergeParams: true });

router.post("/", requireAuth, publishVersion);
router.get("/:version", getVersion);
router.post("/:version/rollback", requireAuth, rollbackVersion);
router.delete("/:version", requireAuth, deleteVersion);
router.post("/:version/verify", requireAuth, verifyVersion);

export default router;