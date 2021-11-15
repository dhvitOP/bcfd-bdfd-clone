const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  name: "botinfo",
  description: "Shows the bot info",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    const duration = moment
      .duration(client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");

    let embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username + "'s Info", client.user.avatarURL())
      .setColor("RANDOM")
      .setDescription(
        `**Bot Name: **${client.user.username} \n**Source Code By: **๖ۣۜℜⱥjͥƤuͣtͫ#5915 \n**Total Categories: **8 \n**Total Commands: **141 \n**Users:** ${
          client.users.cache.size
        } \n**Servers:** ${client.guilds.cache.size} \n**Channels:** ${
          client.channels.cache.size
        } \n**Uptime and Ping: **${duration} / ${Math.round(
          client.ws.ping
        )}ms \n**State: **Under Development \n**Online Status: **Up 24/7 (Except during Maintenance)`
      )
     
      .setFooter("Regards, Infinity Bot Team and Star Studios");
    message.channel.send({ embeds: [embed] });
  },
};
