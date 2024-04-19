import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './assets/sky.jpeg'
import Calculator from './calculator/calculator.jsx';
import Weather from './weather/weather.jsx';
import YouTube from './youtube/youtube.jsx';
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
              <div className="imgText"><img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Messages/%40PNG.png" />
                Messages
              </div>
              <div className="imgText">
              <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/AppStore/%40PNG.png" />
                AppStore
              </div>
              <div className="imgText">
              <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Photos/%40PNG.png" />
                Photos
              </div>
              <div className="imgText">
            <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Safari/%40PNG.png" />
                Safari
              </div>
              <div className="imgText">
            <img onClick={props.calculator} src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Calculator/%40PNG.png" />
                Calculator
              </div>
              <div className="imgText">
            <img onClick={props.notes} src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Notes/%40PNG.png" />
                Notes
              </div>
              <div className="imgText">
            <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Calendar/%40PNG.png" />
                Calender
              </div>
              <div className="imgText">
            <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Camera/%40PNG.png" />
                Camera
              </div>
              <div className="imgText">
            <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Settings/%40PNG.png" />
                Settings
              </div>
              <div className="imgText">
            <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Maps/%40PNG.png" />
                Maps
              </div>
              <div className="imgText">
            <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Mail/%40PNG.png" />
                Mail
              </div>
              <div className="imgText">
            <img onClick={props.weather} src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Weather/%40PNG.png" />
                Weather
              </div>
              <div className="imgText">
            <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Clock/%40PNG.png" />
                Clock
              </div>
              <div className="imgText">
            <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Stocks/%40PNG.png" />
                Stocks
              </div>
              <div className="imgText">
                <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Wallet/%40PNG.png" />
                Wallet
              </div>
            </div>
            <div className="dockContainer appContainer">
              <img src="https://cdn.jim-nielsen.com/ios/512/apple-music-2020-09-25.png" />
              <img src="https://static.wikia.nocookie.net/ipod/images/e/e7/YouTube_iOS_2019.png" onClick={props.youtube} />
              <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Phone/%40PNG.png" onClick={props.phonecall} />
              <img src="https://cdn.jim-nielsen.com/ios/512/instagram-2022-05-19.png" />
            </div>
      </div>)
}

export default Phone
