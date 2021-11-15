const db = require("quick.db");
const votesdata = require("../../vote.js");
let usersdata = require("../../users.js");
const ms = require("ms");
   module.exports = {
  name: "staff-vote",
  aliases: ["upvote", "vote"],
  execute: async(client, message, args, xd , botdata) => {
  let user = message.mentions.members.first();
  if(!user)
  {
    return message.channel.send("You have to give me a user to upvote");
  }
  
  if(message.author.id === user.id)
  {
    return message.channel.send("You cannot Upvote Yourself");
  }
  if(user.bot || !user.user)
  {
    return message.channel.send("You cannot upvote a bot");
  }
  let data = await votesdata.findOne({user: user.id});
  let chek = await votesdata.findOne({user: user.id, voter: message.author.id});
  if(chek)
  {
    return message.channel.send("You can vote every 12 hours and you have " + ms(chek.date) + " Time left");
  }


  
      await votesdata.findOneAndUpdate({
        voter: message.author.id,
        user: user.id
    }, {
        $set: {
            date: Date.now(),
            
        },
         
    }, {
        upsert: true
    })
    await usersdata.findOneAndUpdate({
       
        user: user.id
    }, {
      
         $inc: {
            votes: 1
        }
    }, {
        upsert: true
    })
 // await _clients.findOneAndUpdate({botID: botid},{$set: {token: token}})
  message.channel.send(`Upvoted <@${user.id}>`);
  
}}
  