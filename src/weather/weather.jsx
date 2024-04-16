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
        <div class="currentOutput">
            <div className='myLoc'>My Location</div>
            <img className='mainIcon' src={props.weatherData.current.condition.icon} alt="icon" />
            <div className='location'>{props.weatherData.location.name}</div>
            <div className='mainTemp'>{props.weatherData.current.temp_c}°</div>
            <div className='desc'>{props.weatherData.current.condition.text}</div>
            <div className='desc'>Feels like: {props.weatherData.current.feelslike_c}°</div>

        </div>)

}

function Forecast(props) {
    const today = props.weatherData.forecast.forecastday[0].hour;
    const tomorrow = props.weatherData.forecast.forecastday[1].hour;
    const curTime = props.weatherData.current.last_updated_epoch;
    const curIndex = today.findIndex(item => item.time_epoch > curTime) - 1;
    const newToday = today.slice(curIndex);
    const newTomorrow = tomorrow.slice(0, curIndex + 1);
    const newArr = [...newToday, ...newTomorrow];

    const getHourly = (arr) => {
        return (
            <div className='hourly'>
                {
                    arr.map((item, i) => (
                        <div>
                            <div className='hourlyTime'>{(i === 0) ? <span>Now</span>
                                : ((i + curIndex) === 0 || (i + curIndex) === 24) ? <span>12<span className='ampm'>AM</span></span>
                                    : ((i + curIndex) === 12) ? <span>12<span className='ampm'>PM</span></span>
                                        : ((i + curIndex) < 12) ? <span>{i + curIndex}<span className='ampm'>AM</span></span>
                                            : ((i + curIndex) > 24) ? <span>{i - (24 - curIndex)}<span class='ampm'>AM</span></span>
                                                : <span>{(i + curIndex) - 12}<span className='ampm'>PM</span></span>}</div>
                            <div><img src={item.condition.icon} alt='icon' /></div>
                            <div className='hourlyTemp'>{item.temp_c}°</div>
                        </div>))
                }
            </div>
        )
    }

    const getDay = (input) => {
        let date = new Date(input);
        date.setDate(date.getDate() + 1);
        const stringDate = date.toString();
        const day = stringDate.slice(0, 3);
        return day;
    }


    const getDaily = (arr) => {
        return (
            <div className='daily'>

            </div>
        )
    }

    return (
        <div className='forecastContainer'>
            {getHourly(newArr)}
            <div className='dailyContainer'>
                <div className='daily'>
                    <div>Today</div>
                    <div><img src={props.weatherData.forecast.forecastday[0].day.condition.icon} alt='icon' width={40} /></div>
                    <div><span className='ampm'>Min</span> {props.weatherData.forecast.forecastday[0].day.mintemp_c}° ~ <span className='ampm'>Max</span> {props.weatherData.forecast.forecastday[0].day.maxtemp_c}°</div>
                </div>
                <hr></hr>
                <div className='daily'>
                    <div>{getDay(props.weatherData.forecast.forecastday[1].date)}</div>
                    <div><img src={props.weatherData.forecast.forecastday[1].day.condition.icon} alt='icon' width={40} /></div>
                    <div><span className='ampm'>Min</span> {props.weatherData.forecast.forecastday[1].day.mintemp_c}° ~ <span className='ampm'>Max</span> {props.weatherData.forecast.forecastday[1].day.maxtemp_c}°</div>
                </div>
                <hr></hr>
                <div className='daily'>
                    <div>{getDay(props.weatherData.forecast.forecastday[2].date)}</div>
                    <div><img src={props.weatherData.forecast.forecastday[2].day.condition.icon} alt='icon' width={40}  /></div>
                    <div><span className='ampm'>Min</span> {props.weatherData.forecast.forecastday[2].day.mintemp_c}° ~ <span className='ampm'>Max</span> {props.weatherData.forecast.forecastday[2].day.maxtemp_c}°</div>
                </div>
            </div>
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