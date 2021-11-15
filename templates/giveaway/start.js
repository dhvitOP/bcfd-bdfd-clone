const ms = require('ms');

module.exports = {
  name: "start",
  aliases: ["gstart"],
   execute: async(client, message, args) => {
 
    
  
 

    // If the member doesn't have enough permissions
       if (!message.member.permissions.has("MANAGE_GUILD"))
    {
       message.channel.send(
        "You need `MANAGE GUILD` to Access this Command!"
      );
      return;
}

   // If the member doesn't have enough permissions
   
    // Giveaway channel
    var giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        var giveawayChannel = message.channel;
    }

    // Giveaway duration
    let giveawayDuration = args[0];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: You have to specify a valid duration!');
    }

    // Number of winners
    let giveawayNumberWinners = parseInt(args[1]);
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: You have to specify a valid number of winners!');
    }else
    if(giveawayNumberWinners > 10){
        return message.channel.send(':x: You must have less than 10 winners!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(2).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: You have to specify a valid prize!');
    }

    // Start the giveaway
    
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        duration: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: ":tada: :tada ** GIVEAWAY **:tada: :tada:",
            giveawayEnded: ":tada: :tada: **Giveaway Ended** :tada: :tada:",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with :tada: to participate!",
            winMessage: " :tada: {winners} won **{prize}**!",
            embedFooter: client.user.username,
            noWinner: "Giveaway cancelled, no valid participations.",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`${client.config.giveawayEmoji} Giveaway started in <#${giveawayChannel.id}>`);

}}
module.exports.help = {
    name: "start",
    description: "To start a giveaway",
    usage: "start ",
    type: "Giveaway" 
}