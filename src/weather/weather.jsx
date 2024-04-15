import './weather.css'
import React from 'react'
import { useState } from "react";
import { useEffect } from 'react';


function Weather() {
    const [isDefault, setIsDefault] = useState(true);
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState('');
    const [error, setError] = useState();

    const handleInput = (e) => {
        setCity(e.target.value);
    }

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=5`;
    const defaultUrl = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=${toronto}&days=5';

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'bdeff4ae63mshd923975a9b7fe6cp1b05dbjsn1b6742efd271',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    const defaultScreen = async () => {
        try {
            const response = await fetch(defaultUrl, options);
            //prevent error //
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
    
            const result = await response.json();
            setWeatherData(result);
            // default page //
    
        } catch (error) {
            setError(error.message);
            alert(error.message);
        }
    }

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
            setIsDefault(false);
            // default page //

        } catch (error) {
            setError(error.message);
            setCity('');
            alert(error.message);
        }
        setCity('');
    }

    useEffect(() => {
        defaultScreen();
      }, []);

    return (
        <div className='weatherApp'>
            
            <div className='container'>
                <TopContainer handleInput={handleInput} fetchData={fetchData} city={city} />
                <div className='outputContainer'>
                    {weatherData &&
                        <CurrentOutput weatherData={weatherData} />}
                    {weatherData &&
                        <Forecast weatherData={weatherData} />}
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
                <img src={props.weatherData.current.condition.icon} alt="icon" />
                <p className='city'>{props.weatherData.location.name}</p>
                <p className='mainTemp'>{props.weatherData.current.temp_c}°</p>
                <p>{props.weatherData.current.condition.text}</p>
                <p>Feels like: {props.weatherData.current.feelslike_c}°</p>
            </div>
        </div>)

}

function Forecast(props) {
    const today = props.weatherData.forecast.forecastday[0].hour;

    const getHourly = (arr) => {
        return (
            <div className='hourly'>
            {
                arr.map((item, i) => (
                    <div>
                        <p className='hourlyTime'>{i === 0 ? <span>12AM</span> 
                        : i === 12 ? <span>12PM</span> 
                        : i < 12 ? <span>{i}AM</span> 
                        : <span>{i - 12}PM</span>}</p>
                        <p><img src={item.condition.icon} alt='icon' /></p>
                        <p className='hourlyTemp'>{item.temp_c}°</p>
                    </div>))
            }
            </div>
        )
    }
    return (
        <div className='forecastContainer'>
                {getHourly(today)}
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>

            <div>
                <p>something else</p>
                <p>something else</p>
                <p>something else</p>
            </div>
        </div>
    )
}


export default Weather