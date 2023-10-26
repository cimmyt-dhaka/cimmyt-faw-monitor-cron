const {
  msgRainHigh,
  msgTempAbove15,
  msgTempBelow15,
  msgTempBelow10
} = require("../assets/forecast-messages.json");

module.exports = usersArray => usersArray.map(
  user => {
    const
      { precMax, t2Min } = user,
      msg = precMax > 25 ? msgRainHigh
        : t2Min < 10 ? msgTempBelow10
        : t2Min < 15 ? msgTempBelow15
        : t2Min >= 15 ? msgTempAbove15
        : "";

    return {
      ...user,
      msg: msg.replace("%div", user.adm2).replace("%upz", user.adm3)
    };
  }
);
