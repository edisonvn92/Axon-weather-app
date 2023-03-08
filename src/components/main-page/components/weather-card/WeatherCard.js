import './WeatherCard.scss';

function WeatherCard(props) {
    return (
        <div className="d-flex weather-card justify-content-center">
            <div className="p-10">
                <h3 className='text-center'>{props.approx? props.data.mintemp_c + '-' + props.data.maxtemp_c : props.data?.temp_c}&#8451;</h3>
                <div className='text-center mb-0 fs-20'>{props.data?.condition?.text}</div>
                <div className='d-flex justify-content-center'>
                    <img src={props.data?.condition?.icon} alt={props.data?.condition?.text} />
                </div>
                
            </div>
            {props.isExtended? 
            (<div className='p-10 pt-30'>
                <p>Wind velocity: {props.approx? 'Up to ' + props.data.maxwind_kph : props.data?.wind_kph} km/h</p>
                <p>Humidity: {props.approx? '~' + props.data.avghumidity : props.data?.humidity}%</p>
                <p>UV: {props.data?.uv}</p>
                <p>Total Precipitation: {props.approx? props.data?.totalprecip_mm: props.data?.precip_mm} mm</p>
                <p>VIS: {props.approx? '~' + props.data?.avgvis_km: props.data?.vis_km} km</p>
            </div>) : null}
            
        </div>
        
    )
}

export default WeatherCard;