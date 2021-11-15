const Discord = require("discord.js");
let botsdata = require("./model.js");
let convert = require("string-to-js");
const db = require("quick.db");
let main = require("./index.js");
module.exports = {
  name: "use-temp",
  aliases: ["use-template"],
  execute: async(client, message, args) => {
    
    let botdata = await botsdata.findOne({botID: client.user.id});
    if(botdata && botdata.ownerid != message.author.id)
    {
      message.channel.send("You should be owner of this bot");
      return;
    }
   if(!args[0])
   {
     return message.channel.send("No type Given like use or remove");
   }
   if(!args[1])
   {
     return message.channel.send("Give me a template code");
   }
   let cmdname = args[1].toLowerCase();

  if(!cmdname)
  {
    return message.channel.send("Give me Template code");
  }
  
   

   let chek = db.fetch(`templates_${cmdname}`);
    let xd = db.fetch(`template_${client.user.id}`);
   
   if(!chek)
   {
     return message.channel.send("No template exist with that code");
   }
   if(args[0] === "use")
   {
  db.set(`template_${client.user.id}`, cmdname);
   
  message.channel.send("Template is now online").then(async() => {
     main.remove(client.user.id);
    
      await main.logins(botdata.token, message.author.id);
  })
   } else if(args[0] === "remove"){
      if(xd != cmdname)
    {
      return message.channel.send("You are not using this template");
    }
       db.delete(`template_${client.user.id}`);
        message.channel.send("Template is now offline").then(async() => {
   main.remove(client.user.id);
  
      await main.logins(botdata.token, message.author.id);
  })
   } else {
     return message.channel.send("Give me valid use or remove type");
   }
}
}
