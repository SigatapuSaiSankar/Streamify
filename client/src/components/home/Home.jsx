import { useContext, useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import ImgMediaCard from "../cards/Cards";
import { videoContext } from "../context/VideoInfo";
import Loader from "../loading/LoadingPage";


function App() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [videoQuality, setVideoQuality] = useState("720p");
    const [autoplay, setAutoplay] = useState(false);
    const [embedCode, setEmbedCode] = useState("");
    const [selectedVideo, setSelectedVideo] = useState(null);

    const {videos,setVideos} = useContext(videoContext);


    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/videos/allvideos`)
            .then(res => res.json())
            .then(allvideosData => {

                setVideos(allvideosData.data)
            });
    }, []);

    const openDialog = (video) => {
        setSelectedVideo(video);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setEmbedCode("");
    };

    const handleQualityChange = (e) => {
        setVideoQuality(e.target.value);
    };

    const handleAutoplayChange = () => {
        setAutoplay(!autoplay);
    };

    const generateEmbedCode = () => {
        if (!selectedVideo) return "";
        const autoplayParam = autoplay ? "&autoplay=1" : "&autoplay=0";
        return `<iframe src="https://www.youtube.com/embed/${selectedVideo.title}?quality=${videoQuality}${autoplayParam}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    };

    const handleSubmit = () => {
        setEmbedCode(generateEmbedCode());
        setVideoQuality("720p");
        setAutoplay(false);
    };

    const copyToClipboard = () => {
        if (embedCode) {
            navigator.clipboard.writeText(embedCode)
                // .then(() => {
                //   alert("Embed code copied to clipboard!");
                // })
                .catch((error) => {
                    alert("Failed to copy embed code: ", error);
                });
        }
    };

    return (
        <>
            {videos.length>0?(
                <>
                <div className="flex flex-wrap justify-center pt-1.5 gap-x-8 gap-y-1.5">
                {videos && videos.map((value, index) => {
                    return (
                        <ImgMediaCard value={value} openDialog = {openDialog} key={value._id}/>
                    );
                })}
        
                {isDialogOpen && (
                    <dialog open className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 mt-50 ml-140 rounded-md">
                        <form className="bg-white rounded-md shadow-lg p-6 w-96 max-w-full border border-gray-300">
                            <h2 className="text-lg font-semibold text-gray-700">Embed Video</h2>
    
                            <div className="flex flex-col">
                                <label htmlFor="quality" className="text-sm font-medium text-gray-600">
                                    Video Quality
                                </label>
                                <select
                                    id="quality"
                                    name="quality"
                                    value={videoQuality}
                                    onChange={handleQualityChange}
                                    className="mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="720p">720p</option>
                                    <option value="1080p">1080p</option>
                                    <option value="1440p">1440p</option>
                                    <option value="4k">4k</option>
                                </select>
                            </div>
    
                            <div className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    id="autoplay"
                                    name="autoplay"
                                    checked={autoplay}
                                    onChange={handleAutoplayChange}
                                    className="w-4 h-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                                <label htmlFor="autoplay" className="ml-2 text-sm font-medium text-gray-600">
                                    Enable Autoplay
                                </label>
                            </div>
    
                            {embedCode && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium text-gray-700">Generated Embed Code:</h3>
                                    <textarea
                                        readOnly
                                        className="mt-1 p-2 border border-gray-300 rounded-md w-full resize-none"
                                        rows="4"
                                        value={embedCode}
                                    ></textarea>
                                    <button
                                        type="button"
                                        onClick={copyToClipboard}
                                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-500"
                                    >
                                        <MdContentCopy />
                                    </button>
    
                                </div>
                            )}
    
                            <div className="flex justify-end space-x-3 mt-4">
                                {!embedCode && <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    Submit
                                </button>}
    
                                <button
                                    type="button"
                                    onClick={closeDialog}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </dialog>
                )}
            </div>
            </>
            ):(
                <Loader/>
            )}
        </>
        
        
    );
}

export default App;