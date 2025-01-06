import { fetchForecast } from '../utils/forecastAPI';
import { useState, useEffect } from 'react';

export function Forecast({ city, day, forecastDay }) {
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    const handleFetchForecast = async () => {
        try {
            const data = await fetchForecast(city);
            setForecast(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        handleFetchForecast();
    }, [city]);

    let iconClass = '';

    function getWeather(forecastWeather) {
        forecastWeather = forecast?.daily?.weather_code[day];

        if (forecastWeather === 0) {
            iconClass = 'text-7xl m-2 fa-solid fa-sun';
            return 'Clear Sky';
        } else if (forecastWeather >= 1 && forecastWeather <= 3) {
            iconClass = 'text-7xl m-2 fas fa-sun';
            return 'Mainly Clear';
        } else if (forecastWeather >= 45 && forecastWeather <= 48) {
            return 'Fog';
        } else if (forecastWeather >= 51 && forecastWeather <= 55) {
            iconClass = 'text-7xl m-2 fa-solid fa-cloud-rain';
            return 'Drizzle';
        } else if (forecastWeather >= 56 && forecastWeather <= 57) {
            iconClass = 'text-7xl m-2 fa-solid fa-cloud-rain';
            return 'Freezing Drizzle';
        } else if (forecastWeather >= 61 && forecastWeather <= 65) {
            iconClass = 'text-7xl m-2 fa-solid fa-cloud-rain';
            return 'Rain';
        } else if (forecastWeather >= 66 && forecastWeather <= 67) {
            iconClass = 'text-7xl m-2 fa-solid fa-cloud-rain';
            return 'Freezing Rain';
        } else if (forecastWeather >= 71 && forecastWeather <= 75) {
            iconClass = 'text-7xl m-2 fa-solid fa-snowflake';
            return 'Snow Fall';
        } else if (forecastWeather >= 80 && forecastWeather <= 99) {
            iconClass = 'text-7xl m-2 fa-solid fa-cloud-bolt';
            return 'Thunderstorm';
        }
    }
    const weather = getWeather(forecast)

    return (
        <div className="text-white p-10 m-5 flex flex-col justify-between rounded-lg shadow-lg w-1/2 bg-gradient-to-t from-sky-400 to-indigo-600">
            {error && <span className="p-5 bg-red-500 text-white rounded-lg m-5 shadow-lg font-bold">{error}</span>}
            {forecast && (
                <div>
                    <div className='flex flex-row justify-between items-center mb-10'>
                        <div>
                            <h1 className='text-4xl font-bold mb-3'>{city}, {forecastDay}
                                <br />
                                <span className="font-bold" style={{
                                    color: forecast.daily.temperature_2m_max[day] > 20 ? 'red' : 'cyan',
                                }}> {forecast.daily.temperature_2m_max[day]} °C</span>
                            </h1>
                            <span className='font-bold text-2xl'> {weather} </span>
                        </div>
                        <div>
                            <i className={iconClass}></i>
                        </div>
                    </div>
                    <p className='mb-10'>Prévisions du {forecast.daily.time[day]}</p>
                    <div>
                        <div className="flex justify-between">
                            <div className="m-3 flex flex-col text-sm">
                                <h3 className="text-4xl font-bold">
                                    <i className="m-3 fa-solid fa-wind"></i>
                                </h3>
                                <span> <i className="fa-solid fa-gauge"></i> : {forecast.daily.wind_speed_10m_max[day]} km/h</span>
                            </div>
                            <div className="m-3 flex flex-col text-sm">
                                <h3 className="text-4xl font-bold">
                                    <i className="m-3 fa-solid fa-bolt"></i>
                                </h3>
                                <span> { } </span>
                                <span> <i className="mr-2 fa-solid fa-cloud-rain"></i>Précipitations : {forecast.daily.rain_sum[day]} mm</span>
                                <span><i className="mr-2 fa-solid fa-clock"></i>Daylight : {
                                    Math.round(forecast.daily.daylight_duration[day] / 3600)
                                } h</span>
                                <span> <i className="mr-2 fa-solid fa-cloud"></i>Probabilités : {forecast.daily.precipitation_probability_max[day]} %</span>
                            </div>
                            <div className="m-3 flex flex-col text-sm">
                                <h3 className="text-4xl font-bold">
                                    <i className="m-3 fa-solid fa-earth-americas"></i>
                                </h3>
                                <span> <i className="fa-solid fa-moon"></i> Sunset : {
                                    (forecast.daily.sunset[day]).split('T')[1]
                                } h</span>
                                <span> <i className="fa-solid fa-sun"></i> Sunrise : {
                                    (forecast.daily.sunrise[day]).split('T')[1]
                                } h</span>
                                <span> <i className="fa-solid fa-temperature-high"></i> Max : {forecast.daily.apparent_temperature_max[day]} °C</span>
                                <span> <i className="fa-solid fa-temperature-low"></i> Min : {forecast.daily.apparent_temperature_min[day]} °C</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
}