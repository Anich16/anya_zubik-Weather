import React from "react";
import style from "./InfoBlock.module.css";

let InfoBlock = (props) => {
    return (
        <div  className={style.infoBlock}>
            <h2>{props.server}</h2>
            <p className={style.info}><b>City: </b>{props.name}</p>
            <p className={style.info}><b>Date: </b>{props.date}</p>
            <p className={style.info}><b>Weather state: </b>{props.weatherState}</p>
            <p className={style.info}><b>Max temperature: </b>{props.maxTemp} °C</p>
            <p className={style.info}><b>Min temperature: </b>{props.minTemp} °C</p>
            <p className={style.info}><b>Wind speed: </b>{props.wind} km/h</p>
        </div>
    )
};

export default InfoBlock;