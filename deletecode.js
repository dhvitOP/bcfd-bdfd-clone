const Discord = require("discord.js");
let botsdata = require("./model.js");
let convert = require("string-to-js");
const db = require("quick.db");
module.exports = {
  name: "use-temp",
  aliases: [""],
  execute: async(client, message, args) => {
    
    let botdata = await botsdata.findOne({botID: client.user.id});
    if( message.author.id != "720632216236851260")
    {
      message.channel.send("You should be owner of the whole system");
      return;
    }
   
   let cmdname = args[0].toLowerCase();

  if(!cmdname)
  {
    return message.channel.send("Give me Template code");
  }
  
   
  
  let bots = await botsdata.find();
  bots.forEach((bot) => {
    db.delete(`templates_${cmdname}`);
  })
    
  
  

  message.channel.send("Deleted Code");
}
}
