const Discord = module.require("discord.js");

module.exports = {
   name: "lock",
   execute: async(client, message, args) => {
   if (!message.member.permissions.has('MANAGE_SERVER', 'MANAGE_CHANNELS')) {
   return message.channel.send("You don't have enough Permissions")
   }
   message.channel.permissionOverwrites.set([
     {
          id: ctx.guild.roles.everyone.id,
        type: 'role',
        deny: ['SEND_MESSAGES'],
     },
    ],);
   const embed = new Discord.MessageEmbed()
   .setTitle("Channel Updates")
   .setDescription(`🔒 ${message.channel} has been Locked`)
   .setColor("RANDOM");
   await message.channel.send(embed);
   message.delete();
}
}
  module.exports.help = {
    name: "lock",
    description: "It Locks the current channel",
    usage: "lock",
	type: "Moderation"
}
