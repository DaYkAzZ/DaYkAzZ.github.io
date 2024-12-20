import { use, useState } from "react";

export function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null)

    const fetchWeather = async () => {

        if (!city) {
            setError('Veuillez entrer une ville');
            return;
        }

        setError(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c341ae4458e9185686adc0eea5614d08&units=metric`
            );

            if (!response.ok) {
                throw new Error('Ville non trouvée')
            }

            const data = await response.json();
            setWeather(data);   

        } catch (error) {
            setError(error.message)
        }

        
    };

    const weatherImg = {
        clear : {
            class: 'fa-solid fa-sun'
        },
        cloudy: {
            class: 'fa-solid fa-cloud-sun'
        },
        rainy: {
            class: 'fa-solid fa-cloud-rain'
        }
    }

    if(weather) {
        console.log(weather)
    } else {
        console.log('Cannot read Weather')
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <span className="p-5 bg-red-500 text-white rounded-lg m-5 shadow-lg font-bold" style={{
                    display: error ? 'block' : 'none'
                }}>{error}</span>
                <h3>Choisissez une ville</h3>
                <div className="flex items-center">
                    <input className="shadow-lg w-fit p-4 rounded-lg" type="text" placeholder="Entrez une ville" value={city} onChange={(e) => {
                        setCity(e.target.value)
                    }} />
                    <button className="bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg m-2 bg-black p-2 text-white" onClick={fetchWeather}>
                        Rechercher
                    </button>
                </div>
            </div>

            {weather && weather.main && (
                <div className="text-white p-20 flex flex-col justify-center rounded-lg shadow-lg w-{300px} bg-gradient-to-r from-sky-500 to-indigo-500">
                    <h2 className="text-6xl font-bold mb-3">{weather.name}
                        <span className="font-normal" style={{
                            color: weather.main.temp > 25 ? 'red' : 'blue'
                        }}> {weather.main.temp}°C</span>
                    </h2>
                    <div className="p-10 flex flex-col justify-center items-center">
                        <h3 className="text-4xl font-bold">
                            <i className="m-3 fa-solid fa-wind"></i>
                            Vent
                        </h3>
                        <span> {weather.wind.speed} km/h</span>
                        <span> {weather.wind.deg}°</span>
                    </div>
                    <div className="p-10 flex flex-col justify-center items-center">
                        <h3 className="text-4xl font-bold">
                            Temps
                            <i className={weather.weather[0].main === 'Clouds' ? weatherImg.cloudy : weatherImg.clear}></i>
                        </h3>
                        <span> {weather.weather[0].main} </span>
                        <span> {weather.weather[0].description} </span>
                    </div>
                </div>
            )}
        </div>
    );
}