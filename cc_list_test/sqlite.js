const Discord = require('discord.js')

const db = require('quick.db');
const get = async (message, user, botdata) => {
  let data = {}
  let object_user_based = {
   
  } 
  let object_guild_based = {
    logs: []
  } 
  
  let object_guild_user_based = {

  } 
  
  Object.entries(object_user_based).map(async x => {
    let variable = x[0]
    let value = x[1] 
    let item = await db.fetch(botdata.stoken, `${variable}_${user.id}`)
    
    if (item === null) data[variable] = value, db.set(botdata.stoken, `${variable}_${user.id}`, value)
    else data[variable] = item 
  }) 
  
  Object.entries(object_guild_based).map(async x => {
    let variable = x[0]
    let value = x[1]
    let item = await db.fetch(botdata.stoken, `${variable}_${message.guild.id}`)
    if (item === null) await db.set(botdata.stoken, `${variable}_${message.guild.id}`, value), data[variable] = value
    else data[variable] = item 
  }) 
  Object.entries(object_guild_user_based).map(async x => {
    let variable = x[0]
    let value = x[1]
    let item = await db.fetch(botdata.stoken, `${variable}_${message.guild.id}_${user.id}`)
    if (item === null) await db.set(botdata.stoken, `${variable}_${message.guild.id}_${user.id}`, value), data[variable] = value
    else data[variable] = item 
  }) 
  
  await new Promise(resolve => setTimeout(resolve, 1)) 
  
  return data
} 
module.exports = {
  get: get 
} 