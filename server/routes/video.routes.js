// const express = require('express');
// const { videoByFilename, allVideos } = require('../controller/video.controller');
import express from 'express';
import { videoByFilename, allVideos, uploadReview } from '../controller/video.controller.js';


const router = express.Router();

// /videos/allvideos
router.get('/allvideos', allVideos);

// /videos/singlevideo/:filename
router.get('/singlevideo/:fileid', videoByFilename);
// /videos/review
router.post('/review', uploadReview);

// module.exports = router;
export default router;
