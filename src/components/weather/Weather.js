import { useEffect, useState } from "react";


const weatherKey = process.env.REACT_APP_WEATHER_API_KEY;

const Weather = () => {
  const [showFeltTemp, setShowFeltTemp] = useState(false)
  const [city] = useState({ name: "Berlin", long: "", lat: "" });
  const [weatherData, setWeatherData] = useState({});

  const getData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=52.45&lon=13.43&units=metric&exclude=hourly,minutely&appid=${weatherKey}`
      );
      const data = await response.json();
      console.log(data)

      setWeatherData(data)


    } catch (err) {
      console.log(err)
    }

  };

  useEffect(() => {
    getData();
  }, []);

  function renderAlerts() {
    if (!weatherData.alert) {
      return <p>Lucky, you! Currently no alerts for this region</p>
    }
    return (
      <div>
        {weatherData.alert.map(alert => <p>{alert.description}</p>)}
      </div>
    )
  }

  if (Object.keys(weatherData).length === 0) {
    return <p>Loading...</p>
  }
  return (
    <div>

      <h2>The current Temperature in {city.name} is</h2>
      <div className="currentTemp">
        <h2>{weatherData.current.temp} Celsius</h2>
        <p>but actually feels like</p>
      </div>
      <button
        onClick={() => {
          setShowFeltTemp(!showFeltTemp)
          //wow works if true/false toggle state
        }}
      >
        wanna know?
      </button>
      {showFeltTemp ? <h2 >{weatherData.current.feels_like} Celsius</h2> : null}
      <div className="alertbox">
        <p>
          {renderAlerts()}

        </p>
      </div>
      <h2>And thats what the future brings: </h2>
      <div className="forecast-box">
        {weatherData.daily.map((dailyWeather) => {
          let date = new Date(dailyWeather.dt * 1000);
          let dateArr = date.toString().split(" ");
          let dayWord = dateArr[0];
          let dayDate = dateArr[2];
          let month = dateArr[1];
          let temp = dailyWeather.temp;
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
