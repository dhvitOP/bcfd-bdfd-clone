const Discord = require("discord.js");
let botsdata = require("./model.js");
let convert = require("string-to-js");

let main = require("./index.js");
const {readdirSync} = require('fs');


const db  = require("quick.db")
module.exports = {
  name: "cmds",
  aliases: ["use-template"],
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
    let cmds = botdata.commands
    if( !cmds || !cmds[0])
    {
      return message.channel.send("No Commands Found or If you are using an template use that template name for finding its commands\n If you want to see a command code/data type .commands show command-name");
    }
   
    
    //console.log(cmds);
  //  await botsdata.findOneAndUpdate({botID: client.user.id},{$set: {commands: []}});
 //   return;
   let embed = new Discord.MessageEmbed().setTitle("Commands that you made").setDescription(`${cmds.map(a => ". `" + a + "`")}`)

    message.channel.send({embeds: [embed]});

    return;
  }
   if(cmdname === "show" && args[1])
    {
      let data =  db.fetch(botdata.stoken, `CMDXDBREH_${args[1]}_${client.user.id}`);
      if(!data)
      {
        return message.channel.send("Give me a valid Command name to show its data stored");
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
      return message.channel.send("```js\n" +data+"```");
    } else if(cmdname === "show" && !args[1])
    {
      return message.channel.send("You have to give me command name to show its data");
    }
  cmdname = cmdname.toLowerCase();
   

   let chek = db.fetch(botdata.stoken, `templates_${cmdname}`);
    
   if(!chek)
   {
     return message.channel.send("No template exist with that code");
   }
   let templates = [];
   let embed = new Discord.MessageEmbed().setTitle(`${cmdname} Commands`);
     readdirSync('./templates/').forEach(async(dir) => {
        //dir = [];
        if(dir === cmdname)
        {
                  
         let chek = await db.fetch(`template_${client.user.id}`)
         if(!chek) return;
        const commands = readdirSync(`./templates/${chek}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`./templates/${chek}/${file}`);
           
            if(pull.name){
            templates.push(" `" + pull.name + "` ");
               
            } else {
               
                continue;
            }
        }
        }
    });
    //   console.log(templates);
    
    embed.setDescription(`**Commands** -\n ${templates || "No Commands Found with your Template"}`)
  
 
    message.channel.send({embeds: [embed]});
  //db.set(`template_${client.user.id}`, cmdname);
   
 /* message.channel.send("Template is now online").then(async() => {
    let xd = main.globalbots;
    xd.remove(client.user.id);
    await client.destroy();
      await main.logins(botdata.token);
  }) */
}
}
