// global weather component

import { useState } from "react";
import { Weather } from "./Weather";
import { Forecast } from "./Forecast";

export function WeatherApp() {
    const [city, setCity] = useState('');
    return (
        <div className="flex flex-col justify-between items-center">
            <div className="flex flex-row justify-between items-center w-full">
                <Weather setCity={(city) => {
                    setCity(city);
                }} />
                {city && <Forecast city={city} day={1} forecastDay={"Demain"}/>}
            </div>
            <div className="flex flex-row justify-between items-center w-full">
                {city && <Forecast city={city} day={2} forecastDay={"Dans 2 Jours"}/>}
                {city && <Forecast city={city} day={3} forecastDay={"Dans 3 Jours"}/>}
            </div>
        </div>
    );
}
