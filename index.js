let Discord = require("discord.js");
let { Intents } = require("discord.js");


const db = require("quick.db");


const { loadSlashCommands } = require("./handler/loadSlashCommands")

let globalbots = new Map();

const { SlashCommandBuilder } = require('@discordjs/builders');

async function remove(id)
{
await  globalbots.get(id).destroy();
}
      async function connect()
{
  const config = require("./config.js");
const mongoose = require("mongoose")

    await mongoose.connect(config.mongourl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        autoIndex: false
    }).then(() => {
    console.log("Mongoose successfully connected.");
    }).catch(err => console.log("Mongoose Error", err));
}
connect();
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception: " + err);


});

process.on("unhandledRejection", (reason, promise) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    promise,
    " reason: ",
    reason.message
  );


});
async function start() {
  let botsdata = require("./model.js");
  let bots = await botsdata.find();
  bots.forEach(async (bot) => {
    logins(bot.token, bot);
    })
    
}

async function logins(token, botdata) {
  let botsdata = require("./model.js");
 if(!botdata || !token)  { 
   
   await botsdata.deleteOne({botID: botdata.botID})
   return; 

 }
  const { get } = require('./cc_list_test/sqlite.js')
  let client; 
    try {
    client = new Discord.Client({ intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.DIRECT_MESSAGES,
               
            
			],
                              partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'], allowedMentions: {
				parse: ["users"]
			} });
  await client.login(token);
   
   
  } catch (error)
  {
    client = new Discord.Client({ intents: [
      Intents.FLAGS.GUILDS,
     
     	Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.DIRECT_MESSAGES,
             
          
    ],
                           });
await client.login(token);
console.log(error);
  }
  
  if(!client.user) return "no bot exist";
  if(!botdata)
  {
    botdata = await botsdata.findOne({botID: client.user.id});
  }
   //console.log(client.user.username)
   //console.log(bot.events);
  client.on("guildCreate", async(guild) => {
    let hm = db.fetch(`${botdata.stoken}_joinedguilds_${client.user.id}`);
   db.add(`${botdata.stoken}_joinedguilds_${client.user.id}`, 1);
   
  })
   client.guilds.cache.forEach(async(guild) => {
       await guild.members.fetch();
     })
   client.on("guildDelete", async(guild) => {
     let hm = db.fetch(`${botdata.stoken}_leftguilds_${client.user.id}`);
   db.add(`${botdata.stoken}_leftguilds_${client.user.id}`, 1);
     
     });
   globalbots.set(client.user.id, client);

  
   client.on("messageCreate", async(message) => {
       if(message.author.id === client.user.id) return;
    
       var msg =  db.fetch(botdata.stoken +  `DHVITOPXDIDKWHTLOL_events_message_${client.user.id}`);
           if(!msg) return;e
           
     eval(msg);
   })

  

     client.on("guildCreate", async(guild) => {
       var guildnew =   db.fetch( botdata.stoken + `DHVITOPXDIDKWHTLOL_events_guildcreate_${client.user.id}`);
           if(!guildnew) return;
       eval(guildnew);
     })
   
   
     client.on("guildDelete", async(guild) => {
      let guilddel = db.fetch( botdata.stoken + `DHVITOPXDIDKWHTLOL_events_guilddelete_${client.user.id}`);
           if(!guilddel) return;
       eval(guilddel);
     })
   
   
     client.on("ready", async () => {
      client.user.setPresence({ activities: [{ name: `${db.fetch(botdata.stoken + `status_${client.user.id}`) || "Made by BCFD"}`}] });
       


    
      var ready = db.fetch(botdata.stoken +  `DHVITOPXDIDKWHTLOL_events_ready_${client.user.id}`);
           if(!ready) return;
       eval(ready);
     })
   
   
     client.on("interactionCreate", async () => {
    var ready =  db.fetch( botdata.stoken + `DHVITOPXDIDKWHTLOL_events_interactioncreate_${client.user.id}`);
           if(!ready) return;
       eval(ready);
     })
   
       
     client.on("messageUpdate", async (message) => {
       var messageup =  db.fetch(botdata.stoken + `DHVITOPXDIDKWHTLOL_events_messageupdate_${client.user.id}`);
        if(!messageup) return;
       if(messageup.includes("message.channel.send"))
       {
          messageup.replace("message.channel.send", "");
          let owner = client.users.cache.get(botdata.ownerid);
         return owner.send("You cannot use message.channel.send in other events except message or messageCreate event");
       }
       eval(messageup);
     })
   
    
     client.on("messageDelete", async (message) => {
       var messagedel =  db.fetch( botdata.stoken + `DHVITOPXDIDKWHTLOL_events_messagedelete_${client.user.id}`);
           if(!messagedel) return;
       if(messagedel.includes("message.channel.send"))
       {
          messagedel.replace("message.channel.send", "");
          let owner = client.users.cache.get(botdata.ownerid);
         return owner.send("You cannot use message.channel.send in other events except message or messageCreate event");
       }

      
       eval(messagedel);
     })
   
 

 
   commands(client, botdata);
  
   


  //     const xdbreh = require("discord-easy-music");

// We now have a reactionRoleManager property to access the manager everywhere!
client.config = {}
 
client.setMaxListeners(0);




   client.on("message", async(message) => {
     var prefix = ".";
    if(message.guild) {
     
        let tp = db.fetch(botdata.stoken + `prefix_${client.user.id}_${message.guild.id}`);
        if(!tp)
        {
          prefix = db.fetch(botdata.stoken + `prefix_${client.user.id}`);
        } 
        if(!prefix && !tp)
        {
          prefix = ".";
        }
     
     } else {
       prefix = ".";
     } 
     
         const args = message.content.slice(prefix.length).trim().split(/ +/g);
          const cmd = args.shift().toLowerCase();
         

        
   let hek;
          findcommand( cmd, message, args, client, botdata).then((hekxd) => {
            hek = hekxd;
          })
          if(hek === "false")
          {
            return;
          }
          
  
            
          
          
   
  
          
        
        
   })
   interactions(client, botdata);
   client.slash = new Discord.Collection();
   client.slashxd = [];
    
   loadSlashCommands(client);
   
  return client;
}
start();

async function findcommand(cmd, message, args, client, botdata) {
    
               var getxd = db.fetch(`DHVITOPXDIDKWHTLOL_CMDXDBREH_${cmd}_${client.user.id}`);
               
               
              // console.log(getxd);
              if(!getxd) return;
           
           
              
               
              if(getxd.includes("./") || getxd.includes("process") || getxd.includes("proccess") || getxd.includes("../") || getxd.includes("child_process")  || getxd.includes("node") || getxd.includes("npm") || getxd.includes("db.fetch(`templates") || getxd.includes("templates") || getxd.includes("events")  || getxd.includes("CMDXDBREH") || getxd.includes("eval") || getxd.includes("botsdata") || getxd.includes("mongoose")|| getxd.includes("findOne")|| getxd.includes("deleteOne")|| getxd.includes("updateOne")|| getxd.includes("model.js")|| getxd.includes("template") || getxd.includes("USXDBREH") || getxd.includes("prefix_")|| getxd.includes("db.fetch(`prefix")|| getxd.includes("mainprefix")|| getxd.includes("db.fetch(`prefix") || getxd.includes("console.log") || getxd.includes("findcommand(") || getxd.includes("start()") || getxd.includes("remove()") || getxd.includes("logins()") || getxd.includes("login")|| getxd.includes("logins()") || getxd.includes("globalbots")) 
              {
                
                return message.channel.send("We encountered an suspicious activity in this command, please contact owner of this bot about this.")
              }
              try {
                if(message.commandName)
                {
                  var getxd = getxd.replace("message.channel.send", "message.reply")
                }
                
                   eval(getxd); 
                 
              } catch(error)
              {
                message.channel.send("Unexpected Error Occured, if you are owner of this bot error is - "+ error);
                console.log(error);
              }
              
}

async function commands (client, data){
  
let fs = require("fs");
   client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

}
async function interactions(client, botdata)
{
  client.on("interactionCreate", async(interaction) => {
     const args = [];
        if(!interaction.isSelectMenu())
        {
        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                })
            } else if (option.value) args.push(option.value);
        }
        
          findcommand(interaction.commandName, interaction, args, client, botdata)
        }
        
       
    
  })

   
}
require("./dashboard/server.js")(globalbots, logins);

function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 
module.exports = {
  globalbots: globalbots,
  logins: logins,
  remove: remove
}
