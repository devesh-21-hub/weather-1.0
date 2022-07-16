import Card from "../UI/Card";
import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import classes from "./PlaceData.module.css";

const PlaceData = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [weatherInfo, setWeatherInfo] = useState({
    city: "",
    temperature: 0,
    description: "",
  });

  const location = useLocation();
  const { pathname } = location;
  const city = pathname.substring(
    pathname.lastIndexOf("/") + 1,
    pathname.length
  );

  const cityName = city.replaceAll("%20", " ");

  const getData = useCallback(async () => {
    console.log("Got data called");
    const URL = `http://localhost:8000/weather/${city}`;
    const response = await fetch(URL);
    const data = await response.json();
    setWeatherInfo(data);
    setIsFetched(true);
  }, [city]);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 1000);
  }, [getData]);

  const contentFetched = (
    <div className={classes.container}>
      <h1>Weather in {weatherInfo.city} is as:</h1>
      <h2>
        Currently the temperature is {weatherInfo.temperature}°C and it feels
        like: {weatherInfo.description}{" "}
        <img className={classes.image} alt="Weather" src={weatherInfo.icon} />
      </h2>
    </div>
  );

  const defaultContent = (
    <h2>Fetching the current weather data for {cityName}! </h2>
  );

  return <Card>{!isFetched ? defaultContent : contentFetched}</Card>;
};

export default PlaceData;
