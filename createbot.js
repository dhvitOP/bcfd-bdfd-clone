const Discord = require("discord.js");
let botsdata = require("./model.js");
let {   loadSlashCommands } = require("./handler/loadSlashCommands.js");
const { Intents } = require("discord.js");
let main = require("./index.js");
const db = require("quick.db");
module.exports = {
  name: "createbot",
  aliases: [],
  execute: async(client, message, args) => {
     if(message.guild)
    {
      message.channel.send("You must execute this command from dms of this bot");
      return;

    }
   
   
   
    let token = args[0];
     if(!token)
    {
      return message.channel.send("You must give a bot token");
    }
    let bot = new Discord.Client({ intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_VOICE_STATES,
				Intents.FLAGS.DIRECT_MESSAGES,
               
            
			],
                               });
    await bot.login(token);
    if(!bot.user)
    {
      return message.channel.send("Invalid Bot Token");
    }

  
   
    let lol = makeToken(128);
   var avatar = bot.user.displayAvatarURL({size: 4096, dynamic: true})
            await new botsdata({
           botID: bot.user.id, 
                ownerid: message.author.id,
                avatarurl: avatar,
                botname: bot.user.username,
                stoken: lol
              }).save()
     

  await botsdata.findOneAndUpdate({botID: bot.user.id},{$set: {token: token}})
  
  let user = client.users.cache.get(message.author.id)
  user.send("Bot Created")
  let temp = await botsdata.findOne({botID: bot.user.id});
  main.logins(bot.token, temp);
}
}
function makeToken(length) {
  var result = '';
  var characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+<>?:{}=-]';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
