const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
  const weatherstackAPIKey = process.env.WEATHERSTACK_API_KEY;
  const url = `http://api.weatherstack.com/current?access_key=${weatherstackAPIKey}&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature}F and feels like ${feelslike}F.`
      );
    }
  });
};

module.exports = forecast;
