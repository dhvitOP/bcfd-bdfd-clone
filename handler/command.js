const {readdirSync} = require('fs');

const db  = require("quick.db")

module.exports= (commandsxd, aliases, client, botdata) => {
     
    readdirSync('./templates/').forEach(async(dir) => {
         let chek = await db.fetch(botdata.stoken, `template_${client.user.id}`);
         if(!chek || chek === null ) return;
        const commands = readdirSync(`./templates/${chek}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../templates/${chek}/${file}`);
           
            if(pull.name){
                client.commands.set(pull.name,  pull);
                
            } else {
               
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
   
}