import {Router} from "express";
import {getAllAlbums,getAlbumbyId} from '../controller/album.controller.js';

const router = Router();

router.get("/",getAllAlbums);
router.get("/:albumId",getAlbumbyId);

export default router;
