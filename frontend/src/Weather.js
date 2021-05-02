import React, {useContext, useEffect, useState} from "react";

import countries from 'i18n-iso-countries';
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
export default function Weather({...props}) {  
    const [data, setData] = useState(0);
    const submitHandler = () => {
        setData((props.item.temp_max + props.item.temp_min) / 2);
      };
    return <div class="card-body text-center">
            {/* <img
            src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
            alt="weather status icon"
            className="weather-icon"
            /> */}

            <p className="h2">
            {props.item.day}
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
                <i className="fas fa-temperature-high"></i>{' '}
                <strong>
                    {props.item.temp_max.toFixed(2)}&deg; C
                </strong>
                </p>
                <p>
                <i class="fas fa-temperature-low "></i>{' '}
                <strong>    
                    {props.item.temp_min.toFixed(2)}&deg; C
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
                    <div>
                <strong>
                    {data.toFixed(2)}C

                </strong>
                <div style={{width:"20px", display:"inline-block", marginLeft:"10px"}}>
                    <button className="btn btn-primary mt-1" onClick={submitHandler}>
                        Average 
                    </button>
                </div>
                </div>
                </p>
                
            </div>
            </div>
        </div>
}
