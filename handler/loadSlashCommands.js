
function loadSlashCommands(client) {
    const fs = require("fs");
   

    let slash = []


  
    const commandFolders = fs.readdirSync("./SlashCommands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./SlashCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
      for (const file of commandFiles) {
        const command = require(`../SlashCommands/${folder}/${file}`);
        if (command.name) {
          client.slash.set(command.name, command);
          client.slashxd.push(command)
       
        } else {
          
          continue;
        }
      }
   
    }
    return slash;
  }
  
  module.exports = {
    loadSlashCommands,
  };
  