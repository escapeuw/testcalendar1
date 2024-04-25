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
        console.log(e.target.value);
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
            <div className='inputDeco'><i className="fa-solid fa-magnifying-glass"></i>
                <input autoFocus
                    placeholder='search cities or airports'
                    value={props.city}
                    onChange={props.handleInput} onKeyDown={e => { if (e.code === "Enter") { props.fetchData() } }}></input>
            </div>
        </div>)
}


function CurrentOutput(props) {
    return (
        <div className="currentOutput">
            <div className='myLoc'>My Location</div>
            <img className='mainIcon' src={props.weatherData.current.condition.icon} alt="icon" />
            <div className='location'>{props.weatherData.location.name}</div>
            <div className='mainTemp'>{Math.round(props.weatherData.current.temp_c)}°</div>
            <div className='desc'>{props.weatherData.current.condition.text}</div>
            <div className='desc'>Feels like: {Math.round(props.weatherData.current.feelslike_c)}°</div>

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
                        <div className='hourlyContainer'>
                            <div className='hourlyTime'>{(i === 0) ? <span>Now</span>
                                : ((i + curIndex) === 0 || (i + curIndex) === 24) ? <span>12<span className='ampm'>AM</span></span>
                                    : ((i + curIndex) === 12) ? <span>12<span className='ampm'>PM</span></span>
                                        : ((i + curIndex) < 12) ? <span>{i + curIndex}<span className='ampm'>AM</span></span>
                                            : ((i + curIndex) > 24) ? <span>{i - (24 - curIndex)}<span class='ampm'>AM</span></span>
                                                : <span>{(i + curIndex) - 12}<span className='ampm'>PM</span></span>}</div>
                            <div><img src={item.condition.icon} alt='icon' /></div>
                            <div className='hourlyTemp'>{Math.round(item.temp_c)}°</div>
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

    const handleUV = () => {
        const uv = props.weatherData.current.uv;
        let uvCategory = '';
        let uvComment = '';
        if (uv < 3) {
            uvCategory = 'Low';
            uvComment = 'Minimal sun protection required.';
        } else if (uv < 6) {
            uvCategory = 'Moderate';
            uvComment = 'Sun protection recommended until 4pm.';
        } else if (uv < 8) {
            uvCategory = 'High';
            uvComment = 'Sun protection required. Reduce time in the sun between 11am and 4pm.';
        } else if (uv < 11) {
            uvCategory = 'Very High';
            uvComment = 'Extra sun protection required. Avoid the sun between 11am and 4pm.';
        } else {
            uvCategory = 'Extreme';
            uvComment = 'Take full precaution. Do not go outdoors.';
        }

        return (
            <div classname='uv'>
                <div className='widgetTitle'>☀︎ UV INDEX</div>
                <div className='widgetContent'>
                    <div>{uv}</div>
                    <div className='textContent'>{uvCategory}</div>
                </div>
                <div className='widgetComment'>{uvComment}</div>
            </div>
        )
    }

    const handleAstro = () => {
        const astro = props.weatherData.forecast.forecastday[0].astro;
        return (
            <div classname='astro'>
                <div className='widgetTitle'><i className="fa-regular fa-sun"></i> SUNRISE</div>
                <div className='widgetContent'>
                    {astro.sunrise}
                </div>
                <div className='widgetComment bold'>
                    <p>Sunset: {astro.sunset}</p></div>
            </div>
        )
    }
    const handleWind = () => {
        const wind = props.weatherData.current.wind_kph;
        const gust = props.weatherData.current.gust_kph;
        const dir = props.weatherData.current.wind_dir;
        return (
            <div classname='wind'>
                <div className='widgetTitle'><i className="fa-solid fa-wind"></i> WIND</div>
                <div className='widgetContent'>
                    <div className='windWidget'>{wind}
                        <div>
                            <div className='windgust min'>KM/H</div>
                            <div className='windgust'>Wind</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='windWidget'>{gust}
                        <div>
                            <div className='windgust min'>KM/H</div>
                            <div className='windgust'>Gusts</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const handleVisibility = () => {
        const vis = props.weatherData.current.vis_km;
        let comment = '';

        if (vis < 1) {
            comment = 'Foggy';
        } else if (vis < 2) {
            comment = 'Misty';
        } else if (vis < 5) {
            comment = 'Haze';
        } else if (vis < 10) {
            comment = 'Light Haze';
        } else if (vis < 20) {
            comment = 'Clear view';
        } else {
            comment = 'Perfecly clear view';
        }
        return (
            <div classname='vis'>
                <div className='widgetTitle'><i className="fa-solid fa-eye"></i> VISIBILITY</div>
                <div className='widgetContent'>
                    <div>{vis}<span className='ampm'> KM</span></div>
                </div>
                <div className='widgetComment'>{comment}</div>
            </div>
        )
    }

    return (
        <div className='forecastContainer'>
            {getHourly(newArr)}
            <div className='dailyContainer'>
                <div className='daily'>
                    <span className='dailyTitle'><i className="fa fa-calendar" aria-hidden="true"></i> 3-DAY FORECAST</span>
                </div>
                <hr></hr>
                <div className='daily'>
                    <div>Today</div>
                    <div><img src={props.weatherData.forecast.forecastday[0].day.condition.icon} alt='icon' width={40} /></div>
                    <div><span className='min'><span className='minmax'>MIN</span> {Math.round(props.weatherData.forecast.forecastday[0].day.mintemp_c)}°</span>
                        <span className='minmax'>MAX</span> {Math.round(props.weatherData.forecast.forecastday[0].day.maxtemp_c)}°</div>
                </div>
                <hr></hr>
                <div className='daily'>
                    <div>{getDay(props.weatherData.forecast.forecastday[1].date)}</div>
                    <div><img src={props.weatherData.forecast.forecastday[1].day.condition.icon} alt='icon' width={40} /></div>
                    <div><span className='min'><span className='minmax'>MIN</span> {Math.round(props.weatherData.forecast.forecastday[1].day.mintemp_c)}°</span><span className='minmax'>MAX</span> {Math.round(props.weatherData.forecast.forecastday[1].day.maxtemp_c)}°</div>
                </div>
                <hr></hr>
                <div className='daily'>
                    <div>{getDay(props.weatherData.forecast.forecastday[2].date)}</div>
                    <div><img src={props.weatherData.forecast.forecastday[2].day.condition.icon} alt='icon' width={40} /></div>
                    <div><span className='min'><span className='minmax'>MIN</span> {Math.round(props.weatherData.forecast.forecastday[2].day.mintemp_c)}°</span><span className='minmax'>MAX</span> {Math.round(props.weatherData.forecast.forecastday[2].day.maxtemp_c)}°</div>
                </div>
            </div>
            <div className='widgetContainer'>
                <div className='dailyContainer widget'>
                    {handleUV()}
                </div>
                <div className='dailyContainer widget'>
                    {handleAstro()}
                </div>
            </div>
            <div className='widgetContainer'>
                <div className='dailyContainer widget'>
                    {handleWind()}
                </div>
                <div className='dailyContainer widget'>
                    {handleVisibility()}
                </div>
            </div>
            <div className='widgetTitle'>Report an issue</div>

        </div>
    )
}


export default Weather