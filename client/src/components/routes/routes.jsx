import React, { useContext } from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from "../home/Home";
import NotFound from '../404NotFound/NotFound';
import VideoPlayer from '../videoPlayer/VideoPlayer';
import Uploading from '../upload/Uploading';
import Register from '../register/Register';
import Login from '../login/Login';
import Profile from '../profile/Profile';
import { userContext } from '../context/Context';

export default function Routing() {
    const {user} = useContext(userContext);
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/video/:videoId" element={<VideoPlayer/>} />
                <Route path="/upload" element={<Uploading/>}/>
                <Route path='/play' element={<VideoPlayer />} />
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>} />
                <Route path='/profile' element={user?<Profile/>:<NotFound/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </>
    )
}
