import React, { createContext, useState } from 'react'

export const videoContext = createContext();

export default function VideoData({children}) {
        const [videos, setVideos] = useState([]);
        const val = {videos,setVideos};
    return (
        <videoContext.Provider value={val}>
            {children}
        </videoContext.Provider>
    )
}
