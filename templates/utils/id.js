const Discord = require("discord.js");

module.exports = {
  name: "id",
  aliases: ["userid"],
  execute: async(client, message, args, data, db) => {
   var mention = message.mentions.users.first();
    if(!mention) return message.channel.send("Give me a Valid Mention")
    const lolid = new Discord.MessageEmbed()
    .setThumbnail(mention.user.avatarURL)
    .setColor("RANDOM")
    .addField('Here is ' + `${mention.user.username}\'s ID`, mention.user.id)
    message.channel.send({ embeds: [lolid]})  
}
}
module.exports.help = {
    name: "id",
    description: "Display a user ID",
    usage: "id",
    type: "Utility"  
}