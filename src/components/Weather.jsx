import { use, useState } from "react";
import { fetchWeather } from '../utils/weatherAPI';

export function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const handleFetchWeather = async () => {
        try {
            const data = await fetchWeather(city);
            setWeather(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        }
    };


    const weatherImg = {
        clear: {
            class: 'text-9xl m-3 fa-solid fa-sun'
        },
        cloudy: {
            class: 'text-9xl m-3 fa-solid fa-cloud'
        },
        cloudSunny: {
            class: 'text-9xl m-3 fa-solid fa-cloud-sun'
        },
        rainy: {
            class: 'text-9xl m-3 fa-solid fa-cloud-rain'
        },
        dust: {
            class: 'text-9xl m-3 fa-regular fa-sun-dust'
        }
    }

    let iconClass = '';

    if (weather) {
        console.log('Weather', weather)

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

    } else {
        console.log('Cannot read Weather')
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <span className="p-5 bg-red-500 text-white rounded-lg m-5 shadow-lg font-bold" style={{
                    display: error ? 'block' : 'none'
                }}>{error}</span>
                <h3 className="text-white">Choisissez une ville</h3>
                <div className="flex items-center">
                    <input className="shadow-lg border border-gray-300 my-10 mx-2 w-fit p-4 rounded-lg" type="text" placeholder="Entrez une ville" value={city} onChange={(e) => {
                        setCity(e.target.value)
                    }} />
                    <button className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full m-2 bg-black p-4 text-white" onClick={handleFetchWeather}>
                        Rechercher
                    </button>
                </div>
            </div>

            {weather && weather.main && (
                <div className="text-white p-20 flex flex-col justify-between rounded-lg shadow-lg w-2/3 bg-gradient-to-b from-sky-500 to-indigo-500">
                    <div className="flex justify-between items-center">
                        <h2 className="text-6xl font-bold mb-3">{weather.name}, Aujourd'hui
                            <br /><br />    <span className="font-bold" style={{
                                color: weather.main.temp > 25 ? 'red' : 'blue',
                            }}> {weather.main.temp}°C</span>
                        </h2>
                        <i className={iconClass}></i>
                    </div>
                    <div className="flex justify-around">
                        <div className="m-5 flex flex-col w-1/3">
                            <h3 className="text-4xl font-bold">
                                <i className="m-3 fa-solid fa-wind"></i>
                            </h3>
                            <span> Vitesse du vent : {weather.wind.speed} km/h</span>
                            <span> Orientation du vent : {weather.wind.deg}°</span>
                        </div>
                        <div className="m-5 flex flex-col w-1/3">
                            <h3 className="text-4xl font-bold">
                                <i class="m-3 fa-solid fa-bolt"></i>
                            </h3>
                            <span> {weather.weather[0].main} </span>
                            <span> Ressentie : {weather.main.feels_like} °C</span>
                            <span> Répartition des nuages dans l'air : {weather.clouds.all} %</span>
                        </div>
                        <div className="m-5 flex flex-col w-1/3">
                            <h3 className="text-4xl font-bold">
                                <i class="m-3 fa-solid fa-earth-americas"></i>
                            </h3>
                            <span> Humidité dans l'air : {weather.main.humidity} %</span>
                            <span> Pression de l'air : {weather.main.pressure} Bar</span>
                            <span> Température maximale : {weather.main.temp_max} °C</span>
                            <span> Température minimale : {weather.main.temp_min} °C</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}