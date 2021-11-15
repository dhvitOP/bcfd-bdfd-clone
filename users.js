const mongoose = require("mongoose");
const { Client } = require("discord.js");
let hm = new mongoose.Schema({
user: String,
votes: {type: Number, default: 0},
});

module.exports = mongoose.model("users", hm);