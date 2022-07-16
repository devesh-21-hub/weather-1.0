import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Card from "../UI/Card";
import classes from "./Message.module.css";
const Message = () => {
  const [message, setMessage] = useState("loading");

  const getData = useCallback(async () => {
    const response = await fetch("http://localhost:8000");
    const data = await response.json();
    setMessage(data.message);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 2000);
  }, [getData]);
  return (
    <Card>
      <h1>Get the latest weather report of any place on the Earth!</h1>
      <h2>{message}</h2>
      <Link className={classes.link} to="/weather">
        Check Weather
      </Link>
    </Card>
  );
};

export default Message;
