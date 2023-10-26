const
  axios = require("axios"),
  { serverDistributor, serverSMS } = require("../config/keys.js"),

  apiForecast = axios.create({
    baseURL: `${ serverDistributor }/api`,
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  apiSMS = axios.create({
    baseURL: `${ serverSMS }/sms`,
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  apiServer = axios.create({
    baseURL: "https://cimmyt-faw-monitor-server.onrender.com/api",
    headers: {
      'Content-Type': 'application/json'
    }
  });

module.exports = { apiForecast, apiSMS, apiServer };
