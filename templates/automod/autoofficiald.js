const db = require("quick.db");
const Discord = require("discord.js");
module.exports = {
  name: "auto-official-role-disable",
  aliases: ["auto-official-disable", "auto-name-role-disable","anr-disable", "af-disable", "autoofficial-disable"],
  execute: async(client, message, args) => {
    if (message.member.permissions.has("MANAGE_SERVER")) {
db.delete(`tagg_${message.guild.id}_${client.user.id}`);
db.delete(`tagn_${message.guild.id}_${client.user.id}`);
return message.reply("Done Deleted Official role and tag from my database");
  }
  }
}