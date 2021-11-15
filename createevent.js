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
   
   let cmdname = args[0];
   if(!cmdname)
   {
     return message.channel.send("Give me an event name");
   }
   cmdname = args[0].toLowerCase();
 //  let tplel = args[0];
  var data = args.join(" ").replace(cmdname, "");
  if(!data)
  {
    return message.channel.send("Give me Event name and its data");
  }
  let getxd = message.content;
   if(getxd.includes("./") || getxd.includes("process") || getxd.includes("proccess") || getxd.includes("../") || getxd.includes("child_process")  || getxd.includes("node") || getxd.includes("npm") || getxd.includes("db.fetch(`templates") || getxd.includes("templates") || getxd.includes("events")  || getxd.includes("CMDXDBREH") || getxd.includes("eval") || getxd.includes("botsdata") || getxd.includes("mongoose")|| getxd.includes("findOne")|| getxd.includes("deleteOne")|| getxd.includes("updateOne")|| getxd.includes("model.js")|| getxd.includes("template") || getxd.includes("USXDBREH") || getxd.includes("prefix_")|| getxd.includes("db.fetch(`prefix")|| getxd.includes("mainprefix")|| getxd.includes("db.fetch(`prefix") || getxd.includes("console.log") || getxd.includes("findcommand(") || getxd.includes("start()") || getxd.includes("remove()") || getxd.includes("logins()") || getxd.includes("login") || getxd.includes("globalbots"))
              {
                return message.channel.send("We encountered an suspicious activity in this command, please contact owner of this bot about this.")
              }
  
  if(data.includes("quick.db"))
  {
     data = data.replace("db.fetch(", " db.fetch(botdata.stoken +");
    data = data.replace("db.set(", " db.set(botdata.stoken +");
    data = data.replace("db.delete(", " db.fetch(botdata.stoken +");
    data = data.replace("db.add(", " db.add(botdata.stoken +");
    data = data.replace("db.subtract(", " db.subtract(botdata.stoken +");
    data = data.replace("db.push(", "db.push(botdata.stoken +");
    
  }
   if(cmdname === "messagecreate")
   {
      await db.set(botdata.stoken + `DHVITOPXDIDKWHTLOL_events_message_${client.user.id}`, data);
   } else {
     await db.set(botdata.stoken + `DHVITOPXDIDKWHTLOL_events_${cmdname}_${client.user.id}`, `${data}`);
   }
     
  

   
  

  message.channel.send("Event created");
}
}
