import { Router } from "express"
import {sendOTP } from "../controllers/auth.controller";

const router = Router();


router.post("/send-otp", sendOTP)


export default router;