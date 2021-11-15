const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "anti-badwords",
  aliases: ["antibadwords", "antiwords"],
  execute: async(client, message, args) => {
   if(!message.member.permissions.has('ADMINISTRATOR')) return;
        if(!message.guild.me.permissions.has('MANAGE_MESSAGES')) {return message.channel.send('I do not have permission to delete messages.')
        }
        if(await db.has(`swear-${message.guild.id}_${client.user.id}`) === false) {
            await db.set(`swear-${message.guild.id}_${client.user.id}`, true)
            message.channel.send('AntiBadwords has been turned on!')

        } else {
          await db.delete(`swear-${message.guild.id}_${client.user.id}`)
           return message.channel.send('AntiBadwords has been turned off!')
        }
  }
}