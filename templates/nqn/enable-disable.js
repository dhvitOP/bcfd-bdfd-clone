const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "nitro-emojis",
  aliases: ["nitro-emoji", "emoji-nitro", "emojis-nitro"],
  execute: async(client, message, args) => {

   if(!message.member.permissions.has('ADMINISTRATOR')) return;
   let checking = db.fetch(`nitroemoji_${message.guild.id}_${client.user.id}`) 
   if(checking === true) {
          var aembed = new Discord.MessageEmbed()
   .setDescription("<a:testing:841362113212842045> **Successfull** <a:testing:841362113212842045>")
   .addField("Now Nitro Emojis:", "Disabled")
   message.channel.send({ embeds: [aembed]});
   db.set(`nitroemoji_${message.guild.id}_${client.user.id}`, false)
   } else {
       db.set(`nitroemoji_${message.guild.id}_${client.user.id}`, true)
           var aembed = new Discord.MessageEmbed()
   .setDescription("<a:testing:841362113212842045> **Successfull** <a:testing:841362113212842045>")
   .addField("Now Nitro Emojis:", "Enabled")
   message.channel.send({ embeds: [aembed]});
   }

  }
}