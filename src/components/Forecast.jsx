import { fetchForecast } from '../utils/forecastAPI';
import { useState, useEffect } from 'react';

export function Forecast({ city }) {
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
        forecastWeather = forecast.daily.weather_code[1];

        if (forecastWeather === 0) {
            iconClass = 'fas fa-sun';
            return 'Clear Sky';
        } else if (forecastWeather >= 1 && forecastWeather <= 3) {
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
            iconClass = 'text-7xl m-2 fa-solid fa-cloud-rain';
            return 'Snow Fall';
        } else if (forecastWeather >= 80 && forecastWeather <= 99) {
            iconClass = 'text-7xl m-2 fa-solid fa-cloud-rain';
            return 'Thunderstorm';
        }
        console.log(iconClass);
        
    }
    const weather = getWeather(forecast)
    return (
        <div className="text-white p-10 m-5 flex flex-col justify-between rounded-lg shadow-lg w-2/3 bg-gradient-to-b from-sky-500 to-indigo-500">
            {error && <span className="p-5 bg-red-500 text-white rounded-lg m-5 shadow-lg font-bold">{error}</span>}
            {forecast && (
                <div>
                    <h1 className='text-5xl font-bold mb-3'>{city}, Demain
                        <span className="font-bold" style={{
                            color: forecast.daily.temperature_2m_max[1] > 20 ? 'red' : 'blue',
                        }}> {forecast.daily.temperature_2m_max[1]} °C</span>
                    </h1>
                    <i className={iconClass}></i>
                    <div>
                        <span>
                            {weather}
                        </span>
                    </div>
                </div>
                // ajouter les 3 prochains jours
            )}
        </div>
    );
}