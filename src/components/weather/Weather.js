import { getDefaultNormalizer } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { WEATHER_API_KEY } from "../../apiKey";
const weatherKey = WEATHER_API_KEY;

const Weather = () => {
  const [temp, setTemp] = useState("");
  const [feelTemp, setFeelTemp] = useState("");
  const [hide, setHide] = useState(true);
  const [city, setCity] = useState({ name: "Berlin", long: "", lat: "" });
  const [daily, setDaily] = useState([]);
  const [alert, setAlert] = useState([]);

  // * 1000 weil secunden -> brauche millisec

  const getData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=52.45&lon=13.43&units=metric&exclude=hourly,minutely&appid=${weatherKey}`
    );
    const data = await response.json();
    console.log(data);
    const dailyArr = data.daily;
    setDaily(dailyArr);
    setTemp(data.current.temp);
    const alertsArr = data.alerts;
    setFeelTemp(data.current.feels_like);
    alertsArr.forEach((item) => setAlert([item.description]));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="weather">
      <div className={!city.name ? "hide" : null}>
        <h2>The current Temperature in {city.name} is</h2>
        <div className="currentTemp">
          <h2>{temp} Celsius</h2>
          <p>but actually feels like</p>
        </div>
        <button
          onClick={() => {
            hide ? setHide(false) : setHide(true);
          }}
        >
          wanna know?
        </button>
        <h2 className={hide ? "hide" : null}>{feelTemp} Celsius</h2>
      </div>
      <div className="alertbox">
        <p>
          {" "}
          {alert !== []
            ? `Take care: ${alert}`
            : "Lucky, you! Currently no alerts for this region"}
        </p>
      </div>
      <h2>And thats what the future brings: </h2>
      <div className="forecast-box">
        {daily.map((days) => {
          let date = new Date(days.dt * 1000);
          let dateArr = date.toString().split(" ");
          let dayWord = dateArr[0];
          let dayDate = dateArr[2];
          let month = dateArr[1];
          let temp = days.temp;
          let maxTemp = temp.max;
          let minTemp = temp.min;

          return (
            <div className="forecast-item">
              <h2>
                {dayWord} {dayDate} {month}{" "}
              </h2>
              <p>Max: {maxTemp} Celsius</p>
              <p>Min: {minTemp} Celsius</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Weather;
