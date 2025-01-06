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

    return (
        <div className="text-white p-10 m-5 flex flex-col justify-between rounded-lg shadow-lg w-2/3 bg-gradient-to-b from-sky-500 to-indigo-500">
            {error && <span className="p-5 bg-red-500 text-white rounded-lg m-5 shadow-lg font-bold">{error}</span>}
            {forecast && (
                <div>
                    <h1 className='text-5xl font-bold mb-3'>{city}, Demain</h1>
                    <div>
                        <span>
                            {forecast.elevation}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}