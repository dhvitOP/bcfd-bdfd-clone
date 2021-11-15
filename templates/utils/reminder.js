const { Client, Message, MessageEmbed } = require('discord.js');
require('discord-reply')
const ms = require("ms")
module.exports = {
    name: 'reminder',
  aliases: ["remindme", "remind"],
    execute: async(client, message, args) => {
        let time = args[0]
        if(!time) {
          var embed = new MessageEmbed()
   
        .setDescription(" **Wrong Usage**  \n What is the time when the reminder should be off? ")
        .setColor("RANDOM")
        return message.channel.send({embeds: [embed]});
        }
        if(ms(time) > ms("1w")){

         var embed = new MessageEmbed()
           
         .setDescription(` **Wrong Usage**  \n ${message.author.tag} You cannot set your reminder for more than 1w`)
          .setColor("RANDOM")
         return message.channel.send({embeds: [embed]});
        }
        let alert = args.slice(1).join(" ")
        if(!alert) {
          var embed = new MessageEmbed()
            
         .setDescription(` **Wrong Usage**  \n What is reminder for?`)
          .setColor("RANDOM")
         return message.channel.send({embeds: [embed]});
          
        }
       var embed = new MessageEmbed()
         .setDescription(`**Successfull** `)   
        .setColor("RANDOM")
        .addField(`Time:`, `\`${time}\``, true)
        .addField(`For:`, `\`${alert}\``, true)
       message.channel.send({embeds: [embed]});
        setTimeout(() => {
            let DP = new MessageEmbed()
            .setAuthor(`Your reminder is Done`)
            .setColor("RANDOM")
            .addField("Duration", `\`${time}\``, true)
            .addField(`Reason:`, `\`${alert}\``, true)
           message.author.send({embeds: [DP]});
        }, ms(time))
    }
}