import React from "react";
import style from "./Weather.module.css";
import InfoBlock from "../InfoBlock/InfoBlock";

let Weather = (props) => {

    let createCity = (e) => {
        let city = e.target.value;
        props.setCity(city);

    };

    let findWeather = () => {
        props.setInfoAboutCityThunk(props.cityName, props.server);
    };

    let changeServer = (e) => {
        let server = e.target.value;
        props.setServer(server);
    };

    let determineAccuracy = (status) => {
        props.setAccuracy(status)
    };

    let getObj = () => {
        let obj = JSON.parse(localStorage.getItem("myWeather"));
        if (Object.keys(obj).length) {
            props.setInfoAboutCity(obj);
            Date.parse(obj.dateView) < (new Date() - 1000660 * 60 * 2) && localStorage.removeItem("myWeather");
        }
    };

    let drawMap = () => {
        if (props.mapState === true) {
            props.setMapState(false)
        } else {
            props.setMapState(true)
        }
    };

    let getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    let showPosition = (position) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        props.setCoordinates(lat, lng);
    };

    return (
        <div className={style.weatherBlock}>
            {
                getLocation()
            }
            <div className={style.mapBlock}>
                <h1 className={style.title}>Check the weather</h1>
                <button type="button" className={style.buttonMap} onClick={drawMap}>
                    {props.mapState === true ? "Close map" : "Open map"}</button>
                {props.mapState === true &&
                <div>
                    {props.findState === false ?
                        <p className={style.info}>Sorry for our inaccuracy. We will fix this error.</p> :
                        props.findState === true ? <p className={style.excellent}>Excellent</p> :
                            <div className={style.interrogationBlock}>
                                <p className={style.text}>Did we manage to find you?</p>
                                <button type="button" className={style.buttonYes}
                                        onClick={() => determineAccuracy(true)}>Yes
                                </button>
                                <button type="button" className={style.buttonNo}
                                        onClick={() => determineAccuracy(false)}>No
                                </button>
                            </div>}

                    <img alt="Map" width="auto"
                          src={`https://maps.googleapis.com/maps/api/staticmap?zoom=14&size=600x400&maptype=roadmap&&markers=size:mid%7Ccolor:red%7C${props.latitude},${props.longitude}&maptype=roadmap&key=AIzaSyAs8CgjaIZriCzcgmU6TGTF5Z-FmNvVc0Y`}/>
                </div>}
            </div>
            <div>
                <select value={props.server} onChange={changeServer}>
                    <option value="MetaWeather">MetaWeather</option>
                    <option value="OpenWeatherMap">OpenWeatherMap</option>
                </select>
                <form>
                    <input type="text" placeholder="City" value={props.cityName} onChange={createCity}
                           className={style.field}/>
                    <button type="button" onClick={findWeather} className={style.button}>Find</button>
                </form>
                {props.status === "INPROGRESS" && <p>Loading...</p>}


                <div className={style.list}>

                    {
                        !props.infoWeather.length && getObj()
                    }
                    {
                        props.infoWeather.map((i, index) => {
                            let objSave = {
                                server: i.server,
                                date: i.date,
                                name: i.name,
                                weatherState: i.weatherState,
                                maxTemp: i.maxTemp,
                                minTemp: i.minTemp,
                                wind: i.wind,
                                dateView: new Date()
                            };
                            localStorage.setItem("myWeather", JSON.stringify(objSave));

                            return <InfoBlock {...i} key={index}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
};

// key = AIzaSyAs8CgjaIZriCzcgmU6TGTF5Z-FmNvVc0Y

export default Weather;