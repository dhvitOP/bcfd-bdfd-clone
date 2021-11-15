const Discord = require("discord.js");

module.exports = {
  name: "invite",
  description: "Get the bot's",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed()
      .setTitle("Invite Me")
      .setColor("RANDOM")
      .setDescription(
        `**Get ${client.user.username}'s Invite Link [Here](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=1584921983&scope=bot)**\n**`
      )
      .setFooter(`Requested By: ${message.author.username}`);
    message.channel.send({ embeds: [embed] });
  },
};
