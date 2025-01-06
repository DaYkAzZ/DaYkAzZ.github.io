export const fetchForecast = async (city) => {
    if (!city || city.trim() === '') {
        throw new Error('Veuillez entrer une ville');
    }

    // try {
        const geoResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=48.866667&longitude=2.333333&hourly=temperature_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,pressure_msl,surface_pressure,wind_speed_10m,temperature_20m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max&models=meteofrance_seamless`
        );

        if (!geoResponse.ok) {
            throw new Error('Ville non trouvée');
        }

        const geoData = await geoResponse.json();
        console.log(geoData);
        return geoData;
    // } catch (error) {
    //     throw new Error(error.message);
    // }

    
};