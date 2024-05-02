import React from 'react'
import './youtube.css'
import { useState } from "react";
import { useEffect } from 'react';
import moment from 'moment'

const API = 'AIzaSyAeX_TNIxeprj21DmFdv1N6JmrSy9DS0fc';

const channelId = 'UCyqmsSDVwQKnlzz7xCUoG8g';



function numberFormat(strNum) {
    var num = parseInt(strNum);
    if (num > 99999999) {
        return Math.floor(num / 1000000) + 'M';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(2) + 'M';
    } else if (num >= 1000) {
        return Math.floor(num / 1000) + 'K';
    } else {
        return strNum;
    }
}


const testchannelurl = `https://youtube.googleapis.com/youtube/v3/channels?key=${API}&id=UCurvRE5fGcdUgCYWgh-BDsg&part=snippet`;


function YouTube() {
    const [data, setData] = useState({ videos: null, channels: null });
    const [category, setCategory] = useState('0');
    const [dock, setDock] = useState('home');
    const [keyword, setKeyword] = useState('');
    const [searchData, setSearchData] = useState({ videos: null, others: null, channels: null});
    const [curData, setCurData] = useState({ curVideo: null, curChannel: null })
    const [comments, setComments] = useState(null);
    const [replies, setReplies] = useState(null);
    const [shorts, setShorts] = useState({ videos: null, others: null, channels: null });

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
    const category_url = `https://youtube.googleapis.com/youtube/v3/videos?key=${API}&chart=mostPopular&videoCategoryId=${category}&part=snippet,statistics,contentDetails&maxResults=10`
    const search_url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${keyword}&type=video&key=${API}`
    const shorts_url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=short&maxResults=50&order=viewCount&key=${API}`

    const fetchSearchData = async (url) => {

        try {
            const response = await fetch(url);
            const resJson = await response.json();
            const result = resJson.items;
            console.log(result);

            const otherResult = await Promise.all(
                result.map(item => {
                    return fetchOtherData(item);
                })
            )
            console.log(otherResult);

            const channelResult = await Promise.all(
                result.map(item => {
                    return fetchChannelData(item);
                })
            )
            console.log(channelResult);

            if (url.includes('&q=')) {
                setSearchData({ videos: result, others: otherResult, channels: channelResult })
            } else {
                setShorts({ videos: result, others: otherResult, channels: channelResult })
            }
            

        } catch (error) {
            alert(error);
            return;
        }
    }

    const fetchOtherData = async (item) => {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${API}&id=${item.id.videoId}&part=snippet,statistics,contentDetails`)
        const resJson = await response.json();
        const result = resJson.items[0]
        return result;
    }



    const fetchData = async (url) => {

        //fetch data and store it in state
        const response = await fetch(url);
        const resJson = await response.json();
        const result = resJson.items;
        console.log(result);
        

        const channelResult = await Promise.all(
            result.map(item => {
                return fetchChannelData(item);
            })
        )
        console.log(channelResult);
        setData({ videos: result, channels: channelResult });


    }

    const fetchChannelData = async (item) => {
        let channelurl = `https://youtube.googleapis.com/youtube/v3/channels?key=${API}&id=${item.snippet.channelId}&part=snippet,id,statistics`;
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
                <div onClick={() => {
                    fetchSearchData(shorts_url);
                    setDock("shorts")}} className='dockBlocks'>
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
    function handleTags(video) {
        const tags = video.snippet.tags.map(item => `#${item}`);
        const tagsStr = tags.join(" ");
        return tagsStr;
    }
    

    const playVideo = async (video, channel) => {
        const playUrl = "https://www.youtube.com/embed/" + video.id;
        setCurData({ curVideo: video, curChannel: channel})
        console.log(video);
        const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${API}&videoId=${video.id}&part=snippet,replies&order=relevance&maxResults=100`)
        const resJson = await response.json();
        const result = resJson.items;
        console.log(result);
        setComments(result);

        setDock('nowPlaying');
    }

    



    return (
        <div className='youtube'>
            <div className='ytContainer'>
                {navbar()}
                {dock === 'nowPlaying' && <div className='nowPlaying'>

                    <div className='videoContainer'>
                        <iframe width="430" height="240" src={"https://www.youtube.com/embed/" + curData.curVideo.id + "?controls=1&autoplay=1"}
                            title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                        <div className='vidInfoContainer'>
                            <div className='firstContainer'>
                                <div className='title bold' style={{ fontSize: 18, padding: '10px 0px' }}>{curData.curVideo.snippet.title}</div>
                                <div className='titleInfo'>
                                    <span className='titleInfos'>{curData.curVideo.statistics.viewCount} views</span>
                                    <span className='titleInfos'>{moment(curData.curVideo.snippet.publishedAt).fromNow()}</span>
                                    <span className='titleInfos tags'>{curData.curVideo.snippet.tags && handleTags(curData.curVideo)}</span>
                                </div>
                            </div>
                            <div className='secondContainer'>
                                <div className='channel'>
                                    <span><img src={curData.curChannel.snippet.thumbnails.default.url} className='channelThumbnail' alt='thumbnail' /></span>
                                    <span>{curData.curChannel.snippet.title}</span>
                                    <span style={{ color: 'lightgray', fontSize: 12 }}>{numberFormat(curData.curChannel.statistics.subscriberCount)}</span>
                                </div>
                                <div className='buttons'>
                                    <span className='likeButton'>
                                        <img style={{ width: 18, height: 18 }} src='./src/assets/like.png' alt='like' />
                                        {numberFormat(curData.curVideo.statistics.likeCount)}
                                    </span>
                                    <span className='likeButton'>
                                        Share
                                    </span>
                                    <span className='likeButton'>
                                        Remix
                                    </span>
                                    <span className='likeButton'>
                                        Download
                                    </span>
                                    <span className='likeButton'>
                                        Save
                                    </span>
                                </div>
                            </div>
                            {!replies ? <div className='bold commentTop'>Comments <span style={{ fontSize: 10, color: 'lightgray'}}>{numberFormat(curData.curVideo.statistics.commentCount)}</span></div> 
                                : <div onClick={() => {
                                    setReplies(null);
                                }} className='commentTop'>&lt; &nbsp; &nbsp; <span className='bold'>Replies</span></div>}
                            <div className='commentContainer'>
                                {!replies && comments && comments.map(comment => {
                                    return (
                                        <div className='comment'>
                                            <div><img style={{ width: 20, height: 20, borderRadius: '50%' }} src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt='pic' /></div>
                                            <div>
                                                <div style={{ color: 'lightgray', fontSize: 12 }}>{comment.snippet.topLevelComment.snippet.authorDisplayName} · {moment(comment.snippet.topLevelComment.snippet.publishedAt).fromNow()}</div>
                                                <div>{comment.snippet.topLevelComment.snippet.textOriginal}</div>
                                                <div className='commentLike'><img style={{ width: 12, height: 12 }} src='./src/assets/like.png' alt='like' /> {comment.snippet.topLevelComment.snippet.likeCount !== 0 && comment.snippet.topLevelComment.snippet.likeCount}</div>
                                                {comment.snippet.totalReplyCount > 1 ?
                                                    <div onClick={() => setReplies(comment.replies.comments)} style={{ color: 'skyblue' }}>{comment.snippet.totalReplyCount} replies</div>
                                                    : comment.snippet.totalReplyCount === 1 ?
                                                        <div onClick={() => setReplies(comment.replies.comments)} style={{ color: 'skyblue' }}>1 reply</div>
                                                        : <div></div>}
                                            </div>
                                        </div>)
                                })}
                                {replies && replies.map(reply => {
                                    return (
                                        <div className='comment'>
                                            <div><img style={{ width: 20, height: 20, borderRadius: '50%' }} src={reply.snippet.authorProfileImageUrl} alt='pic' /></div>
                                            <div>
                                                <div style={{ color: 'lightgray', fontSize: 12 }}>{reply.snippet.authorDisplayName} · {moment(reply.snippet.publishedAt).fromNow()}</div>
                                                <div>{reply.snippet.textOriginal}</div>
                                                <div className='commentLike'><img style={{ width: 12, height: 12 }} src='./src/assets/like.png' alt='like' /> {reply.snippet.likeCount !== 0 && reply.snippet.likeCount}</div>
                                            </div>
                                        </div>
                                    )
                                })}

                            </div>


                        </div>
                    </div>
                </div>}


                {dock == 'shorts' && <div className='searchScreen'>
                    {shorts.channels && shorts.others && shorts.videos.map((item, index) => {
                        if (moment.duration(shorts.others[index].contentDetails.duration).asSeconds() <= 60) {
                        return (
                            <div className='vidContainer'>
                                <img onClick={() => {
                                    playVideo(shorts.others[index], shorts.channels[index]);
                                }} className='thumbnail' src={item.snippet.thumbnails.high.url} alt='thumbnail' />
                                <div className='infoContainer'>
                                    <div className='pfpic'><img className='channelThumbnail' src={shorts.channels[index].snippet.thumbnails.default.url} alt='thumbnail' /></div>
                                    <div>
                                        <div className='vidTitle'>{item.snippet.title}</div>
                                        <div className='vidTitleChild'>{item.snippet.channelTitle} · {numberFormat(shorts.others[index].viewCount)} views · {moment(item.snippet.publishedAt).fromNow()}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    })}
                </div>}
                {dock === 'home' && handleCategory()}
                {dock === 'home' && <div className='contentScreen'>
                    {data.channels && data.videos.map((item, index) => {
                        return (
                            <div className='vidContainer'>
                                <img onClick={() => {
                                    playVideo(item, data.channels[index]);
                                }} className='thumbnail' src={item.snippet.thumbnails.maxres.url} alt='thumbnail' />
                                <div className='infoContainer'>
                                    <div className='pfpic'><img src={data.channels[index].snippet.thumbnails.default.url} className='channelThumbnail' alt='thumbnail' /></div>
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
                    {searchData.channels && searchData.others && searchData.videos.map((item, index) => {
                        return (
                            <div className='vidContainer'>
                                <img onClick={() => {
                                    playVideo(searchData.others[index], searchData.channels[index]);
                                }} className='thumbnail' src={item.snippet.thumbnails.high.url} alt='thumbnail' />
                                <div className='infoContainer'>
                                    <div className='pfpic'><img className='channelThumbnail' src={searchData.channels[index].snippet.thumbnails.default.url} alt='thumbnail' /></div>
                                    <div>
                                        <div className='vidTitle'>{item.snippet.title}</div>
                                        <div className='vidTitleChild'>{item.snippet.channelTitle} · {numberFormat(searchData.others[index].viewCount)} views · {moment(item.snippet.publishedAt).fromNow()}</div>
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