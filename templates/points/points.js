const db = require("quick.db");
const votesdata = require("../../users.js");
   module.exports = {
  name: "staff-points",
  aliases: ["points", "upvotes", "votes"],
  execute: async(client, message, args, xd , botdata) => {
  let user = message.mentions.members.first();
  if(!user)
  {
    let chek = await votesdata.findOne({user: message.author.id});
    if(!chek) return message.channel.send("You dont have any votes");
     message.channel.send(`You have ${chek.votes} Points`);
     return;
  }
  let chek = await votesdata.findOne({user: user.id})
 
     
  
  message.channel.send(`User have ${chek.votes} Points/Votes`);
  
}}
  