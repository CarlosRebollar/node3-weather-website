const request = require("request");

const geocode = (address, cb) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmVib3EiLCJhIjoiY2p2eDIwcGk2MDBqcTRhbHUzOGlnOXFyciJ9.Es1lFbGSRyl2PHiiWiqcqg&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb("Unable to connect to geolocation service!", undefined);
    } else if (body.features.length === 0) {
      cb("Unable to find location. Try another search", undefined);
    } else {
      cb(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
