const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "add",
  aliases: [],
  execute: async(client, message, args) => {
      if(!args[0]){
            var errembed = new Discord.MessageEmbed()
    .setDescription("<a:testfail:841362226149064755> **Failed** <a:testfail:841362226149064755>")
    .addField("Error:", "You can Only Use `me` To Add Yourself in Messaged Guild or `all` To add you in All Guilds")
     return message.channel.send({ embeds: [errembed]})
      }
      if(args[0] == "me")
      {
        var checking = db.fetch(`nitroemoji_${message.guild.id}_${client.user.id}`) 
           if(checking === false || !checking){
             var errembed = new Discord.MessageEmbed()
    .setDescription("<a:testfail:841362226149064755> **Failed** <a:testfail:841362226149064755>")
    .addField("Error:", `This Guild Has not enabled the Free Nitro Emojis Usage Contact Any Admin To Enable`)
     return message.channel.send({ embeds: [errembed]})
           }
        var checking = db.fetch(`added_${message.guild.id}_${message.author.id}_${client.user.id}`)
        if(checking === true){
                  var errembed = new Discord.MessageEmbed()
    .setDescription("<a:testfail:841362226149064755> **Failed** <a:testfail:841362226149064755>")
    .addField("Error:", `You Already Have Added Yourself in Nitro Usage List`)
     return message.channel.send({ embeds: [errembed]})
        }
   db.set(`added_${message.guild.id}_${message.author.id}_${client.user.id}`, true)
              var aembed = new Discord.MessageEmbed()
   .setDescription("<a:testing:841362113212842045> **Successfull** <a:testing:841362113212842045>")
   .addField(`Now Nitro Emojis For ${message.author.username}:`, "Enabled")
   .addField(`For Guild:`, message.guild.name)
   .setFooter(`If Your are not an Nitro User Then Only Use This Otherwise You cannot Use Emojis That You want || NOTE: WE DO NOT SUPPORT USING FREE NITRO EMOJI USAGE WE PREFER TO BUY NITRO IT IS CHEAP AND EASY TO BUY`)
      
   message.channel.send({ embeds: [aembed]});
      }
      else if(args[0] == "all")
      {
        client.guilds.cache.forEach(guild =>{
            var checking = db.fetch(`nitroemoji_${guild.id}_${client.user.id}`) 
           if(checking === false || !checking){
              db.add(`falsecount_${message.author.id}_${client.user.id}`, 1);
             return;
           }
           var checking = db.fetch(`added_${guild.id}_${message.author.id}_${client.user.id}`)
        if(checking === true){
           db.add(`falsecount_${message.author.id}_${client.user.id}`, 1);
                 return;
        }
             db.set(`added_${guild.id}_${message.author.id}_${client.user.id}`, true)
             db.add(`numbercount_${message.author.id}_${client.user.id}`, 1)
        })
        var count = db.fetch(`numbercount_${message.author.id}_${client.user.id}`)
         var failedcount = db.fetch(`falsecount_${message.author.id}_${client.user.id}`);
          if(count == null || !count || count == 0)
             {
               var count = "0";
             }
             console.log(count)
              if(count === 0){
      var errembed = new Discord.MessageEmbed()
    .setDescription("<a:testfail:841362226149064755> **Failed** <a:testfail:841362226149064755>")
    .addField("Error:", `You Already Have Added YourSelf in Free Nitro EMoji Usage From All Servers`)
     return message.channel.send({ embeds: [errembed]})
   }
                var aembed = new Discord.MessageEmbed()
   .setDescription("<a:testing:841362113212842045> **Successfull** <a:testing:841362113212842045>")
   .addField(`Now Nitro Emojis For ${message.author.username}:`, "Enabled")
   .addField(`For Total Number of Guilds:`, `${count}`)
     .addField(`Failed Guilds Count:`, `${failedcount}`)
   .setFooter(`If Your are not an Nitro User Then Only Use This Otherwise You cannot Use Emojis That You want || NOTE: WE DO NOT SUPPORT USING FREE NITRO EMOJI USAGE WE PREFER TO BUY NITRO IT IS CHEAP AND EASY TO BUY`)
    
   db.delete(`numbercount_${message.author.id}_${client.user.id}`);
   if(failedcount >= 1){
   db.delete(`falsecount_${message.author.id}_${client.user.id}`);
   }
   message.channel.send({ embeds: [aembed]});
      } else {
            var errembed = new Discord.MessageEmbed()
    .setDescription("<a:testfail:841362226149064755> **Failed** <a:testfail:841362226149064755>")
    .addField("Error:", "You can Only Use `me` To Add Yourself in Messaged Guild or `all` To add you in All Guilds")
     return message.channel.send({ embeds: [errembed]})
      }
  }
}