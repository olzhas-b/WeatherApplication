import React, {useContext, useEffect} from "react";

import countries from 'i18n-iso-countries';
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
export default function Weather({...props}) {  
    const kelvinToFarenheit = (k) => {
        return (k - 273.15).toFixed(2);
      };
    return <div class="card-body text-center">
            {/* <img
            src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
            alt="weather status icon"
            className="weather-icon"
            /> */}

            <p className="h2">
            {props.item.day}&deg; C
            </p>

            <p className="h5">
            <i className="fas fa-map-marker-alt"></i>{' '}
            <strong>{countries.getName(props.item.country, 'en', {
                    select: 'official',
                    })}</strong>
            </p>

            <div className="row mt-4">
            <div className="col-md-6">
                <p>
                <i class="fas fa-temperature-low "></i>{' '}
                <strong>    
                    {kelvinToFarenheit(props.item.temp_min)}&deg; C
                </strong>
                </p>
                <p>
                <i className="fas fa-temperature-high"></i>{' '}
                <strong>
                    {kelvinToFarenheit(props.item.temp_max)}&deg; C
                </strong>
                </p>
                <p>
                    {props.item.day}
                </p>
            </div>
            <div className="col-md-6">
                <p>
                {' '}
                {/* <strong>{apiData.weather[0].main}</strong> */}
                </p>
                <p>
                <strong>
                    {props.item.temp}
                </strong>
                </p>
            </div>
            </div>
        </div>
}
