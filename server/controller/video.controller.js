import videoInfo from "../model/video.model.js";

const videoByFilename = async (req, res) => {
    const id = req.params.fileid;
    try {
        const videoInDB = await videoInfo.find();

        const video = videoInDB.filter((value)=> value._id == id);

        if(video.length ==0){
            return res.status(404).json({message:"File not found",success:false});
        }

        return res.status(200).json({message:"File found",success:true,data:video});

    } catch (error) {
        return res.status(500).json({message:"server error",success:false});
    }
    
}

const allVideos = async (req, res) => {
    try {
        const info = await videoInfo.find();
        // console.log(info)
        return res.status(200).json({ message: "all videos information fetched successfully", success: true, data: info });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false });
    }
}

const uploadReview = async (req, res) => {
    const { id, ...review } = req.body;

    try {
        const videoData = await videoInfo.findById(id);

        console.log(videoData);
        if (!videoData) {
            return res.status(404).json({ message: "Video not found", success: false });
        }

        const responce = await videoInfo.findByIdAndUpdate(id , {
            $push: { reviews: review }
        }, { new: true })


        return res.status(200).json({ message: "Review updated successfully", success: true, data: responce });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", success: false ,error: error.message });
    }
}


export { videoByFilename, allVideos, uploadReview }