import React from 'react'
import './youtube.css'
import { useState } from "react";
import { useEffect } from 'react';



const API = 'AIzaSyAeX_TNIxeprj21DmFdv1N6JmrSy9DS0fc';
const channelId = 'UCyqmsSDVwQKnlzz7xCUoG8g';

var fetchurl = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResult=20`;

const YouTubetest = () => {
    const [allvideos, setAllvideos] = useState([]);
    useEffect(() => {
        fetch(fetchurl).then((response) => response.json()).then((resJson) => {
            const result = resJson.items.map(doc => ({
                ...doc,
                Videolink: "https://www.youtube.com/embed/" + doc.id.videoId + "?modestbranding=1&;showinfo=0&;autohide=1&;rel=0;"
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

function YouTube() {
    const [videos, setVideos] = useState([]);

    return (
        <div className='youtube'>
            <div className='ytContainer'>
                <Navbar />
                <Category />
                <div className='contentScreen'>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                    <p>test</p>
                </div>
                <Dock />
            </div>
        </div>
    )
}

function Navbar() {
    return (
        <div className='navbar'>
            <img className='ytlogo' src='./src/assets/ytlogo.png' alt='logo' />
            <div className='inputContainer'><input placeholder='Search'></input><i className="fa-solid fa-magnifying-glass"></i></div>
        </div>
    )
}

function Category() {
    const [category, setCategory] = useState('all');
     const style = {background: 'white', color: '#202121', pointerEvents: 'none'};

     const allVideo = () => {
        setCategory('all');
     }
     const gamingVideo = () => {
        setCategory('gaming');
     }
     const musicVideo = () => {
        setCategory('music');
     }
     const sportsVideo = () => {
        setCategory('sports');
     }

    console.log(category);
    return (
        <div className='category'>
            <div onClick={allVideo} className='categoryBlocks' style={(category === 'all') ? style : {}}>All</div>
            <div onClick={gamingVideo} className='categoryBlocks' style={(category === 'gaming') ? style : {}}>Gaming</div>
            <div onClick={musicVideo} className='categoryBlocks' style={(category === 'music') ? style : {}}>Music</div>
            <div onClick={sportsVideo} className='categoryBlocks' style={(category === 'sports') ? style : {}}>Sports</div>
            <div className='categoryBlocks'> category4</div>
            <div className='categoryBlocks'>categorytest</div>
            <div className='categoryBlocks'>categorytest</div>
            <div className='categoryBlocks'>categorytest</div>
        </div>
    )
}

function Dock() {
    return (
        <div className='dock'>
            <div className='dockBlocks'>Home</div>
            <div className='dockBlocks'>Shorts</div>
            <div className='dockBlocksMid'>+</div>
            <div className='dockBlocks'>Subscriptions</div>
            <div className='dockBlocks'>You</div>
        </div>
    )
}

export default YouTube;