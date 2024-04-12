import './weather.css'
import React from 'react'
import { useState } from "react";


function Weather() {
    const [defPage, setDefPage] = useState(true);
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState('');
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
            setWeatherData(null);
            setError(error.message);
            alert('Failed to fetch weather data');
        }
        setCity('');
        
    }
    
    return (
        <div className='weatherApp'>

            <div>
            <input
                placeholder = 'search cities or airports'
                value = {city}
                onChange = {handleInput}></input>
            <button className='search' onClick = {fetchData}>search cities</button>

            {weatherData && 
            (<div className='output'>
                <h2>My Location</h2>
                <img src={weatherData.current.condition.icon} alt="icon" />
                <p className='city'>{weatherData.location.name}</p>
                <p>{weatherData.current.temp_c}°</p>
                <p>{weatherData.current.condition.text}</p>
                <p>Feels like: {weatherData.current.feelslike_c}°</p>
            </div>)}

            </div>
        </div>
    )
}


export default Weather