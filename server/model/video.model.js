import mongoose from "mongoose"

const videoSchema = mongoose.Schema({
    videoURL : {
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    reviews:{
        type: []
    }
});

export default mongoose.model("videoInfo", videoSchema);