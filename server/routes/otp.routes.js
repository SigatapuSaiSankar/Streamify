import express from 'express';
import { sendOTP, verifyOTP } from '../controller/otp.controller.js';

const router = express.Router();
// /otp/sendotp
router.post("/sendotp",sendOTP);

// /otp/verifyotp
router.post('/verifyotp',verifyOTP);

export default router;