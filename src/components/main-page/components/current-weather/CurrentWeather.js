
import moment from "moment";
import WeatherCard from "../weather-card/WeatherCard";

function CurrentWeather(props) {
    if(props.data) {
        return (
            <div className="mt-30">
                <p className="text-center fs-22 text-white">Current weather last updated at {moment(props.data.last_updated).format('HH:mm')}</p>
                <div className="d-flex justify-content-center">
                   <WeatherCard data={props.data} isExtended={true}></WeatherCard> 
                   
                </div>
                
            </div>
        )
    } else return null;
    
}

export default CurrentWeather;