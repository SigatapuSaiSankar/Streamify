import { useContext, useEffect, useState } from "react";
import { MdContentCopy } from "react-icons/md";
import ImgMediaCard from "../cards/Cards";
import { videoContext } from "../context/VideoInfo";
import Loader from "../loading/LoadingPage";
import { useNavigate } from "react-router-dom";

function App() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [embedCode, setEmbedCode] = useState("");
    const [selectedVideo, setSelectedVideo] = useState(null);

    const { videos, setVideos } = useContext(videoContext);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/videos/allvideos`)
            .then(res => res.json())
            .then(allvideosData => {
                setVideos(allvideosData.data);
            });
    }, []);

    const openDialog = (video) => {
        setSelectedVideo(video);
        setEmbedCode(generateEmbedCode(video));
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setEmbedCode("");
    };

    const generateEmbedCode = (video) => {
        if (!video) return "";
        return `<iframe src="${video.videoURL}" frameborder="0"  allowfullscreen></iframe>`;
    };

    const copyToClipboard = () => {
        if (embedCode) {
            navigator.clipboard.writeText(embedCode)
                .catch((error) => {
                    alert("Failed to copy embed code: ", error);
                });
        }
    };

    return (
        <>
            {videos.length > 0 ? (
                <>
                    <div className="flex flex-wrap justify-center pt-1.5 gap-x-8 gap-y-1.5">
                        {videos && videos.map((value) => {
                            return (
                                <div className="cursor-pointer">
                                    <ImgMediaCard value={value} openDialog={openDialog} key={value._id} />
                                </div>
                            );
                        })}

                        {isDialogOpen && (
                            <dialog open className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 m-auto rounded-md">
                                <form className="bg-white rounded-md shadow-lg p-6 w-96 max-w-full border border-gray-300">
                                    <h2 className="text-lg font-semibold text-gray-700">Embed Video</h2>

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
            ) : (
                <Loader />
            )}
        </>
    );
}

export default App;