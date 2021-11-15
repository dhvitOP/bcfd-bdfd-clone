const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "remove",
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
        if(checking === false){
                  var errembed = new Discord.MessageEmbed()
    .setDescription("<a:testfail:841362226149064755> **Failed** <a:testfail:841362226149064755>")
    .addField("Error:", `You Are not in list of Nitro Free Usage OF this Guild`)
     return message.channel.send({ embeds: [errembed]})
        }
   db.set(`added_${message.guild.id}_${message.author.id}_${client.user.id}`, false)
              var aembed = new Discord.MessageEmbed()
   .setDescription("<a:testing:841362113212842045> **Successfull** <a:testing:841362113212842045>")
   .addField(`Now Nitro Emojis For ${message.author.username}:`, "Disabled")
   .addField("For Guild:", message.guild.name)
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
          if(checking == true)
          {
          db.set(`added_${guild.id}_${message.author.id}_${client.user.id}`, false)
          db.add(`numbercount_${message.author.id}_${client.user.id}`, 1);
          } else {
                 db.add(`falsecount_${message.author.id}_${client.user.id}`, 1);
          }
        })
             var count = db.fetch(`numbercount_${message.author.id}_${client.user.id}`)
             var failedcount = db.fetch(`falsecount_${message.author.id}_${client.user.id}`);
             if(count == null)
             {
               var count = "0";
             }
                var aembed = new Discord.MessageEmbed()
   .setDescription("<a:testing:841362113212842045> **Successfull** <a:testing:841362113212842045>")
   .addField(`Now Nitro Emojis For ${message.author.username}:`, "Disabled")
     .addField(`For Total Number of Guilds:`, `${count}`)
     .addField(`Failed Guilds Count:`, `${failedcount}`)
   if(count === 0){
      var errembed = new Discord.MessageEmbed()
    .setDescription("<a:testfail:841362226149064755> **Failed** <a:testfail:841362226149064755>")
    .addField("Error:", `You Already Have Removed Your Free Nitro EMoji Usage From All Servers`)
     return message.channel.send({ embeds: [errembed]})
   }
   db.delete(`numbercount_${message.author.id}_${client.user.id}`);
    if(failedcount >= 1){
   db.delete(`falsecount_${message.author.id}_${client.user.id}`);
   }
   message.channel.send({ embeds: [aembed]});
      }  else {
            var errembed = new Discord.MessageEmbed()
    .setDescription("<a:testfail:841362226149064755> **Failed** <a:testfail:841362226149064755>")
    .addField("Error:", "You can Only Use `me` To Add Yourself in Messaged Guild or `all` To add you in All Guilds")
     return message.channel.send({ embeds: [errembed]})
      }
  }
}