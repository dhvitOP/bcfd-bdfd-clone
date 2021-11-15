const Discord = require("discord.js");
let botsdata = require("./model.js");
let convert = require("string-to-js");
const db = require("quick.db");
const { SlashCommandBuilder } = require('@discordjs/builders');
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
  var data = args.join(" ").replace(cmdname, "");
  if(!data)
  {
    return message.channel.send("Give me Command name and its data");
  }
  if(cmdname.includes("create-cmd") || cmdname.includes("create-bot") || cmdname.includes("create-code") || cmdname.includes("create-event") || cmdname.includes("delete-event") || cmdname.includes("delete-cmd") || cmdname.includes("delete-event") || cmdname.includes("use-template") || cmdname.includes("delete-code") || cmdname.includes("commands"))
  {
    return message.channel.send("You cannot use Defualt Commands");
  }
  
  if(data.includes("db"))
  {
    data = data.replace("db.fetch(", " db.fetch(botdata.stoken +");
    data = data.replace("db.set(", " db.set(botdata.stoken +");
    data = data.replace("db.delete(", " db.fetch(botdata.stoken +");
    data = data.replace("db.add(", " db.add(botdata.stoken +");
    data = data.replace("db.subtract(", " db.subtract(botdata.stoken +");
    data = data.replace("db.push(", "db.push(botdata.stoken +");
    
    
  }
  
  var data = new SlashCommandBuilder()

  .setName(cmdname)

.setDescription("Custom Commands")
var xd = []
xd.push(data)
await client.application.commands.set(xd);
    db.set(`DHVITOPXDIDKWHTLOL_CMDXDBREH_${cmdname}_${client.user.id}`, `${data}`);
   let cmdsto = botdata.commands;
   cmdsto.push(`${cmdname}`);
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: client.user.id},{$set: {commands: cmdsto}})
   //db.push(`CMDXDBREH_${client.user.id}`, `${cmdname}`);
  

  message.channel.send("Command created");
}
}
