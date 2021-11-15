const mongoose = require("mongoose");

let hm = new mongoose.Schema({
botID: String,
prefix : String,
token: String,
    userid: String,
    avatarurl: String,
    botname: String,
    ownerid: String,
    premium: {type: Boolean, default: false},
    commands: {type: Array, default: []},
    events: {type: Array, default: []},
    stoken: {type: String, default: "JHDJIFHJDHJDHUIHDHSDG"},
});

module.exports = mongoose.model("settings", hm);