  const Discord = require("discord.js");
const db = require("quick.db")
module.exports = {
  name: "sendembed",
  aliases: [],
  execute: async(client, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
    {
      return;
    }
    if (args[1] <= 0)
        return message.reply(`${emoji.Error} Oh come on man say something so I can I provide it in embed format !!`)
        .then(message => {
            message.delete({ timeout: 10000 })
        });
        message.delete();
         const taggedChannel = await message.mentions.channels.first();
         var prefix2 = db.fetch(`guildprefix_${message.guild.id}_${client.user.id}`);
         if(!prefix2)
         {
           var prefix2 = ".";
         }
let colour1 = db.fetch(`embed_${message.guild.id}_${client.user.id}`);
        if(taggedChannel) {
           const embed1 = new Discord.MessageEmbed()
           .setDescription(args.join(" ").replace(taggedChannel, ""))
           .setColor(`${colour1}`)
            await taggedChannel.send({ embeds: [embed1]});
             message.channel.send(`btw you can change the embed color by ${prefix2}embed <any_color> like RED BLUE AND ETC`) .then(message => {
            message.delete({ timeout: 10000 })
 });
        }
        if(!taggedChannel)
        {
        var prefix1 = db.fetch(`guildprefix_${message.guild.id}_${client.user.id}`);
      let colour = db.fetch(`embed_${message.guild.id}_${client.user.id}`);
        const embed = new Discord.MessageEmbed()
        .setDescription(args.join(" "))
        .setColor(`${colour}`)
        message.channel.send({embeds: [embed]});
        message.channel.send(`btw you can change the embed color by ${prefix1}embed <any_color> like RED BLUE AND ETC`) .then(message => {
            message.delete({ timeout: 10000 })
 });
        }
    }
}
    module.exports.help = {
    name: "sendembed",
    description: "It sends embed to the channel you typed command and the embed text will be whatever you want!",
    usage: "sendembed <text>",
    type: "Moderation"
}