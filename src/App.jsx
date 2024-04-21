import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './assets/sky.jpeg'
import Calculator from './calculator/calculator.jsx';
import Weather from './weather/weather.jsx';
import YouTube from './youtube/youtube.jsx'
import React from 'react'


const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();


function Phone() {
  const [current, setCurrent] = useState('home');
  const [homeButton, setHomeButton] = useState(false);

  // displaying time in actual format //
  function handleMinutes(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }

  const handleCalculator = () => {
    setCurrent('calculator');
    setHomeButton(true);
  }

  const handleYouTube = () => {
    setCurrent('youtube');
    setHomeButton(true);
  }

  const handleNotes = () => {
    setCurrent('notes');
    setHomeButton(true);
  }

  const handleWeather = () => {
    setCurrent('weather');
    setHomeButton(true);
  }


  const handleHome = () => {
      setCurrent('home');
      setHomeButton(false);
  }

    return(
      <div>
        <div className="iPhone">
          {/* change screen background depending on apps*/}
          <div className="screen" style={(current === 'calculator' || current === 'youtube') ? {background: "black"} 
          : current === 'notes' ? {background: "beige"} 
          : current === 'weather' ? {backgroundImage: 'url(https://i.pinimg.com/736x/ee/c4/16/eec4169c5e89189f59d86f21829e0454.jpg)'} : {}}>
              <div className="topBar" style={current === "notes" ? {color: "black"} : {}} onClick={homeButton ? handleHome : undefined}>
              <span className="clock">{hours}:{handleMinutes(minutes)}</span>
              <span className="icons">
                <i className="fa-solid fa-signal"></i>
                <i className="fa-solid fa-wifi"></i>
                <i className="fa-solid fa-battery-full"></i>
                </span> 
              </div>
            <div id="contentContainer">
              {current === 'home' && <Apps youtube={handleYouTube} weather={handleWeather} calculator={handleCalculator} notes={handleNotes} />}
              {current === 'calculator' && <Calculator />}
              {current === 'youtube' && <YouTube />}
              {current === 'notes' && <Notes />}
              {current === 'weather' && <Weather />}
           </div>
          </div>
         </div>
      </div>
    )
}


function Apps(props) {

    return(
      <div>
        <div className="appContainer">
              <div className="imgText"><img src="./src/assets/messageicon.png" />
                Messages
              </div>
              <div className="imgText">
              <img src="./src/assets/appstoreicon.png" />
                AppStore
              </div>
              <div className="imgText">
              <img src="./src/assets/photo.png" />
                Photos
              </div>
              <div className="imgText">
            <img src="./src/assets/safari.png" />
                Safari
              </div>
              <div className="imgText">
            <img onClick={props.calculator} src="./src/assets/calculator.png" />
                Calculator
              </div>
              <div className="imgText">
            <img onClick={props.notes} src="./src/assets/notes.png" />
                Notes
              </div>
              <div className="imgText">
            <img src="./src/assets/calender.png" />
                Calender
              </div>
              <div className="imgText">
            <img src="./src/assets/camera.png" />
                Camera
              </div>
              <div className="imgText">
            <img src="./src/assets/setting.png" />
                Settings
              </div>
              <div className="imgText">
            <img src="./src/assets/map.png" />
                Maps
              </div>
              <div className="imgText">
            <img src="./src/assets/mail.png" />
                Mail
              </div>
              <div className="imgText">
            <img onClick={props.weather} src="./src/assets/weather.png" />
                Weather
              </div>
              <div className="imgText">
            <img src="./src/assets/clock.png" />
                Clock
              </div>
              <div className="imgText">
            <img src="./src/assets/stock.png" />
                Stocks
              </div>
              <div className="imgText">
                <img src="./src/assets/wallet.png" />
                Wallet
              </div>
            </div>
            <div className="dockContainer appContainer">
              <img src="./src/assets/music.jpeg" />
              <img src="./src/assets/youtube.png" onClick={props.youtube} />
              <img src="./src/assets/phone.png" onClick={props.phonecall} />
              <img src="./src/assets/instagram.jpeg" />
            </div>
      </div>)
}

export default Phone
