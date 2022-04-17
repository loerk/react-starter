import React, { useEffect, useState } from "react";

const weatherKey = "639d9251f29344c48515467b1b904768";
//let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=${part}&appid=${weatherKey}`;

const Weather = () => {
  const [temp, setTemp] = useState("");
  const [feelTemp, setFeelTemp] = useState("");
  const [hide, setHide] = useState(true);
  const [city, setCity] = useState({ name: "Berlin", long: "", lat: "" });
  const [alert, setAlert] = useState([]);

  const getData = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=52.45&lon=13.43&units=metric&exclude=hourly,minutely&appid=${weatherKey}`
    );
    const data = await response.json();
    console.log(data);
    setTemp(data.current.temp);
    let alertsArr = data.alerts;
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
            : "Currently no alerts for this region"}
        </p>
      </div>
    </div>
  );
};

export default Weather;
