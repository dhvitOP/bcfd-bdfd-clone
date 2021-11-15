    module.exports = {
  name: "unlock",
  aliases: [],
  execute: async(client, message, args, data, db) => {
   
  
 if (!message.member.hasPermission("MANAGE_CHANNELS"))
     {
      return;
    }
  let channel = message.channel;

   const vc1 = args.join(" ");
message.channel.permissionOverwrites.set([
  {
     id: message.guild.roles.everyone.id,
     type: "role",
     allow: ['SEND_MESSAGES'],
  },
], `${message.member.id} Told to unlock the server`);
        message.channel.send("This Channel has been unlocked enjoy.")
  }
    }
  module.exports.help = {
    name: "unlock",
    description: "It unLocks the current channel",
    usage: "unlock",
	type: "Moderation"
}