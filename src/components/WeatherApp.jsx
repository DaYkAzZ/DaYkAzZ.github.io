// global weather component

import { useState } from "react";
import { Weather } from "./Weather";
import { Forecast } from "./Forecast";

export function WeatherApp() {
    const [city, setCity] = useState('');

    console.log('city', city);
    return (
        <div className="flex flex-row justify-between m-20 h-screen">
            <Weather setCity={(city) => {
                console.log(city);
                setCity(city);
            }} />
            {city && <Forecast city={city} />}
        </div>
    );
}
