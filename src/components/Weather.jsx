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
    return (
        <div>
            <div className="flex flex-col justify-center items-center">
                <h3>Choisissez une ville</h3>
                <div className="flex items-center">
                    <input className="shadow-lg w-fit p-4 rounded-lg" type="text" placeholder="Entrez une ville" value={city} onChange={(e) => {
                        setCity(e.target.value)
                    }} />
                    <button className="rounded-lg m-2 bg-black p-2 text-white" onClick={fetchWeather}>
                        Rechercher
                    </button>
                </div>
                <span className="bg-red-500 text-white rounded-lg m-5 shadow-lg font-bold">{error}</span>
            </div>

            {weather && weather.main && (
                <div className="p-20 flex flex-col justify-center border border-gray-300 rounded-lg shadow-sm">

                    <h2 className="text-6xl font-bold text-red-500 mb-3">{weather.name}</h2>
                    <div className="flex items-center justify-between">
                        <div className="p-10 flex flex-col bg-slate-100 w-1/3">
                            <h3 className="text-3xl">Informations Température : </h3>
                            <span>Température réelle : {weather.main.temp}°C</span>
                            <span>Température ressentie : {weather.main.feels_like}°C</span>
                        </div>

                        <div className="p-10 flex flex-col bg-slate-100 w-1/3">
                            <h3 className="text-3xl">Informations diverses : </h3>
                            <span>Temps actuel :  {weather.weather[0].description}</span>
                            <span>Humidité : {weather.main.humidity}%</span>
                            <span>Pression : {weather.main.pressure} Bar</span>
                        </div>
                        <div className="p-10 flex flex-col bg-slate-100 w-1/3">
                            <h2 className="text-2xl font-bold text-black">Vent</h2>
                            <span>Vitesse du vent : {weather.wind.speed} km/h</span>
                            <span>Direction du vent : {weather.wind.deg} degrés </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}