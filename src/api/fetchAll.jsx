import React, { useState } from 'react';
import { fetchForecast } from './fetchForecast';
import { fetchWeather } from './fetchWeather';

const Searcher = () => {
    const [city, setCity] = useState('');
    const [forecast, setForecast] = useState(null);

    const handleFetchWeather = async () => {
        try {
            // Récupère les coordonnées
            const { lat, lon } = await fetchWeather(city);
            console.log(`Coordinates for ${city}: lat=${lat}, lon=${lon}`);

            // Récupère les prévisions météo
            const weatherForecast = await fetchForecast({ lat, lon });

            setForecast(weatherForecast); // Stocke les prévisions
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <div>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Entrez une ville"
            />
            <button onClick={handleFetchWeather}>Obtenir les prévisions</button>

            {forecast && (
                <div>
                    <h2>Prévisions météo pour {city}</h2>
                    <pre>{JSON.stringify(forecast, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Searcher;