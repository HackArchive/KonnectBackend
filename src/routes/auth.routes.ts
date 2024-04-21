import { Router } from "express"
import {createUser, generateImage,getUser,uploadProfilePic } from "../controllers/auth.controller";
import multer from "multer";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post("/generate-image", generateImage)
router.post("/upload-profile-pic",upload.single("image"), uploadProfilePic)

router.post("/create-user", createUser)
router.get("/get-user", getUser)



export default router;