import Weather from "../../components/Weather/Weather";
import {connect} from "react-redux";
import {
    getCityNameSelector, getFindStateSelector, getInfoWeatherSelector, getLatitudeSelector, getLongitudeSelector,
    getMapState,
    getServerSelector,
    getStatusSelector, setAccuracyAC, setCityAC,
    setCoordinatesAC,
    setInfoAboutCityAC,
    setInfoAboutCityThunk, setMapStateAC,
    setServerAC
} from "../WeatherReducer";

let mapStateToProps =(state) => {
    return {
        cityName: getCityNameSelector(state),
        infoWeather: getInfoWeatherSelector(state),
        status: getStatusSelector(state),
        server: getServerSelector(state),
        latitude: getLatitudeSelector(state),
        longitude: getLongitudeSelector(state),
        findState: getFindStateSelector(state),
        mapState: getMapState(state)
    }
};

let mapDispatchToProps =(dispatch) => {
    return {
        setCity: (city) => {
            dispatch(setCityAC(city))
        },
        setInfoAboutCityThunk: (cityName, server) => {
            dispatch(setInfoAboutCityThunk(cityName, server))
        },
        setServer: (server) => {
            dispatch(setServerAC(server))
        },
        setInfoAboutCity: (newCity) => {
            dispatch(setInfoAboutCityAC(newCity))
        },
        setCoordinates: (lat, lng) => {
            dispatch(setCoordinatesAC(lat, lng))
        },
        setAccuracy: (status) => {
            dispatch(setAccuracyAC(status))
        },
        setMapState: (status) => {
            dispatch(setMapStateAC(status))
        }
    }
};

let WeatherContainer = connect(mapStateToProps, mapDispatchToProps)(Weather);
export default WeatherContainer;