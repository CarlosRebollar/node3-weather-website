const request = require("request");

const forecast = (latitude, longitude, cb) => {
  const url =
    "https://api.darksky.net/forecast/70eb4157bb7e7d1d330e975e1d5d61e3/" +
    latitude +
    "," +
    longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      cb("Unable to find location", undefined);
    } else {
      cb(
        undefined,
        body.daily.data[0].summary +
          " It is currently " +
          body.currently.temperature +
          " degrees out. There is a " +
          body.currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
