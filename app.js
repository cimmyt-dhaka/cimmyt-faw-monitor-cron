const
  { connect, disconnect, set } = require("mongoose"),

  { mongoURI } = require("./config/keys.js"),
  
  getUserForecastData = require("./functions/get-user-forecast-data.js"),
  generateForecastMessage = require("./functions/generate-forecast-message.js"),
  deployAlerts = require("./functions/deploy-alerts.js"),

  appInit = async () => {
    try {

      set("strictQuery", false);

      await connect(mongoURI);
      console.log('Successfully connected to MongoDB');

      const
        userwiseForecasts = await getUserForecastData(),
        userwiseForecastsMsg = generateForecastMessage(userwiseForecasts);

      console.table(userwiseForecastsMsg);

      const deployed = await deployAlerts(userwiseForecastsMsg);
      console.log(deployed.map(el => el.data));

    } catch (error) {

      console.error(error);

    } finally {

      disconnect()
        .then(() => { console.log('Successfully disconnected from MongoDB'); })
        .catch(err => { console.log(err); });

    }
  };

appInit();
