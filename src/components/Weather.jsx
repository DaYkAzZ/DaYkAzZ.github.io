import { use, useState } from "react";
import { fetchWeather } from '../utils/weatherAPI';

export function Weather({ setCity }) {
    const [inputCity, setInputCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const handleFetchWeather = async () => {
        try {
            const data = await fetchWeather(inputCity);
            setWeather(data);
            setError(null);
            setCity(inputCity);

        } catch (err) {
            setError(err.message);
        }
    };

    const weatherImg = {
        clear: {
            class: 'text-7xl m-2 fa-solid fa-sun'
        },
        cloudy: {
            class: 'text-7xl m-2 fa-solid fa-cloud'
        },
        cloudSunny: {
            class: 'text-7xl m-2 fa-solid fa-cloud-sun'
        },
        rainy: {
            class: 'text-7xl m-2 fa-solid fa-cloud-rain'
        },
        dust: {
            class: 'text-7xl m-2 fa-regular fa-sun-dust'
        }
    }

    let iconClass = '';

    if (weather) {
        let time = weather.weather[0].main;

        function chooseTimeIcon(time) {
            if (time === 'Clouds') {
                iconClass = weatherImg.cloudy.class;
            } else if (time === 'Rain') {
                iconClass = weatherImg.rainy.class;
            } else if (time === 'Sun' || time === 'Sunny') {
                iconClass = weatherImg.clear.class;
            } else {
                iconClass = weatherImg.cloudSunny.class;
            }
        }

        chooseTimeIcon(time)

    }

    return (
        <div>
            <div>
                <span className="p-5 bg-red-500 text-white rounded-lg m-5 shadow-lg font-bold" style={{
                    display: error ? 'block' : 'none'
                }}>{error}</span>
                <h3 className="text-white">Choisissez une ville</h3>
                <div className="flex items-center">
                    <input className="shadow-lg border border-gray-300 my-10 mx-2 w-fit p-4 rounded-lg" type="text" placeholder="Entrez une ville" value={inputCity} onChange={(e) => {
                        setInputCity(e.target.value)
                    }} />
                    <button className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full m-2 bg-black p-4 text-white" onClick={handleFetchWeather}>
                        Rechercher
                    </button>
                </div>
            </div>
            {weather && weather.main && (
                <div className="text-white p-10 m-5 w-full flex flex-col justify-between rounded-lg shadow-lg bg-gradient-to-b from-sky-500 to-indigo-500">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <h2 className="text-4xl font-bold mb-3">{weather.name}, Aujourd'hui
                                <br />
                                <span className="font-bold" style={{
                                    color: weather.main.temp > 20 ? 'red' : 'cyan',
                                }}> {weather.main.temp}°C</span>
                            </h2>
                        </div>
                        <div>
                            <i className={iconClass}></i>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="m-3 flex flex-col text-sm">
                            <h3 className="text-4xl font-bold">
                                <i className="m-3 fa-solid fa-wind"></i>
                            </h3>
                            <span> <i className="fa-solid fa-gauge"></i> : {weather.wind.speed} km/h</span>
                            <span> <i className="fa-solid fa-diamond-turn-right"></i> : {weather.wind.deg}°</span>
                        </div>
                        <div className="m-3 flex flex-col text-sm">
                            <h3 className="text-4xl font-bold">
                                <i className="m-3 fa-solid fa-bolt"></i>
                            </h3>
                            <span> {weather.weather[0].main} </span>
                            <span> <i className="fa-solid fa-user"></i> : {weather.main.feels_like} °C</span>
                            <span> <i className="fa-solid fa-cloud"></i> : {weather.clouds.all} %</span>
                        </div>
                        <div className="m-3 flex flex-col text-sm">
                            <h3 className="text-4xl font-bold">
                                <i className="m-3 fa-solid fa-earth-americas"></i>
                            </h3>
                            <span> <i className="fa-solid fa-water"></i> : {weather.main.humidity} %</span>
                            <span> <i className="fa-solid fa-compress"></i> : {weather.main.pressure} Bar</span>
                            <span> <i className="fa-solid fa-temperature-high"></i> : {weather.main.temp_max} °C</span>
                            <span> <i className="fa-solid fa-temperature-low"></i> : {weather.main.temp_min} °C</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}