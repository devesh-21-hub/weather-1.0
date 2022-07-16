import { useEffect, useState, useRef, useCallback } from "react";
import classes from "./Weather.module.css";
import Card from "../components/UI/Card";
import { useNavigate } from "react-router-dom";
//import mainImage from "../../assests/main-image.jpg";

const Weather = () => {
  let navigate = useNavigate();
  const cityInputRef = useRef("");
  const [weather, setWeather] = useState("Fetching weather report!");
  const getData = useCallback(async () => {
    const response = await fetch("http://localhost:8000/weather");
    const data = await response.json();
    setWeather(data.message);
  }, []);

  useEffect(() => {
    getData();
    console.log("Weather called");
  }, [getData]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const city = cityInputRef.current.value;
    const sendData = async () => {
      const URl = `http://localhost:8000/weather/${city}`;
      const response = await fetch(URl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchedCity: city }),
      });
      const data = await response.json();
      if (!data.ok) console.log("Error occured while posting data");
    };
    sendData();
    console.log(city);
    navigate(`/weather/${city}`);

    //navigate(`/weather/$?place={city}`, { replace: true });
    // navigate(
    //   { pathname: location.pathname, search: `?place=${city}` },
    //   { replace: true }
    // );
    cityInputRef.current.value = "";
  };
  return (
    <Card>
      <h1 className={classes.header}>Weather Report</h1>
      <form className={classes.form} onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="city">Enter City</label>
          <input type="text" id="city" ref={cityInputRef} />
        </div>

        <div className={classes.actions}>
          <button className={classes.submit} type="submit">
            Check Weather
          </button>
        </div>
      </form>

      <h2 className={classes.weather}>{weather}</h2>
    </Card>
  );
};

export default Weather;
