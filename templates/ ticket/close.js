const db = require("quick.db");
const sourcebin = require('sourcebin_js');
const Discord = require("discord.js");
module.exports = {
  name: "close",
  aliases: [],
   execute: async(client, message, args, xd , botdata) => {
    
    var prefix =  db.fetch(`guildprefix_${message.guild.id}`);
    if(!prefix)
    {
      var prefix = ".";
    }

if(message.channel.name.includes('ticket-')) {
			const member = message.guild.members.cache.get(message.channel.name.split('ticket-').join(''));
			if(message.member.permissions.has('ADMINISTRATOR') || message.channel.name === `ticket-${message.author.id}`) {
				message.channel.messages.fetch().then(async (messages) => {
					

					let response;
				

					
					member.send('Your ticket is closed');
				}).then(() => {
					try {
						message.channel.permissionOverwrites.set(member.user, {
							VIEW_CHANNEL: false,
							SEND_MESSAGES: false,
							ATTACH_FILES: false,
							READ_MESSAGE_HISTORY: false,
						}).then(() => {
							message.channel.send(`Successfully closed ${message.channel}`);
						});
					}
					catch(e) {
						return message.channel.send('An error occurred, please try again!');
					}
				});
			}
		}
		else {
			return message.reply('you cannot use this command here. Please use this command when you\'re closing a ticket.');
		}

}
}
module.exports.help = {
    name: "close",
    description: "It will close the ticket ticket",
    usage: "close",
    type: "Ticket"  
}