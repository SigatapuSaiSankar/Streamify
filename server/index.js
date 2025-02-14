import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import videoRouter from './routes/video.routes.js';
import uploadRouter from './routes/upload.routes.js';
import authRouter from "./routes/auth.routes.js";
import otpRouter from "./routes/otp.routes.js";
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST','DELETE','UPDATE']
}))
app.use(express.static('public'));
app.use('/videos', videoRouter);
app.use("/upload",uploadRouter);
app.use('/auth',authRouter);
app.use("/otp",otpRouter);

app.use((req, res, next) => {
    res.status(200).json({message:"default"});
})

app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');
    } catch (error) {
        console.log('Error connecting to DB', error);
    }
};

connectDB().then(() => {
    app.listen(8000, () => {
        console.log('Server is running on http://localhost:8000');
    });
});

// app.listen(8000, () => {
//     console.log('Server is running on http://localhost:8000');
// });
