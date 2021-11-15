let Discord = require("discord.js");
let { Intents } = require("discord.js");


const db = require("quick.db");


const { loadSlashCommands } = require("./handler/loadSlashCommands")
const { DiscordTogether } = require('discord-together')
let globalbots = new Map();

const { SlashCommandBuilder } = require('@discordjs/builders');

async function remove(id)
{
await  globalbots.get(id).destroy();
}
      async function connect()
{
const mongoose = require("mongoose")

    await mongoose.connect("mongodb+srv://bot-list-lol:SzRpE6eXNegtLRvs@cluster0.jme3y.mongodb.net/nothingxdlol?retryWrites=true&w=majority", {
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
require("./dashboard/server.js")(globalbots);
async function logins(token, botdata) {
  let botsdata = require("./model.js");
  
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
      Intents.FLAGS.GUILD_MEMBERS,
     
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.DIRECT_MESSAGES,
             
          
    ],
                            partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'], allowedMentions: {
      parse: ["users"]
    } });
await client.login(token);
console.log(error);
  }
  if(!client.user) return;
   //console.log(client.user.username)
   //console.log(bot.events);
  client.on("guildCreate", async(guild) => {
   db.add(`${botdata.stoken}_joinedguilds_${client.user.id}`, 1);
   
  })
   client.guilds.cache.forEach(async(guild) => {
       await guild.members.fetch();
     })
   client.on("guildDelete", async(guild) => {
   db.add(`${botdata.stoken}_leftguilds_${client.user.id}`, 1);
  })
   globalbots.set(client.user.id, client);

  
   client.on("messageCreate", async(message) => {
       if(message.author.id === client.user.id) return;
    
       var msg =  db.fetch(botdata.stoken +  `DHVITOPXDIDKWHTLOL_events_message_${client.user.id}`);
           if(!msg) return;
           
     eval(msg);
   })
   

  

     client.on("guildCreate", async(guild) => {
       var guildnew =   db.fetch( botdata.stoken + `DHVITOPXDIDKWHTLOL_events_guildcreate_${client.user.id}`);
           if(!guildnew) return;
       eval(guildnew);
     })
   
   
     client.on("guildDelete", async(guild) => {
      let  guilddel = db.fetch( botdata.stoken + `DHVITOPXDIDKWHTLOL_events_guilddelete_${client.user.id}`);
           if(!guiddel) return;
       eval(guilddel);
     })
   
   
     client.on("ready", async () => {
        await client.user.setPresence({ activities: [{ name: `${db.fetch(botdata.stoken + `status_${client.user.id}`) || "Made by BCFD"}`}] });
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
   
 let bottp =  db.fetch( `template_${client.user.id}`);
 if(bottp === "reaper")
 {
 client.on("guildMemberAdd", async (member) => {
let autor =   db.fetch( `DHVITOPXDIDKWHTLOL_autorole_${member.guild.id}_${client.user.id}`);
if(!autor)
{
  return;
}
var role = member.guild.roles.cache.get(`${autor}`);
member.roles.add(role);



});
 

client.on("guildMemberAdd", async (member) => {
   
        
            if(  db.has( `DHVITOPXDIDKWHTLOL_tagg_${member.guild.id}_${client.user.id}`) && db.has(`tagn_${member.guild.id}_${client.user.id}`)) 
        {
          let name =  db.fetch( `DHVITOPXDIDKWHTLOL_tagn_${member.guild.id}_${client.user.id}`);
          let hash =   db.fetch( `DHVITOPXDIDKWHTLOL_tagg_${member.guild.id}_${client.user.id}`);
            if(member.user.username.includes(name))
   {
    member.roles.add(hash);
   }
        }
})
client.on("guildMemberAdd", async(member) => {
  let autor =  db.fetch( `DHVITOPXDIDKWHTLOL_autorole_${member.guild.id}_${client.user.id}`);
if(!autor)
{
  return;
}
var role = member.guild.roles.cache.get(`${autor}`);
member.roles.add(role);



});

client.discordTogether = new DiscordTogether(client);
 
client.on("userUpdate", async(oldUser, newUser, member) => {
  let oldMember = oldUser;
  let newMember = newUser;
   if (oldMember.username !== newMember.username) {
   if (oldMember.username === null) {
    var oldNM = "``???? ??????``";
   } else {
    var oldNM = oldMember.username;
   }
   if (newMember.username === null) {
    var newNM = "``???? ??????``";
   } else {
    var newNM = newMember.username;
   }

   client.guilds.cache.forEach(guild => {
           
      
        if(guild.members.cache.get(newUser.id))
        {
            if( db.has( `DHVITOPXDIDKWHTLOL_tagg_${guild.id}_${client.user.id}`) && db.has(`tagn_${guild.id}_${client.user.id}`)) 
        {
          let name =   db.fetch( `DHVITOPXDIDKWHTLOL_tagn_${guild.id}_${client.user.id}`);
          var hash =   db.fetch( `DHVITOPXDIDKWHTLOL_tagg_${guild.id}_${client.user.id}`);
            if(newUser.username.includes(name))
   {
     var hash = guild.roles.cache.get(hash);
     let member2 = guild.members.cache.get(newUser.id);
    member2.roles.add(hash);
     const log = guild.channels.cache.find(log => log.name === "logs")
  if(!log) return;
  if(log.type !== "text") return;
  const embed = new Discord.MessageEmbed()
   .setTitle("OFFICIAL ROLE ADDED")
   .setDescription(`Added Officials role to ${newUser.username}`)
   .addField(`Added Officials role to ${newUser.username} Bcz of autoofficial/anf command You can disable it by doing .autoofficial-disable/.anf-disable`)
  log.send({ embeds: [embed]});
   }
     else if(!newUser.username.includes(name))
   {
     var hash = guild.roles.cache.get(hash);
   
     let member2 = guild.members.cache.get(newUser.id);
     member2.roles.remove(hash);
   }
        }
    
        
              
          
 

   
        }
        
        
   });
 
  }
})
 }
   commands(client, botdata);
   client.on("message", async(message) => {
     const Timeout = new Map();

if(message.guild)
{


if(db.fetch( `template_${client.user.id}`) && db.get( `template_${client.user.id}`) === "nqn")
   {
  let checking =   db.fetch( `nitroemoji_${message.guild.id}_${client.user.id}`)

  if(checking == true) 
  { 
    var checking_user =  db.fetch( `added_${message.guild.id}_${message.author.id}_${client.user.id}`)
  
    if(checking_user === true)
    {
     
    let msg = message.content;
   
  let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g)
  if (!emojis) return;

    
     
    
     emojis.forEach(m => {
    let emoji = client.emojis.cache.find(x => x.name === m)
    if (!emoji) return;
    let temp = emoji.toString()
    if (new RegExp(temp, "g").test(msg)) msg = msg.replace(new RegExp(temp, "g"), emoji.toString())
    else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
  })

  if (msg === message.content) return;
              const timeout = 5000;
   const key = message.author.id;
   const found = Timeout.get(key);
   if(found) {
     if(message.author.id !== "720632216236851260")
    {
     
    
    const timePassed = Date.now() - found;
    const timeLeft = timeout - timePassed;
    return message.reply("Slow down theres a cooldown");
    } } else {
      
        Timeout.set(key, Date.now());
    setTimeout(() => {
     Timeout.delete(key);
    }, timeout);
    }
  let webhook = await message.channel.fetchWebhooks();
  let number = randomNumber(1, 2);
  webhook = webhook.find(x => x.name === "Dumb Bot Emojis" + number);

  if (!webhook) {
    webhook = await message.channel.createWebhook(`Dumb Bot Emojis` + number, {
      avatar: client.user.displayAvatarURL({ dynamic: true })
    });
  }

  await webhook.edit({
    name: message.member.nickname ? message.member.nickname : message.author.username,
    avatar: message.author.displayAvatarURL({ dynamic: true })
  })

  message.delete().catch(err => { })
  webhook.send(msg).catch(err => { })

  await webhook.edit({
    name: `Dumb Bot Emojis` + number,
    avatar: client.user.displayAvatarURL({ dynamic: true })
  })
    
  }
}
   }

}
   })
   


  //     const xdbreh = require("discord-easy-music");

// We now have a reactionRoleManager property to access the manager everywhere!
client.config = {}
 if(bottp === "reaper")
 {
client.config.imageapi = "81ec44aee6ccbb692dabd2eb0e1454b7f0c5ef1dd805a939a291127eb26b0f5af5bb4a94f095bceade9417c25292e746504e378f2d0f3aa2864c3d775c32e76a";
const alexClient = require("alexflipnote.js")
client.images = new alexClient("XsmJ6jzZpxVU5TzVa15egVX92QE_ctvyV9J8-I9D")
 }
client.setMaxListeners(0);
const Cookie = "";
const Embeds = require("./functions/embeds/Embeds")
const Logger = require("./functions/Logger/Logger")
const Util = require("./functions/util/Util")
client.logger = Logger;
client.utils = Util;
client.say = Embeds;


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
          
          let lo = db.fetch( `template_${client.user.id}`);
             if(lo)
   {
 if (message.content.indexOf(prefix) != 0) return;
      
      let command = client.commands.get(cmd)
      if(!command) command = client.commands.get(client.aliases.get(cmd));
       let botdata =  botsdata.findOne({botID:client.user.id});
       if(message.guild)
       {
       let data = await get(message, message.guild, botdata) 
       } else {
         data = "nothing";
       }
        if(command && command.execute) 
        {
        { command.execute(client, message, args, data, botdata); 
        return;
        }
        } 
        if(command && command.run)
        {
          command.run(client, message, args, data, botdata); 
        return;
        }
        

   }
            
          
          
   
  
          
        
        
   })
   interactions(client, botdata);
   client.slash = new Discord.Collection();
   client.slashxd = [];
    
   loadSlashCommands(client);
   
  
}
start();

async function findcommand(cmd, message, args, client, botdata) {
    if(cmd === "create-bot")
                 {
                   let cxd =  require("./createbot.js");
                   cxd.execute(client, message, args);
                   return "false";
                   
                 }
                 if(cmd === "create-cmd")
                 {
                   let cmdxd = require("./createcmd.js");
                    cmdxd.execute(client, message, args);
                   return "false";
                 }
                 if(cmd === "create-event")
                 {
                   let cmdxd = require("./createevent.js");
                    cmdxd.execute(client, message, args);
                   return "false";
                 }
                   if(cmd === "delete-code")
                 {
                   let cmdxd = require("./deletecode.js");
                    cmdxd.execute(client, message, args);
                   return "false";
                 }
                 if(cmd === "template")
                 {
                   let cmdxd = require("./usetemp.js");
                    cmdxd.execute(client, message, args);
                   return "false";
                 }
                  if(cmd === "create-code")
                 {
                   let cmdxd = require("./createcode.js");
                    cmdxd.execute(client, message, args);
                   return "false";
                 }
                  if(cmd === "delete-bot")
                 {
                   let cmdxd = require("./deletebot.js");
                    cmdxd.execute(client, message, args);
                   return "false";
                 }
                  if(cmd === "delete-cmd")
                 {
                   let cmdxd = require("./deletecmd.js");
                    cmdxd.execute(client, message, args);
                   return "false";
                 }
                  if(cmd === "delete-event")
                 {
                   let cmdxd = require("./deleteevent.js");
                    cmdxd.execute(client, message, args);
                   return "false";
                 }
                  if(cmd === "commands")
                 {
                   let cmdxd = require("./cmds.js");
                    cmdxd.execute(client, message, args);
                   return "false";
                 }
               var getxd = db.fetch(`DHVITOPXDIDKWHTLOL_CMDXDBREH_${cmd}_${client.user.id}`);
               
               if(!getxd && message.commandName)
               {
                    const command = client.slash.get(cmd);
                    message.member = message.guild.members.cache.get(message.user.id);
       
         
        if (command.userPerms) {
            if (!client.guilds.cache.get(message.guild.id).members.cache.get(message.member.id).permissions.has(command.userPerms || [])) {
                if (command.noUserPermsMessage) {
                    return message.reply(command.noUserPermsMessage)
                } else if (!command.noUserPermsMessage) {
                    return message.reply(`You need the \`${command.userPerms}\` permission to use this command!`)
                }
            }
        }
         if (command.botPerms) {
            if (!client.guilds.cache.get(message.guild.id).members.cache.get(client.user.id).permissions.has(command.botPerms || [])) {
                if (command.noBotPermsMessage) {
                    return message.reply(command.noBotPermsMessage)
                } else if (!command.noBotPermsMessage) {
                    return message.reply(`I need the \`${command.userPerms}\` permission to execute this command!`)
                }
            }
        }
          if(cmd)
         {
        command.run(client, message, args);
         } 
               }
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
categories = fs.readdirSync("./templates/");
["command"].forEach(handler => {
    require(`./handler/${handler}`)(client.commands, client.aliases, client, data)
}); 
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
        
         if (interaction.customId === "help_menu") {

        let msg = await interaction.channel.messages.fetch(interaction.message.id)

        if (interaction.values[0] === "settings") {
            await interaction.deferUpdate()

            const settingsEmbed = new Discord.MessageEmbed()
        .setTitle("Config Commands")
        .setDescription(
          "`autorole`, `antilink`, `joinchannel`, `joinmessage`, `leavechannel`, `leavemessage` `prefix`"
        )
        .setColor("RANDOM");

      await msg.edit({ embeds: [settingsEmbed] });

        } else if (interaction.values[0] === "fun") {
            await interaction.deferUpdate()

            const funEmbed = new Discord.MessageEmbed()
        .setTitle("Fun Commands")
        .setDescription(
          "`8ball`, `ascii`, clap`, `clyde`, `cowsay`, `dab`, `emojify`, `fliptext`, `greentext`, `hack`, `howgay`, `hug`, `joke`, `kill`, `orangetext`, `pokeimg`, `pp`, `respect`, `reverse`, `roast`, `slap`, `trivia`, `urban`, `vaportext`, `yomama`"
        )
        .setColor("RANDOM");

        await msg.edit({ embeds: [funEmbed] });

        } else if (interaction.values[0] === "automod") {
            await interaction.deferUpdate()

            const xdEmbed = new Discord.MessageEmbed()
        .setTitle("Auto Mod Commands")
        .setDescription(
          "`anti-alt`, `antilink`, `autonick`, `auto-official-role`, `auto-official-role-disable`, `autorole`, `role-all`"
        )
        .setColor("RANDOM");

        await msg.edit({ embeds: [xdEmbed] });

        } else if (interaction.values[0] === "image") {

            await interaction.deferUpdate()

            const imageEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("Image Commands")
            .setDescription(
              "`achievement`, `amazeme`, `amiajoke`, `bad`, `challenge`, `changemymind`, `creatememe`, `drake`, `facts`, `illegal`, `phb`, `rip`, `scroll`, `textimage`, `trash`, `trigger`, `trumptweet`, `wasted`, `wideavatar`"
            )

            await msg.edit({ embeds: [imageEmbed]})

            } else if (interaction.values[0] === "info") {

            await interaction.deferUpdate()

            const infoEmbed = new Discord.MessageEmbed()
        .setTitle("Info Commands")
        .setDescription(
          "`botinfo`, `emojiid`, `help`, `invite`, `ping`, `policy`, `report`, `userinfo`, `userid`, `serverinfo`, `suggest`"
        )
        .setColor("RANDOM");

        await msg.edit({ embeds: [infoEmbed] })

        } else if (interaction.values[0] === "moderation") {
            await interaction.deferUpdate()

            const modEmbed = new Discord.MessageEmbed()
            .setTitle("Moderation Commands")
            .setDescription(
              "`kick`, `ban`, `softban`, `mute`, `unmute`, `tempmute`"
            )
            .setColor("RANDOM");

            await msg.edit({ embeds: [modEmbed] })

        } else if (interaction.values[0] === "nsfw") {
            await interaction.deferUpdate()

            const nsfwEmbed = new Discord.MessageEmbed()
        .setTitle("NSFW Commands")
        .setDescription(
          "`4k`, `anal`, `ass`, `blowjob`, `boobs`, `cumsluts`, `erokemo`, `danbooru`, `kitsune`, `hentai`, `hentaiass`, `hentaithigh`, `gonewild`, `milf`, `feetgif`, `pussy`, `porngif`, `urban`, `thigh`, `lewd`"
        )
        .setColor("RANDOM");

        await msg.edit({ embeds: [nsfwEmbed] })

        } else if (interaction.values[0] === "utility") {
            await interaction.deferUpdate()

            const utilityEmbed = new Discord.MessageEmbed()
        .setTitle("Utility Commands")
        .setDescription(
          "`avatar`, `animesearch`, `announce`, `calculator`, `clear`, `createrole`, `delchannel`, `delrole`, `enlargemoji`, `esay`, `giverole`, `google`, `imdb`, `lock`, `newtext`, `newvoice`, `nickname`, `poll`, `removerole`, `say`, `servericon`, `serverinfo`, `suggestion`, `translate`, `unlock`, `weather`, `wiki`, `youtube`"
        )
        .setColor("RANDOM");

        await msg.edit({ embeds: [utilityEmbed] })

      } else if (interaction.values[0] === "game") {
            await interaction.deferUpdate()

          const gameEmbed = new Discord.MessageEmbed()
        .setTitle("Game Commands")
        .setDescription(
          " `catchthefish`, `fasttype`, `football`, `gunfight`, `guessthenumber`, `rps`, `snake`, `ttt`"
        )
        .setColor("RANDOM");

        await msg.edit({ embeds: [gameEmbed] })
      }
    }
  })

   
}
setTimeout(() => {
const {
    CronJob
} = require('cron')


    var resetStats = new CronJob('* * 24 * *', async function() {
    let data = await botsdata.find();
    data.forEach((botdata) => {
      db.delete(`${botdata.stoken}_joinedguilds_${botdata.botID}`);
      db.delete(`${botdata.stokens}_leftguilds_${botdata.botID}`);
    })
        
    }, null, true, 'Europe/Istanbul');
    resetStats.start();
}, 10000)
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
