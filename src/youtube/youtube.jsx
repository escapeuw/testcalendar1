import React from 'react'
import './youtube.css'
import { useState } from "react";
import { useEffect } from 'react';
import moment from 'moment'

const API = 'AIzaSyAeX_TNIxeprj21DmFdv1N6JmrSy9DS0fc';

const channelId = 'UCyqmsSDVwQKnlzz7xCUoG8g';

/*
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

*/

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


const testchannelurl = `https://youtube.googleapis.com/youtube/v3/channels?key=${API}&id=UCurvRE5fGcdUgCYWgh-BDsg&part=snippet`;


function YouTube() {
    const [videos, setVideos] = useState(null);
    const [channels, setChannels] = useState(null);
    const [category, setCategory] = useState('0');
    const [dock, setDock] = useState('home');
    const [keyword, setKeyword] = useState('');
    const [searchVideos, setSearchVideos] = useState(null);
    const [searchOthers, setSearchOthers] = useState(null);
    const [searchChannels, setSearchChannels] = useState(null);
    const [curVideo, setCurVideo] = useState(null);
    const [curChannel, setCurChannel] = useState(null);

    useEffect(() => {
        fetchData(category_url);
    }, [category]);

    function handleSearch(e) {
        setKeyword(e.target.value);
        console.log(e.target.value);
    }


    function navbar() {
        return (
            <div className='navbar'>
                <img onClick={() => setDock("home")} className='ytlogo' src='./src/assets/ytlogo.png' alt='logo' />
                <div className='inputContainer'><input placeholder='Search' onChange={handleSearch}
                    onKeyDown={e => {
                        if (e.code === "Enter") {
                            setDock('search');
                            fetchSearchData(search_url);
                        }
                    }} /><i className="fa-solid fa-magnifying-glass"></i></div>
            </div>
        )
    }
    const category_url = `https://youtube.googleapis.com/youtube/v3/videos?key=${API}&chart=mostPopular&videoCategoryId=${category}&part=snippet,statistics,contentDetails&maxResults=2`
    const search_url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${keyword}&type=video&key=${API}`

    const fetchSearchData = async (url) => {

        try {
            const response = await fetch(url);
            const resJson = await response.json();
            const result = resJson.items;
            console.log(result);
            setSearchVideos(result);

            const otherResult = await Promise.all(
                result.map(item => {
                    return fetchOtherData(item);
                })
            )
            console.log(otherResult);
            setSearchOthers(otherResult);

            const channelResult = await Promise.all(
                result.map(item => {
                    return fetchChannelData(item);
                })
            )

            console.log(channelResult);
            setSearchChannels(channelResult);

        } catch (error) {
            alert(error);
            return;
        }
    }

    const fetchOtherData = async (item) => {
        const response =  await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${API}&id=${item.id.videoId}&part=statistics`)
        const resJson = await response.json();
        const result = resJson.items[0].statistics;
        return result;
    }



    const fetchData = async (url) => {

        //fetch data and store it in state
        const response = await fetch(url);
        const resJson = await response.json();
        const result = resJson.items;
        console.log(result);
        setVideos(result);

        const channelResult = await Promise.all(
            result.map(item => {
                return fetchChannelData(item);
            })
        )
        console.log(channelResult);
        setChannels(channelResult);


    }

    const fetchChannelData = async (item) => {
        let channelurl = `https://youtube.googleapis.com/youtube/v3/channels?key=${API}&id=${item.snippet.channelId}&part=snippet,id`;
        const response = await fetch(channelurl);
        const resJson = await response.json();
        const channelResult = resJson.items;
        return channelResult[0];
    }


    function handleCategory() {
        const style = { background: 'white', color: '#202121', pointerEvents: 'none' };

        return (
            <div className='category'>
                <div onClick={() => setCategory('0')} className='categoryBlocks' style={(category === '0') ? style : {}}>All</div>
                <div onClick={() => setCategory('20')} className='categoryBlocks' style={(category === '20') ? style : {}}>Gaming</div>
                <div onClick={() => setCategory('10')} className='categoryBlocks' style={(category === '10') ? style : {}}>Music</div>
                <div onClick={() => setCategory('17')} className='categoryBlocks' style={(category === '17') ? style : {}}>Sports</div>
                <div onClick={() => setCategory('2')} className='categoryBlocks' style={(category === '2') ? style : {}}>Automobiles</div>
                <div onClick={() => setCategory('24')} className='categoryBlocks' style={(category === '24') ? style : {}}>Entertainment</div>
                <div onClick={() => setCategory('15')} className='categoryBlocks' style={(category === '15') ? style : {}}>Animals</div>
                <div onClick={() => setCategory('25')} className='categoryBlocks' style={(category === '25') ? style : {}}>News</div>
                <div onClick={() => setCategory('28')} className='categoryBlocks' style={(category === '28') ? style : {}}>Technology</div>
            </div>
        )
    }

    function handleSubscription() {
        return (
            <div className='subscription'>

            </div>
        )
    }

    function handleDock() {

        return (
            <div className='dock'>
                <div onClick={() => setDock("home")} className='dockBlocks'>
                    {(dock === 'home')
                        ? <img className='dockIcon' src='./src/assets/homeClicked.png' alt='clicked' />
                        : <img className='dockIcon' src='./src/assets/home.png' alt='notclikcked' />} Home
                </div>
                <div onClick={() => setDock("shorts")} className='dockBlocks'>
                    {(dock === 'shorts')
                        ? <img className='dockIcon' src='./src/assets/shortsClicked.png' alt='clicked' />
                        : <img className='dockIcon' src='./src/assets/shorts.png' alt='notclikcked' />} Shorts
                </div>
                <div className='dockBlocksMid'>+</div>
                <div onClick={() => setDock("subs")} className='dockBlocks'>
                    {(dock === 'subs')
                        ? <img className='dockIcon' src='./src/assets/subsClicked.png' alt='clicked' />
                        : <img className='dockIcon' src='./src/assets/subs.png' alt='notclikcked' />} Subscription
                </div>
                <div className='dockBlocks'>You</div>
            </div>
        )
    }

    function playVideo(video, channel) {
        const playUrl = "https://www.youtube.com/embed/" + video.id;
        setCurVideo(video);
        setCurChannel(channel);
        setDock('nowPlaying');

        console.log(playUrl)
        console.log(channel.id);
    }



    return (
        <div className='youtube'>
            <div className='ytContainer'>
                {navbar()}
                {dock === 'nowPlaying' && <div className='nowPlaying'>
                    <div className='videoContainer'>
                        <div className='backButton'>Back</div>
                        <iframe width="430" height="240" src={"https://www.youtube.com/embed/" + curVideo.id + "?controls=0&autoplay=1&modestbranding=0"}
                            title="YouTube video player" frameborder="0" allow="accelerometer; modestbranding; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                </div>}



                {dock === 'home' && handleCategory()}
                {dock === 'home' && <div className='contentScreen'>
                    {channels && videos.map((item, index) => {
                        return (
                            <div className='vidContainer'>
                                <img onClick={() => {
                                    playVideo(item, channels[index]);
                                }} className='thumbnail' src={item.snippet.thumbnails.maxres.url} alt='thumbnail' />
                                <div className='infoContainer'>
                                    <div className='pfpic'><img src={channels[index].snippet.thumbnails.default.url} className='channelThumbnail' alt='thumbnail' /></div>
                                    <div>
                                        <div className='vidTitle'>{item.snippet.title}</div>
                                        <div className='vidTitleChild'>{item.snippet.channelTitle} · {numberFormat(item.statistics.viewCount)} views · {moment(item.snippet.publishedAt).fromNow()}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>}
                {dock === 'search' && <div className='searchScreen'>
                    {searchChannels && searchOthers && searchVideos.map((item, index) => {
                        return (
                            <div className='vidContainer'>
                                <img className='thumbnail' src={item.snippet.thumbnails.high.url} alt='thumbnail' />
                                <div className='infoContainer'>
                                    <div className='pfpic'><img className='channelThumbnail' src={searchChannels[index].snippet.thumbnails.default.url} alt='thumbnail' /></div>
                                    <div>
                                        <div className='vidTitle'>{item.snippet.title}</div>
                                        <div className='vidTitleChild'>{item.snippet.channelTitle} · {numberFormat(searchOthers[index].viewCount)} views · {moment(item.snippet.publishedAt).fromNow()}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>}
                {handleDock()}
            </div>

        </div>
    )
}




export default YouTube;