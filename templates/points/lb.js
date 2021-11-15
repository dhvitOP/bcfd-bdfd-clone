const db = require("quick.db");
const usersdata = require("../../users.js");
const Discord = require("discord.js");
   module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  execute: async(client, message, args, xd , botdata) => {
let users = await usersdata.find();
let embed = new Discord.MessageEmbed();
let datas = users.sort((a, b) => b.votes - a.votes).slice(0, 6);
var toset = [];
message.channel.send("Gathering full Database and sorting it out...").then(async(msg) => {
embed.setTitle("LeaderBoard of staff points");
datas.forEach(async(user) => {
  let chekxd = db.fetch(`countingsxd_${message.author.id}_${message.guild.id}`) || 0;
  if(user.user && user.votes)
  {
  toset.push(`**${chekxd}**, <@${user.user}> having **${user.votes}** Votes\n`);
  db.add(`countingsxd_${message.author.id}_${message.guild.id}`, 1);
  }
})
db.delete(`countingsxd_${message.author.id}_${message.guild.id}`)
;// console.log(users);
embed.setDescription(`${toset.join(" ")}`)
        msg.edit( {embeds: [embed]});
})
  }
   }