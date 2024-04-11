import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calculator from './calculator/calculator.jsx'
import React from 'react'

const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();


class Phone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'home',
      homeButton: false,
      isExpanded: false
    }
    this.handleCalculator = this.handleCalculator.bind(this);
    this.handlePhoneCall = this.handlePhoneCall.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleHome = this.handleHome.bind(this);
  }
  handleCalculator() {
    this.setState(state => ({
      current: 'calculator',
      homeButton: true,
      isExpanded: true
    }))
  }
  handlePhoneCall() {
    this.setState(state => ({
      current: 'phonecall',
      homeButton: true
    }))
  }
  handleNotes() {
    this.setState(state => ({
      current: 'notes',
      homeButton: true
    }))
  }
  handleHome() {
    this.setState(state => ({
      current: 'home',
      homeButton: false
    }))
  }
  render() {
    const homeButton = this.state.homeButton;
    const current = this.state.current;
    return(
      <div>
        <div className="iPhone">
          {/* change screen background depending on apps*/}
          <div className="screen" style={(current === 'calculator' || current === 'phonecall') ? {background: "black"} : current === 'notes' ? {background: "beige"} : {}}>
              <div className="topBar" style={current === "notes" ? {color: "black"} : {}} onClick={homeButton ? this.handleHome : undefined}>
              <span className="clock">{hours}:{minutes}</span>
              <span className="icons">
                <i className="fa-solid fa-signal"></i>
                <i className="fa-solid fa-wifi"></i>
                <i className="fa-solid fa-battery-full"></i>
                </span> 
              </div>
            <div id="contentContainer">
              {this.state.current === 'home' && <Apps calculator={this.handleCalculator} phonecall={this.handlePhoneCall} notes={this.handleNotes} />}
              {this.state.current === 'calculator' && <Calculator />}
              {this.state.current === 'phonecall' && <PhoneCall />}
              {this.state.current === 'notes' && <Notes />} 
           </div>
          </div>
         </div>
      </div>
    )
  }
}


class Apps extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
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
            <img onClick={this.props.calculator} src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Calculator/%40PNG.png" />
                Calculator
              </div>
              <div className="imgText">
            <img onClick={this.props.notes} src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Notes/%40PNG.png" />
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
            <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Weather/%40PNG.png" />
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
              <img src="https://static.wikia.nocookie.net/ipod/images/e/e7/YouTube_iOS_2019.png" />
              <img src="https://aroundsketch.github.io/Apple-App-Icons/App%20Icon/Apple/Phone/%40PNG.png" onClick={this.props.phonecall} />
              <img src="https://cdn.jim-nielsen.com/ios/512/instagram-2022-05-19.png" />
            </div>
      </div>)
  }
}

export default Phone
