import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import { getProfile, updateProfile } from "../controllers/profile.controller";

const r = Router();
r.use(requireAuth);
r.get("/", getProfile);
r.put("/", updateProfile);

export default r;
