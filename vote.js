const mongoose = require("mongoose");
const { Client } = require("discord.js");
let hm = new mongoose.Schema({
user: String,
voter: String,
date: Date,

});

module.exports = mongoose.model("votes", hm);