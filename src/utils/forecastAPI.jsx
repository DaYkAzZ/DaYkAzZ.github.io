export const fetchForecast = async (city) => {
    if (!city || city.trim() === '') {
        throw new Error('Veuillez entrer une ville');
    }

    // try {
        const geoResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`
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