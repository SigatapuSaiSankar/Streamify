import express from 'express';
import { Login, RegisterUser } from '../controller/auth.controller.js';
import { ValidateEmail } from '../emailValidator/Validate.js';


const router = express.Router();

router.post("/register",ValidateEmail,RegisterUser);
router.post("/login",Login);

export default router;