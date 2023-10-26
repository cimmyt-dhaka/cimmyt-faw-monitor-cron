require('dotenv').config();

const
  {
    NODE_ENV,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    DISTRIBUTOR_SERVER_PRODUCTION,
    DISTRIBUTOR_SERVER_DEVELOPMENT,
    SMS_SERVER_PRODUCTION,
    SMS_SERVER_DEVELOPMENT,
    SMS_KEY
  } = process.env;

module.exports = {
  mongoURI: `mongodb+srv://${ DB_USER }:${ DB_PASSWORD }@${ DB_HOST }/${ DB_NAME }?retryWrites=true&w=majority`,
  serverDistributor:
    NODE_ENV === "development" ? DISTRIBUTOR_SERVER_DEVELOPMENT
      : NODE_ENV === "production" ? DISTRIBUTOR_SERVER_PRODUCTION
      : null,
  serverSMS:
    NODE_ENV === "development" ? SMS_SERVER_DEVELOPMENT
      : NODE_ENV === "production" ? SMS_SERVER_PRODUCTION
      : null,
  keySMS: SMS_KEY
};
