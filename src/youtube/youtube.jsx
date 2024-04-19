import React from 'react'
import './youtube.css'
import { useState } from "react";
import { useEffect } from 'react';

const API = 'AIzaSyB_XvQhuo7M0X_5Ab26Wmb475z2_lWxeqY';
const channelId = 'UCyqmsSDVwQKnlzz7xCUoG8g';

var fetchurl = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResult=20`;

const YouTube = () => {

    const [allvideos, setAllvideos] = useState([]);
    useEffect(() => {
        fetch(fetchurl).then((response) => response.json()).then((resJson) => {
            const result = resJson.items.map(doc => ({
                ...doc,
                Videolink: "https://www.youtube.com/embed/"+doc.id.videoId+"?modestbranding=1&;showinfo=0&;autohide=1&;rel=0;"
            }));
            setAllvideos(result);
        })
    }, [])

    console.log(allvideos);
    return (
        <div className='youtube'>Hi this is Youtube
            {allvideos.map((item) => {
                return (
                    <div>
                        <iframe width="420" height="200" src={item.Videolink} 
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                )
            })}
        </div>
    )
}

export default YouTube;