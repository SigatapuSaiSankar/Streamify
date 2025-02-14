// const express = require('express');
// const { uploadOnCloudinary } = require('../controller/upload.controller');
import express from 'express';
import { deletefromCloudinaryAndDB, uploadOnCloudinary } from '../controller/upload.controller.js';
import {uploadProfile, uploadSingleVideo} from "../multer/multerBase.js";
import multer from 'multer';
import { authorization } from '../auth/verifyToken.js';

const upload = multer({ dest: 'public/videos/' });//mention the path where the uploaded bype code video is stored

const router = express.Router()

router.post('/singlevideo',upload.single('avatar'),uploadSingleVideo);
// /upload/deleteone/:videoId
router.delete('/deleteone/:videoId',authorization,deletefromCloudinaryAndDB);

// /upload/uploadprofile
router.post('/uploadprofile',upload.single('profile'),uploadProfile);

// module.exports = router;
export default router;