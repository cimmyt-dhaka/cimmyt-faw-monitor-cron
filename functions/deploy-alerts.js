const
  { apiSMS: api } = require("../utils/api.js"),
  { keySMS: apikey } = require("../config/keys.js");

module.exports = arr => Promise.all(
  arr
    .filter((el, i) => i >= 2)
    .map(el => api.post(
      "/send",
      { to: el.phone, body: el.msg, unicode: true },
      { params: { apikey } }
    ))
);
