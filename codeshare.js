const mongoose = require("mongoose");

let hm = new mongoose.Schema({
command: String,
owner: String,
ownerimg: String,
ownername: String,
cmdtype: String,
cmdcode: String,
cmdimg: String,
likes: {type: Number, default: 0},
dislikes: {type: Number, default: 0},
Date: Date
});

module.exports = mongoose.model("commands", hm);