const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.set("view engine", "json");

const {
  getRecentPlaces,
  addCurrentPlace,
  deleteSelectedPlace,
} = require("./databases");
const { getForecast, getGeocode } = require("./weather");

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express server!" });
});

app.get("/weather", (req, res) => {
  res.json({ message: "Weather is fine!" });
  const recentSearches = getRecentPlaces();
});

app.post("/weather/:placeName", (req, res) => {
  const requestBody = req.body;
  const { searchedCity } = requestBody;

  //console.log(weatherInformation);
  // res.redirect("/weather/:placeName");

  // console.log(searchedCity);
});

app.get("/weather/:placeName", (req, res) => {
  const placeName = req.params.placeName;

  //Set default parameter
  getGeocode(placeName, (error, data) => {
    if (!error) {
      getForecast(data, (error, result) => {
        if (!error) {
          res.json({
            city: placeName,
            temperature: result.temperature,
            description: result.description,
            icon: result.icon,
          });
        }
      });
    }
  });

  const toSend = "Got your query for " + placeName + "!";
  const cityQuery = {
    name: placeName,
    temperature: 20,
    image: "Image",
    description: "Great place to be at!",
  };
});

app.delete("/weather", (req, res) => {
  const placeId = req.params.placeId;
  deleteSelectedPlace(placeId);
});

app.get("*", (req, res) => {
  res.json({ message: "Opps! Can not find the page you are looking for!" });
});

app.listen(8000 || process.env, () => {
  console.log("Server running on port 8000!");
});
