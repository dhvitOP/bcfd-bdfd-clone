const Discord = require("discord.js");
let botsdata = require("./model.js");
let {   loadSlashCommands } = require("./handler/loadSlashCommands.js");
//let { globalbots } = require("./index.js");
let main = require("./index.js");
module.exports = {
  name: "createbot",
  aliases: [],
  execute: async(client, message, args) => {
     if(message.guild)
    {
      message.channel.send("You must execute this command from dms of this bot");
      return;

    }
    let botdata = await botsdata.findOne({botID: client.user.id});
    if(!botdata)
    {
      message.channel.send("Bot already exist");
      return;
    }
   
   
  
 message.channel.send("Your bot is deleted").then(async() => {
 await botsdata.deleteOne({botID: client.user.id})

    await client.destroy();
   
 })
    
   
            
  
 
}
}
