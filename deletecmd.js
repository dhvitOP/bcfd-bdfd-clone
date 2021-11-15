const Discord = require("discord.js");
let botsdata = require("./model.js");
let convert = require("string-to-js");
const db = require("quick.db");
module.exports = {
  name: "createcmd",
  aliases: [],
  execute: async(client, message, args) => {
    
    let botdata = await botsdata.findOne({botID: client.user.id});
    if(botdata && botdata.ownerid != message.author.id)
    {
      message.channel.send("You should be owner of this bot");
      return;
    }
   
   let cmdname = args[0];
 
  
   

   let chek =  db.fetch( `DHVITOPXDIDKWHTLOL_CMDXDBREH_${cmdname}_${client.user.id}`);
   if(!chek)
   {
     return message.channel.send("Command doesnt exist");
   }
  db.delete( `DHVITOPXDIDKWHTLOL_CMDXDBREH_${cmdname}_${client.user.id}`);
    
  
let cmdsto = botdata.commands;
   cmdsto.shift(`${cmdname}`);
    await botsdata.findOneAndUpdate({botID: client.user.id},{$set: {commands: cmdsto}})
   // db.delete()
  message.channel.send("Command deleted");
}
}
