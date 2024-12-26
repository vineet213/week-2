import {Router} from "express";
import {protectRoute,requireAdmin} from "../middleware/auth.middleware.js"
import { checkAdmin,createAlbum,deleteAlbum,createSong,deleteSong } from "../controller/admin.controller.js";

const router = Router();

router.get("/check",protectRoute,requireAdmin,checkAdmin)

router.post("/songs", protectRoute, requireAdmin, createSong);
router.delete("/songs/:id",protectRoute,requireAdmin,deleteSong)

router.post("/albums", protectRoute, requireAdmin, createAlbum);
router.delete("/albums", protectRoute, requireAdmin, deleteAlbum);

export default router;
