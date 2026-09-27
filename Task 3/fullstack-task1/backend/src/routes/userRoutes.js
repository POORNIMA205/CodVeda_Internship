import { Router } from "express";
import { profile, listUsers, updateRole } from "../controllers/userController.js";
import { protect, requireRole } from "../middleware/auth.js";
const router = Router();
router.get("/profile", protect, profile);
router.get("/", protect, requireRole("admin"), listUsers);
router.patch("/:id/role", protect, requireRole("admin"), updateRole);
export default router;
