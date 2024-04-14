import './weather.css'
import React from 'react'
import { useState } from "react";


function Weather() {
    const [defPage, setDefPage] = useState(true);
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState('');
    const [weatherData2, setWeatherData2] = useState('');
    const [error, setError] = useState();

    const handleInput = (e) => {
        setCity(e.target.value);
    }

    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;
    const defaultUrl = 'https://weatherapi-com.p.rapidapi.com/current.json?q=toronto';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bdeff4ae63mshd923975a9b7fe6cp1b05dbjsn1b6742efd271',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };


    const fetchData = async () => {
        try {
            const response = await fetch(url, options);
            //prevent error //
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const result = await response.json();
            setWeatherData(result);
            console.log(result);
            // default page //
            setDefPage(false);

        } catch (error) {
            setError(error.message);
            alert('Failed to fetch weather data');
        }

        const url2 = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=5`;


        try {
            const response = await fetch(url2, options);
            const result = await response.json();
            setWeatherData2(result);
            console.log(result);

        } catch (error) {
            console.error(error);
        }
        setCity('');

    }

    return (
        <div className='weatherApp'>
            <div className='container'>
                <TopContainer handleInput={handleInput} fetchData={fetchData} city={city} />
                <div className='outputContainer'>
                    {weatherData2 &&
                        <CurrentOutput weatherData2={weatherData2} />}
                    {weatherData2 &&
                        <Forecast weatherData2={weatherData2} />}
                </div>
            </div>
        </div>
    )
}

function TopContainer(props) {
    return (
        <div className='searchContainer'>
            <input
                placeholder='search cities or airports'
                value={props.city}
                onChange={props.handleInput}></input>
            <button className='search' onClick={props.fetchData}>search cities</button>
        </div>)
}


function CurrentOutput(props) {
    return (
        <div class="currentContainer">
            <div className='currentOutput'>
                <p className='location'>My Location</p>
                <img src={props.weatherData2.current.condition.icon} alt="icon" />
                <p className='city'>{props.weatherData2.location.name}</p>
                <p className='mainTemp'>{props.weatherData2.current.temp_c}°</p>
                <p>{props.weatherData2.current.condition.text}</p>
                <p>Feels like: {props.weatherData2.current.feelslike_c}°</p>
            </div>
        </div>)

}

function Forecast() {
    return (
        <div class='forecastContainer'>
            <div class='forecast'>
                <p>Today testingtestingtesting</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                
            </div>
        </div>
    )
}


export default Weather