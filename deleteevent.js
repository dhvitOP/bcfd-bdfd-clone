const Discord = require("discord.js");
let botsdata = require("./model.js");
let convert = require("string-to-js");
const db = require("quick.db");
module.exports = {
  name: "createevent",
  aliases: [],
  execute: async(client, message, args) => {
    
    let botdata = await botsdata.findOne({botID: client.user.id});
    if(botdata && botdata.ownerid != message.author.id)
    {
      message.channel.send("You should be owner of this bot");
      return;
    }
   
   let cmdname = args[0].toLowerCase();
 
  let getxd = message.content;
      if(getxd.includes("./") || getxd.includes("process") || getxd.includes("child") || getxd.includes("node") || getxd.includes("npm") || getxd.includes("db.fetch(`templates") || getxd.includes("templates") || getxd.includes("events")  || getxd.includes("CMDXDBREH") || getxd.includes("eval") || getxd.includes("botsdata") || getxd.includes("mongoose")|| getxd.includes("findOne")|| getxd.includes("deleteOne")|| getxd.includes("updateOne")|| getxd.includes("model.js")|| getxd.includes("template") || getxd.includes("USXDBREH"))
              {
                return message.channel.send("We encountered an suspicious activity in this command, please contact owner of this bot about this.")
              }
   let xd =  db.fetch( `DHVITOPXDIDKWHTLOL_events_${cmdname}_${client.user.id}`);
   if(!xd)
   {
     return message.channel.send(`Event Doesnt exist`);
   }
   db.delete( `DHVITOPXDIDKWHTLOL_events_${cmdname}_${client.user.id}`);
    
   
  

  message.channel.send("Event Deleted");
}
}
