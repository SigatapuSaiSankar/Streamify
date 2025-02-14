import React, { useRef, useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { userContext } from "../context/Context";
import Loader from "../loading/LoadingPage";


const VideoPlayer = () => {
  const videoRef = useRef(null);
  const { state } = useLocation();
  const [videoInfo, setVideoInfo] = useState();
  const { user } = useContext(userContext);
  const [userReview, setUserReview] = useState("");
  const [reRender, setReRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/videos/singlevideo/${state}`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(responce => responce.json())
      .then((data) => {
        setVideoInfo(data.data[0]);
      })
  }, [reRender]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userReview) {
        // Create a new review object (only feedback)
        const newReview = {
          id: state,
          userId: user._id,
          name: user.name,
          feedback: userReview,
          createdAt: new Date().toLocaleString(), // Format the created date
        };

        const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/videos/review`, {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReview)
        })

        const data = await responce.json();
        // Handle saving the review (you can add to the state, or send it to a server)
        if (data.success === true) {
          toast.success(data.message);
          setReRender(!reRender);
        }
        else {
          toast.error(data.message);
        }
        // window.location.reload();
        // Clear the input field
        setUserReview("");
      } else {
        // alert("Please provide your feedback!");
        toast.error("Enter a Review");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  }

  return (
    <>
      {
        videoInfo ? (
          <div className="min-h-screen bg-gradient-to-b from-gray-100 text-white flex flex-col items-center p-6">
            Video Player Section
            <div className="w-full max-w-5xl">
              <video
                ref={videoRef}
                className="w-full rounded-xl shadow-lg border-4 border-gray-200 hover:border-gray-500 transition-all duration-300"
                controlsList="nodownload"
                controls
                autoPlay
              >
                <source src={videoInfo.videoURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="w-full max-w-5xl mt-8 bg-gray-200 p-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold mb-4 text-black">
                {videoInfo.title || "Video Title"}
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                {videoInfo.description || "This is a description of the video."}
              </p>

              <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-8 w-full">
                <h2 className="text-2xl font-semibold mb-4 text-black">Reviews</h2>

                {videoInfo.reviews && videoInfo.reviews.length > 0 ? (
                  videoInfo.reviews.map((val, index) => (
                    <div
                      key={index}
                      className="bg-white p-5 mb-4 rounded-lg shadow-md border-l-4 border-blue-500"
                    >
                      <div className="flex items-center mb-2">
                        <div className="bg-blue-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full text-lg">
                          {val.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <p className="text-lg font-semibold text-black">{val.name}</p>
                          <p className="text-sm text-gray-500">{val.createdAt}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg">{val.feedback}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-700 text-center">No reviews yet. Be the first to add one!</p>
                )}

                <form onSubmit={handleReviewSubmit} className="mt-6">
                  <div className="mb-4">
                    <label htmlFor="userReview" className="block text-lg font-medium text-black mb-2">
                      Your Review
                    </label>
                    <textarea
                      id="userReview"
                      placeholder="Write your Review here"
                      value={userReview}
                      onChange={(e) => setUserReview(e.target.value)}
                      rows="4"
                      className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                  </div>
                  {!user ? (
                    <div
                      onClick={handleLogin}
                      className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 flex justify-center items-center text-center"
                    >
                      Login to Write a Review
                    </div>


                  ) : (
                    <button
                      type="submit"
                      className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    >
                      Submit Review
                    </button>
                  )}

                </form>
              </div>

            </div>
          </div>
        ) : (<Loader />)
      }
    </>

  );
};

export default VideoPlayer;
