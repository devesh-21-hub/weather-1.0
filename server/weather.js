const request = require("postman-request");
//Provide default parameters
const getForecast = (
  { latitude = 40.73, longitude = -73.93 } = {},
  callback
) => {
  const URL = `http://api.weatherstack.com/current?access_key=${process.env.KEY1}&query=${latitude},${longitude}&units=m`;
  request({ url: URL, json: true }, (error, { body }) => {
    try {
      const result = {
        temperature: body.current.temperature,
        description: body.current.weather_descriptions[0],
        icon: body.current.weather_icons[0],
      };
      callback(undefined, result);
    } catch (error) {
      callback(error.method + ": " + error.message, undefined);
    }
  });
};
//Provide default parameters
const getGeocode = (address = "New York", callback) => {
  const Url = `http://api.openweathermap.org/geo/1.0/direct?q=${address}&limit=3&appid=${process.env.KEY2}`;
  request({ url: Url, json: true }, (error, response, body) => {
    try {
      if (!response.error && body[0]) {
        const { lat: latitude, lon: longitude } = body[0];
        callback(undefined, { latitude, longitude });
      } else {
        callback("Unable to find the location. Try another search", undefined);
      }
    } catch (error) {
      callback("Unable to connect to the location service", undefined);
    }
  });
};

module.exports = {
  getForecast,
  getGeocode,
};
