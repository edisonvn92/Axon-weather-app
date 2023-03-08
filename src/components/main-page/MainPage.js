import './MainPage.scss';
import 'react-select-search/style.css';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import axios from 'axios';
import { useEffect, useReducer, useState } from 'react';
import CurrentWeather from './components/current-weather/CurrentWeather';
import ForecastWeather from './components/forecast-weather/ForecastWeather';

const initialState = {
    lat: 0,
    lon: 0,
    dayCount: 1,
}

const reducer = (state, action) => {
    let newState = {...state};
    switch (action.type) {
        case 'change_location': 
            newState.lat = action.value.lat;
            newState.lon = action.value.lon;
            return newState;
        case 'change_day_count':
            newState.dayCount = action.value;
            
            return newState;
        default:
            return newState;
        
    }
}

function MainPage(props) {
    
    const [weatherData, setWeatherData] = useState({})
    // let currentWeatherDiv = (<div></div>);
    const [state, dispatch] = useReducer(reducer, initialState);   
    const setLocation = (place) => {
        dispatch({type: 'change_location', value: {
            lat: place?.geometry?.location?.lat(),
            lon: place?.geometry?.location?.lng()
        }})
    };
    const setDayCount = (event) => {
        dispatch({type: 'change_day_count', value: event.target.value});
    }
    
    useEffect(() => {
        if(state.lat!== undefined || state.lon!==undefined || state.dayCount !== undefined) {
            axios.get(
                `https://${process.env.REACT_APP_PUBLIC_PROXY_LINK}api.weatherapi.com/v1/forecast.json
                ?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${state.lat},${state.lon}&days=${state.dayCount}&aqi=no&alerts=no`,
            ).then(
                (res) => {
                    setWeatherData(res.data);
                    
                }
            );
        }
    }, [state])

    return (
        <div className='main-page'>
            <div className='container m0-auto mt-30'>
                <h2 className='text-center text-white'>Axons weather app</h2>
                <label className='mt-20 text-white'>Please choose a location</label>
                <ReactGoogleAutocomplete
                    className='form-control mt-10'
                    apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
                    onPlaceSelected={setLocation}
                ></ReactGoogleAutocomplete>
        
                <label className='mt-20 text-white'>Please choose the number of days you want to see forecast</label>
                <input 
                    className='form-control mt-10' 
                    type={'number'} min="1" max='6' 
                    placeholder='select number of days for forecast'
                    value={state.dayCount}
                    onChange={setDayCount}
                />
                <CurrentWeather data={weatherData.current}></CurrentWeather>
                {weatherData.forecast?.forecastday.map((forecastDay, i) => {
                        return <ForecastWeather key={i} currentTime={weatherData.current.last_updated} data={forecastDay}></ForecastWeather>;
                }) }
            
        
            </div>
        </div>
    );
        
        
}


export default MainPage;