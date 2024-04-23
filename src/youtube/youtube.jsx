import React from 'react'
import './youtube.css'
import { useState } from "react";
import { useEffect } from 'react';
import moment from 'moment'

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

const testurl = `https://www.googleapis.com/youtube/v3/videoCategories?key=${API}&Id=20&part=snippet&regionCode=US&maxResult=5`







function numberFormat(strNum) {
    var num = parseInt(strNum);
    if (num >= 1000000) {
        return Math.floor(num / 1000000) + 'M';
    } else if (num >= 1000) {
        return Math.floor(num / 1000) + 'K';
    } else {
        return strNum;
    }
}


const popurl = `https://youtube.googleapis.com/youtube/v3/videos?key=${API}&chart=mostPopular&part=snippet,statistics,contentDetails&maxResults=5`;
const testchannelurl = `https://youtube.googleapis.com/youtube/v3/channels?key=${API}&id=UCurvRE5fGcdUgCYWgh-BDsg&part=snippet`;


function YouTube() {
    const [videos, setVideos] = useState([]);
    const [category, setCategory] = useState('all');
    const [temp, setTemp] = useState('');
    const [channels, setChannels] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);


    function navbar() {
        return (
            <div className='navbar'>
                <img className='ytlogo' src='./src/assets/ytlogo.png' alt='logo' />
                <div className='inputContainer'><input placeholder='Search'></input><i className="fa-solid fa-magnifying-glass"></i></div>
            </div>
        )
    }

    const fetchData = async () => {
        //fetch data and store it in state
        const response = await fetch(popurl);
        const resJson = await response.json();
        const result = resJson.items;
        console.log(result);
        setVideos(result);
       
        const channelResult = await Promise.all(
            result.map(item => {
                return fetchOtherData(item);
            })
        )
        console.log(channelResult);
        setChannels(channelResult);
       
    }

    const fetchOtherData = async (item) => {
        let channelurl = `https://youtube.googleapis.com/youtube/v3/channels?key=${API}&id=${item.snippet.channelId}&part=snippet,id`;
        const response = await fetch(channelurl);
        const resJson = await response.json();
        const channelResult = resJson.items;
        return channelResult[0];
    }



   
    /*
    fetch(popurl)
    .then((res) => res.json())
    .then(resJson => {
        const result = resJson.items.map(item => ({
            ...item,
            channelThumbnail: getChannelIcon(item)
        }));
        setVideos(result);
        console.log(result);
    })
}

const getChannelIcon = (video_data) => {
    fetch(`https://youtube.googleapis.com/youtube/v3/channels?id=${video_data.snippet.channelId}&part=snippet&key=${API}`)
    .then(res => res.json())
    .then(data => data.items[0].snippet.thumbnails.default.url)
}


const fetchChannelData = async () => {
    var temp = [];
        videos.map(item => {
                var channelurl = `https://youtube.googleapis.com/youtube/v3/channels?id=${item.snippet.channelId}&part=snippet&maxResults=10&key=${API}`;
                fetch(channelurl).then((res) => res.json()).then((resJson) => {
                    const result = resJson.items;
                    temp.push(result[0]);
                })
            });
        setChannels(temp);
*/

    function handleCategory() {

        const style = { background: 'white', color: '#202121', pointerEvents: 'none' };

        const allVideo = () => {
            setCategory('all');
            // fetchData('all');
            //fix
        }
        const gamingVideo = () => {
            setCategory('gaming');
            // fetchData('all');
            //fix
        }
        const musicVideo = () => {
            setCategory('music');
        }
        const sportsVideo = () => {
            setCategory('sports');
        }
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

    function dock() {
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



    return (
        <div className='youtube'>
            <div className='ytContainer'>
                {navbar()}
                {handleCategory()}
                <div className='contentScreen'>
                    {(channels) && videos.map((item, index) => {
                        return (
                            <div className='vidContainer'>
                                <img className='thumbnail' src={item.snippet.thumbnails.maxres.url} alt='thumbnail' />
                                <div className='infoContainer'>
                                    <div className='pfpic'><img className='channelThumbnail' src={channels[index].snippet.thumbnails.default.url} alt='thumbnail' /></div>
                                    <div>
                                        <div className='vidTitle'>{item.snippet.title}</div>
                                        <div className='vidTitleChild'>{item.snippet.channelTitle} · {numberFormat(item.statistics.viewCount)} views · {moment(item.snippet.publishedAt).fromNow()}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {dock()}
            </div>
        </div>
    )
}



export default YouTube;