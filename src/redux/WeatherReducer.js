import * as axios from "axios";

const SET_INFO_ABOUT_CITY = "WEATHER/SET_INFO_ABOUT_CITY";
const SET_CITY = "WEATHER/SET_CITY";
const SET_STATUS = "WEATHER/SET_STATUS";
const SET_SERVER = "WEATHER/SET_SERVER";
const SET_COORDINATES = "WEATHER/SET_COORDINATES";
const SET_ACCURACY = "WEATHER/SET_ACCURACY";
const SET_MAP_STATE = "WEATHER/SET_MAP_STATE";

export const errorMessages = {
    PERMISSION_DENIED: "PERMISSION_DENIED",
    POSITION_UNAVAILABLE: "POSITION_UNAVAILABLE",
    TIMEOUT: "TIMEOUT",
    UNKNOWN_ERROR: "UNKNOWN_ERROR"
};

export const statuses = {
    INIT: "INIT",
    ERROR: "ERROR",
    SUCCESS: "SUCCESS",
    INPROGRESS: "INPROGRESS",
    CAPTCHAREQUIRED: "CAPTCHAREQUIRED"
};

let initialState = {
    status: statuses.INIT,
    cityName: "",
    infoWeather: [],
    count: 0,
    server: "MetaWeather",
    message: "",
    latitude: "",
    longitude: "",
    findState: "",
    mapState: true

};

let WeatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CITY:
            return {
                ...state, cityName: action.city
            };
        case SET_INFO_ABOUT_CITY:
            return {
                ...state, infoWeather: [...state.infoWeather, action.newCity]
            };
        case SET_STATUS:
            return {
                ...state, status: action.status
            };
        case SET_MAP_STATE:
            return {
                ...state, mapState: action.status
            };
        case SET_SERVER:
            return {
                ...state, server: action.server
            };
        case SET_ACCURACY:
            return {
                ...state, findState: action.status
            };
        case SET_COORDINATES:
            return {
                ...state, latitude: action.lat, longitude: action.lng
            };
        default:
            return state
    }
};

export let setInfoAboutCityThunk = (cityName, server) => (dispatch) => {
    dispatch(setStatusAC(statuses.INPROGRESS));
    if (server === "MetaWeather") {
        axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${cityName}`)
            .then(res => {
                axios.get(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${res.data[0].woeid}/`)
                    .then(res => {
                        let weather = res.data["consolidated_weather"][0];

                        let newCity = {
                            server: server,
                            date: weather["applicable_date"],
                            name: cityName.toUpperCase(),
                            weatherState: weather["weather_state_name"],
                            maxTemp: weather["max_temp"].toFixed(2),
                            minTemp: weather["min_temp"].toFixed(2),
                            wind: weather["wind_speed"].toFixed(2)
                        };
                        dispatch(setInfoAboutCityAC(newCity));
                        dispatch(setStatusAC(statuses.SUCCESS))
                    })
                    .catch(error => {
                        alert(error);
                        dispatch(setStatusAC(statuses.ERROR))
                    })


            });
    } else if (server === "OpenWeatherMap") {

        axios.get(`https://cors-anywhere.herokuapp.com/https://openweathermap.org/data/2.5/weather?q=${cityName}&appid=b6907d289e10d714a6e88b30761fae22`)
            .then(res => {
                let newCity = {
                    server: server,
                    date: res.headers.date,
                    name: cityName.toUpperCase(),
                    weatherState: res.data.weather[0].description,
                    maxTemp: res.data.main["temp_max"].toFixed(2),
                    minTemp: res.data.main["temp_min"].toFixed(2),
                    wind: res.data.wind.speed.toFixed(2)
                };
                dispatch(setInfoAboutCityAC(newCity));
                dispatch(setStatusAC(statuses.SUCCESS))
            })
            .catch(error => {
                alert(error);
                dispatch(setStatusAC(statuses.ERROR))
            })
    }
};

export let setCityAC = (city) => ({type: SET_CITY, city});
export let setInfoAboutCityAC = (newCity) => ({type: SET_INFO_ABOUT_CITY, newCity});
export let setStatusAC = (status) => ({type: SET_STATUS, status});
export let setServerAC = (server) => ({type: SET_SERVER, server});
export let setCoordinatesAC = (lat, lng) => ({type: SET_COORDINATES, lat, lng});
export let setAccuracyAC = (status) => ({type: SET_ACCURACY, status});
export let setMapStateAC = (status) => ({type: SET_MAP_STATE, status});

export let getCityNameSelector = (state) => {
    return state.weather.cityName
};
export let getInfoWeatherSelector = (state) => {
    return state.weather.infoWeather
};
export let getStatusSelector = (state) => {
    return state.weather.status
};
export let getServerSelector = (state) => {
    return state.weather.server
};
export let getLatitudeSelector = (state) => {
    return state.weather.latitude
};
export let getLongitudeSelector = (state) => {
    return state.weather.longitude
};
export let getFindStateSelector = (state) => {
    return state.weather.findState
};
export let getMapState = (state) => {
    return state.weather.mapState
};

export default WeatherReducer;
