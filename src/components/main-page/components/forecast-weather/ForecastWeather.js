import moment from "moment";
import WeatherCard from "../weather-card/WeatherCard";
import './ForecastWeather.scss';
function ForecastWeather(props) {
    if(props.data) {
        let today = moment(props.currentTime);
        let forecastDay = props.data.date;
        let isToday = today.isSame(forecastDay, 'date')
        return (
            <div className="mt-20">
                <h4 className="text-center fs-22 text-white">Forecast weather for {isToday ? 'today' : forecastDay}</h4>
                {isToday? null : 
                    <div className="d-flex justify-content-center">
                        <WeatherCard data={props.data.day} isExtended={true} approx={true}></WeatherCard> 
                    
                    </div>
                }
                <h4 className="text-center fs-20 text-white mt-10">Hourly forecast</h4>
                <div className="row justify-content-center">
                    {props.data.hour?.map(data => {
                        if (moment(data.time).isAfter(props.currentTime) ) {
                            return (<div className="col-2">
                                        <p className="text-white fs-22 text-center">{moment(data.time).format('HH:mm')}</p>
                                        <WeatherCard data={data}></WeatherCard>
                                    </div>);
                        } else return null;
                    }
                        
                    )}
                    
                </div>
            </div>
        )
    } else return null;
    
}

export default ForecastWeather;