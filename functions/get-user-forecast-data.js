const
  { timeFormat } = require("d3-time-format"),
  
  { apiForecast } = require("../utils/api.js"),

  Traps = require("../models/Traps.js");

module.exports = () => new Promise((resolve, reject) => {
  require("../models/Users.js");
  require("../models/Areas.js");

  let users;

  Traps.find({ season: "6379b51a880c8d23b77c560b" }).populate("user area").then(traps => {

    users = traps
      .filter(trap => !!trap.area)
      .map(trap => ({
        name: trap.user._doc.name,
        phone: trap.user._doc.phone,
        gidUnion: trap.area.gid,
        gidUpazila: trap.area.gid.split("_").slice(0, -1).join("_"),
        adm1: trap.area.parentNames[0],
        adm2: trap.area.parentNames[1],
        adm3: trap.area.parentNames[2],
        adm4: trap.area.name,
        strID: trap.user._id.toString() + "_" + trap.area._id.toString()
      }))
      .filter((el, i, arr) => arr.map(user => user.strID).indexOf(el.strID) === i);

    const
      areasTraps = users
        .map(user => user.gidUnion)
        .filter((gid, i, arr) => arr.indexOf(gid) === i),
      usersTraps = users
        .map(user => user.phone)
        .filter((phone, i, arr) => arr.indexOf(phone) === i),
      today = timeFormat("%y%m%d")(new Date());

    console.log(`Number of users: ${ users.length }`);
    console.log(`Number of areas with registered traps: ${ areasTraps.length }`);
    console.log(`Number of users who registered traps: ${ usersTraps.length }`);

    return apiForecast.get("/faw-forecasts/upazila", { params: { date: today } });

  }).then(res => {

    resolve(users.map(user => {
      const
        { strID, ...userX } = user,
        { gidUpazila } = userX,
        { prec, t2 } = res.data.find(forecast => forecast.gid === gidUpazila);

      return {
        ...userX,
        precMax: prec.reduce((max, el) => el > max ? el : max, 0),
        t2Min: t2.reduce((min, el) => el < min ? el : min, 40)
      };
    }));

  }).catch(err => { reject(err); });
});
