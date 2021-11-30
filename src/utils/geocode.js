const request = require('postman-request');

const geocode = (address, callback) => {
  const mapBoxToken = process.env.MAPBOX_TOKEN;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapBoxToken}&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    const { features: res } = body;

    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (!res || res.length === 0) {
      callback('Location not found', undefined);
    } else {
      const [data] = res;
      const { place_name: location } = data;
      const [longitude, latitude] = data.center;

      callback(undefined, { longitude, latitude, location });
    }
  });
};

module.exports = geocode;
