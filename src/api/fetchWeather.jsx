export let coords = null;
export let lat = null;
export let lon = null;

export const fetchWeather = async (city) => {
    if (!city) {
        throw new Error('Veuillez entrer une ville');
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c341ae4458e9185686adc0eea5614d08&units=metric`
        );

        if (!response.ok) {
            throw new Error('Ville non trouvée');
        }

        const data = await response.json();
        coords = data.coord;
        lat = coords.lat;
        lon = coords.lon;
        console.log("Lat : ", lat, "| Lon : ", lon);
        return data;

    } catch (error) {
        throw new Error(error.message);
    }
};