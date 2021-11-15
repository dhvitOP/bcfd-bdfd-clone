const Discord = require("discord.js");
const superagent = require("snekfetch");

  module.exports = {
  name: "kiss",
  aliases: [],
  execute: async(client, message, args, data, db) => {
            const user = message.mentions.users.first();
            if(!user)
                return message.channel.send("Mention someone to kiss otheriwse i will kiss you")

		if (message.author === user) {
           return await message.channel.send("You cannot kis yourself")
		}
            superagent.get('https://nekos.life/api/v2/img/kiss')
                .end((err, response) => {
              const embed = new Discord.MessageEmbed()
              .setTitle(user.username + " Just got a kiss from " + message.author.username)
              .setImage(response.body.url)
              .setColor("RANDOM")
              .setDescription((user.toString() + " got a kiss from " + message.author.toString()))
              .setFooter(`this is so cute`)
              .setURL(response.body.url);
          message.channel.send({ embeds: [embed]});
            }).catch((err) => message.channel.send({embed: {
                color: 16734039,
                description: "Something went wrong... :cry:"
            }}));

        }
  }
module.exports.help = {
    name: "kiss",
    description: "Kiss a mentioned user",
    usage: "kiss <user>",
    type: "Fun" 
}