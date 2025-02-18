import  React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import { FaShareAlt } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { userContext } from '../context/Context';
import { videoContext } from '../context/VideoInfo';


export default function ImgMediaCard({ value, openDialog }) {
    const navigate = useNavigate();
    const {role,token} = useContext(userContext);
    const {reRender} = useContext(videoContext);

    const handlePlay = (value)=>{
        navigate(`/play`,{state: value._id});
    }

    // useEffect(()=>{
    //     console.log("Card reloaded inside useEffect")
    // },[reRender])
    

    const handleDelete = async (value)=>{
        try {
            const responce = await fetch(`${import.meta.env.VITE_BASE_URL}/upload/deleteone/${value._id}`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token}`
                },

            })
            const data = await responce.json();
    
            if(data.success == true){
                toast.success(data.message);
                window.location.reload();
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("error deleting the video")
        }
    }
    return (
        <Card
            sx={{
                maxWidth: 345,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                },
            }}
            className="mt-5"
        >
            <div className="w-80 bg-white shadow-md rounded-lg ">
                <video
                    src={value.videoURL}
                    className="w-full rounded-t-sm"
                    onClick={()=>handlePlay(value)}
                ></video>
                <div className='flex justify-between pr-4 pl-4 pb-4'>
                    <div>
                        <h3 className="text-lg font-semibold mt-2">{value.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{value.description}</p>
                    </div>
                    <div className='flex items-center'>
                        <button
                            onClick={() => openDialog(value)}
                            className="mt-3 px-4 py-1.5 rounded-md cursor-pointer hover:bg-blue-200 focus:ring-2 focus:ring-gray-200 text-xl text-blue-500"
                        >
                            <FaShareAlt />
                        </button>
                        <button
                            className="mt-3 px-4 py-1.5 rounded-md cursor-pointer hover:bg-blue-200 focus:ring-2 focus:ring-gray-200 text-xl text-blue-500"
                            onClick={()=>handlePlay(value)}
                        >
                            <FaPlay />
                        </button>
                        {
                            role == 'admin' && (
                                <button
                                className="mt-3 px-4 py-1.5 rounded-md cursor-pointer hover:bg-red-200 focus:ring-2 focus:ring-gray-200 text-2xl text-red-500"
                                onClick={()=>handleDelete(value)}
                            >
                                <MdDelete />
                            </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </Card>
    );
}
