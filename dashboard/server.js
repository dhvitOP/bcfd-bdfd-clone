const url = require("url");
const path = require("path");
const express = require("express");
const passport = require("passport");

const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const ejs = require("ejs");
const config = require("../config.js");

const bodyParser = require("body-parser");
const Discord = require("discord.js");
let { Intents } = require("discord.js");
//const config = require("../config.js");
let main = require("../index.js");

const botsdata = require("../model.js");
const app = express();
const MemoryStore = require("memorystore")(session);
const fetch = require("node-fetch");
const cookieParser = require('cookie-parser');
const referrerPolicy = require('referrer-policy');
app.use(referrerPolicy({ policy: "strict-origin" }))
const rateLimit = require("express-rate-limit");
var MongoStore = require('rate-limit-mongo');
const db = require("quick.db");
const { SlashCommandBuilder } = require('@discordjs/builders');
 const request = require('request');
 const moment = require("moment");
module.exports = async(globalbots , login) => {


    let allbots = globalbots;
      let mclient = globalbots.get(config.botid);
      

  var minifyHTML = require('express-minify-html-terser');
  app.use(minifyHTML({
      override:      true,
      exception_url: false,
      htmlMinifier: {
          removeComments:            true,
          collapseWhitespace:        true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes:     true,
          removeEmptyAttributes:     true,
          minifyJS:                  true
      }
  }));
  app.set('views', path.join(__dirname, '/views'));
  const templateDir = path.resolve(`${process.cwd()}${path.sep}src/views`);
  app.use("/css", express.static(`./dashboard/assets/css`));
  app.use("/js", express.static(`./dashboard/assets/js`));
 console.log("<< Dashboard Started >>");

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
 passport.use(new Strategy({
    clientID: config.botid,
    clientSecret: config.botsecret,
    callbackURL: config.callback,      
    scope: ["identify", "guilds"]
  },
  (accessToken, refreshToken, profile, done) => { 
    process.nextTick(() => done(null, profile));
  }));
 

  app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n&^&HUDVHDYV^%^TGUSN514vsjdv",
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());


  app.engine("bcfd", ejs.renderFile);
  app.set("view engine", "bcfd");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }
  checkOwner = async(req, res, next) => {

    let chek = await botsdata.findOne({botID: req.params.botID});
     if(chek) {
        if(chek.ownerid === req.user.id)
       {
         return next();
        
       } else { 
         return res.redirect("https://" + req.get('host') + "/not-owner");
       } 
     }
     
  }
app.get("/createbot", checkAuth, async(req,res) => {
  res.render("createbot.ejs", {req: req});
})
app.post("/createbot", checkAuth, async(req,res) => {
  try { 
     let bot = new Discord.Client({ intents: [
      Intents.FLAGS.GUILDS,
     

   
             
          
    ],
                           });
await bot.login(req.body.bottoken);
       let botsxd = await botsdata.find()
       let bots = botsxd.filter(a => a.ownerid === req.user.id);
       if(bots && bots.length === 2 || bots.length > 2)
       {
          return res.redirect("https://" + req.get('host') + "/bots?error=true&message=You can only create 2 bots.")
       }
       
       let botid = bot.user.id;
      var avatar = bot.user.displayAvatarURL({size: 4096, dynamic: true})
      let botname = bot.user.username;
   await bot.destroy();
   
    let xd = globalbots.get(botid);
    if(xd)
    {
      res.redirect("https://" + req.get('host') + "/bot/"+ botid + "?error=true&message=Bot Already Exist.");
      return;
    }
    
      let lol = makeToken(128);
   
            await new botsdata({
           botID: botid, 
                ownerid: req.user.id,
                avatarurl: avatar,
                botname: botname,
                stoken: lol
              }).save()
     

  await botsdata.findOneAndUpdate({botID: botid},{$set: {token: req.body.bottoken}})
  let fr = await botsdata.findOne({botID: botid});
   login(req.body.bottoken, fr);
  setTimeout(() => {
res.redirect("https://" + req.get('host') + "/bot/"+ botid + "?success=true&message=Bot Created.");
  }, 3000);

       
   } catch (err) {
    console.log(err + "ERROR ON CREATING  BOT");
     res.redirect("https://" + req.get('host') + "/createbot?error=true&message=Bot Token Invalid.");
    
       return;
  }
    
 
  
  
})
 app.get("/bot/:botID", checkAuth, checkOwner, async(req,res) => {
     let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
     let bot = allbots.get(req.params.botID);
    if(!bot) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.")
     res.render("index.ejs", {
        req: req,
    	bot: bot,
        botdata: chek,
        hostingtime: convertTime(Date.now()+bot.uptime, "from", true),
        db: db
    })

 })
  app.get("/bot/:botID/delete", checkAuth, checkOwner, async(req,res) => {
     let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
     chek.commands.forEach(async(cmdname) => {
       if(!cmdname)return;
      chek.stoken +  chek.stoken +       db.delete(`${chek.stoken}_${cmdname}_${req.params.botID}`);
     db.delete(chek.stoken + `DHVITOPXDIDKWHTLOL_CMDXDBREH_${cmdname}_${req.params.botID}`);
     })
     chek.events.forEach(async(evname) => {
       if(!evname) return;
      db.delete(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${evname}_${req.params.botID}`);
    
     })
     await botsdata.deleteOne({botID: req.params.botID});
     res.redirect("https://" + req.get('host') + "/bots?success=true&message=Bot Deleted")
    
    

 })
 
  app.get("/bots", checkAuth, async(req,res) => {
  
  
     let bots = await botsdata.find();
     res.render("bots.ejs", {
        req: req,
    	allbots: allbots,
   
      
        db: db,
        botsdata: bots
    })

 })
  app.get("/bot/:botID/settings", checkAuth, checkOwner, async(req,res) => {
     let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
    let prefix = db.fetch(chek.stoken + `prefix_${req.params.botID}`) || ".";
    let status = db.fetch(chek.stoken + `status_${req.params.botID}`) || "Made by BCFD";
     res.render("Setting.ejs", {
        req: req,
    	bot:  allbots.get(req.params.botID),
        botdata: chek,
        db: db,
        prefix: prefix,
        status: status
    })

 })
  app.post("/bot/:botID/settings", checkAuth, checkOwner, async(req,res) => {
     let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bot?error=true&message=Bot Does Not Exist.");
    if(!req.body.botname) return res.redirect("https://" + req.get('host') + "/bot/"+ req.params.botID + "/settings?error=true&message=Give a Bot Name.");


if(!req.body.botprefix) return res.redirect("https://" + req.get('host') + "/bot/"+ req.params.botID + "/settings?error=true&message=Give a Bot Prefix.");
if(!req.body.botstatus) return res.redirect("https://" + req.get('host') + "/bot/"+ req.params.botID + "/settings?error=true&message=Give a Bot Status.");
 let bot = allbots.get(req.params.botID);
 bot.user.setUsername(req.body.botname);
 await bot.user.setPresence({ activities: [{ name: req.body.botstatus }] });
 db.set(chek.stoken + `prefix_${req.params.botID}`, req.body.botprefix);
 db.set(chek.stoken + `status_${req.params.botID}`, req.body.botstatus);
 return res.redirect("https://" + req.get('host') + "/bot/"+ req.params.botID + "/settings");
    
 })
 app.get("/bot/:botID/cc", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect
     ("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
     res.render("Create Command.ejs", {
        req: req,
    	bot: allbots.get(req.params.botID),
        botdata: chek,
         type: "create",
        db: db
    })
 })
 app.post("/bot/:botID/cc", checkAuth, checkOwner, async(req, res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
     if(!req.body.cmdname) return res.redirect("https://" + req.get('host') + "/bot/"+ req.params.botID + "/commands?error=true&message=Give a Command name.");
     if(!req.body.cmddes) return res.redirect("https://" + req.get('host') + "/bot/"+ req.params.botID + "/commands?error=true&message=Give a Bot Description.");
     if(!req.body.cmddata) return res.redirect("https://" + req.get('host') + "/bot/"+ req.params.botID + "/commands?error=true&message=Give a Bot Code.");
     if(db.has(`${chek.stoken}_${req.body.cmdname}_${req.params.botID}`))
     {return res.redirect("https://" + req.get('host') + "/bot/"+ req.params.botID + "/commands?error=true&message=Command Already Exist.");

     }
     let client = allbots.get(req.params.botID);
     let lol = req.body.cmdname;
     let cmdname = lol.toLowerCase();
     let prefix = db.fetch(chek.stoken + `prefix_${req.params.botID}`)
     if(cmdname.includes(prefix)) {
       cmdname.replace(prefix, "");
     }
        var data = req.body.cmddata;
        try { 
      var dataxd = new SlashCommandBuilder()

  .setName(cmdname)

.setDescription(req.body.cmddes.toLowerCase())
var xd = []
xd.push(dataxd)
await client.application.commands.set(xd);
        } catch(error)
        {
          return res.redirect(`https://${req.get('host')}/cc&message=${error}`);
        }

data = `var db = require("quick.db")\n ${data}`;
if(data.includes("db."))
  {
    data = data.replace("db.fetch(", " db.fetch(botdata.stoken +");
    data = data.replace("db.set(", " db.set(botdata.stoken +");
    data = data.replace("db.delete(", " db.fetch(botdata.stoken +");
    data = data.replace("db.add(", " db.add(botdata.stoken +");
  data = data.replace("db.subtract(", " db.subtract(botdata.stoken +");
    data =  data.replace("db.push(", "db.push(botdata.stoken +");
    
    
  }
     db.set( chek.stoken + `DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.body.cmdname}_${req.params.botID}`, data);
     db.set(`${chek.stoken}_${req.body.cmdname}_${req.params.botID}`, req.body.cmddes);
 
         let cmdsto = chek.commands;
   cmdsto.push(`${req.body.cmdname}`);
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: req.params.botID},{$set: {commands: cmdsto}})
     
    
     res.redirect(`https://` + req.get('host') + `/bot/${req.params.botID}/command/${req.body.cmdname}?success=true&message=Created Command`);
    
 })
 app.get("/bot/:botID/command/:cmdname", checkAuth, checkOwner, async(req, res) => {
   let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
     let cmdname = req.params.cmdname;

     let cmddes = db.fetch(`${chek.stoken}_${req.params.cmdname}_${req.params.botID}`);

     if(!cmddes)
     {
       return res.redirect("https://" + req.get('host') + "/bot/" + req.params.botID + "/comchek.stoken + mchek.stoken + ands?error=true&message=Command Doesn't Exist");
     }
     let data = db.fetch(chek.stoken + `DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.params.cmdname}_${req.params.botID}`);
       if(!data)
     {
       return res.redirect("https://" + req.get('host') + "/bot/" + req.params.botID + "/comchek.stoken + mchek.stoken + ands?error=true&message=Command Doesn't Exist");
     }
      if(data.includes("db"))
  {
    data = data.replace("db.fetch(", " db.fetch(botdata.stoken +");
    data = data.replace("db.set(", " db.set(botdata.stoken +");
    data = data.replace("db.delete(", " db.fetch(botdata.stoken +");
    data = data.replace("db.add(", " db.add(botdata.stoken +");
    data = data.replace("db.subtract(", " db.subtract(botdata.stoken +");
    data = data.replace("db.push(", "db.push(botdata.stoken +");
  }
    
     res.render("Create Command.ejs", {
       req: req,
    	bot: allbots.get(req.params.botID),
        botdata: chek,
        db: db,
        type: "edit",
        cmdname: cmdname,
        cmddes: cmddes,
        cmddata: data
    })
 })
  app.post("/bot/:botID/command/:cmdname", checkAuth, checkOwner, async(req, res) => {
   let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
  
     if(!req.body.cmdname) return res.redirect("https://" + req.get('host') + "/bot/" + req.params.botID + "/command/" + req.params.cmdname + "?error=true&message=Give me Command Name");
     if(!req.body.cmddes) return res.redirect("https://" + req.get('host') + "/bot/" + req.params.botID + "/command/" + req.params.cmdname + "?error=true&message=Give me Command Description");
     if(!req.body.cmddata) return res.redirect("https://" + req.get('host') + "/bot/" + req.params.botID + "/command/" + req.params.cmdname + "?error=true&message=Give me Command Code");
  
     if(db.has(chek.stoken + `DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.body.cmdname}_${req.params.botID}`))
     {

     } else {
         let cmdsto = chek.commands;
   cmdsto.shift(`${req.params.cmdname}`);
   cmdsto.push(`${req.body.cmdname}`);
 //  console.log(cmdsto);
     await botsdata.findchek.stoken +Ochek.stoken + neAndUpdate({botID: req.params.botID},{$set: {commands: cmdsto}})
     db.delete(chek.stoken + `DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.params.cmdname}_${req.params.botID}`);
     db.delete(`${chek.stchek.stoken + oken}_${req.params.cmdname}_${req.params.botID}`);
     }
       
        db.set(chek.stoken + `DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.body.cmdname}_${req.params.botID}`, req.body.cmddata);
     db.set(`${chek.stoken}_${req.body.cmdname}_${req.params.botID}`, req.body.cmddes);
     
    
     res.redirect(`https://` + req.get('host') + `/bot/${req.params.botID}/command/${req.body.cmdname}?success=true&message=Successful`);
     
 })
  app.get("/bot/:botID/event/:cmdname", checkAuth, checkOwner, async(req, res) => {
   let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
     let evname = req.params.cmdname;

   
     let data = db.fetch(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${req.params.cmdname}_${req.params.botID}`);
     if(!data || !evname)
     {
       return res.redirect("https://" + req.get('host') + "/bot/" + req.params.botID + "/event/" + req.params.cmdname + "?error=true&message=Event Doesn't Exist");
     }
     if(data.includes("db"))
  {
    data = data.replace("db.fetch(", " db.fetch(botdata.stoken +");
    data = data.replace("db.set(", " db.set(botdata.stoken +");
    data = data.replace("db.delete(", " db.fetch(botdata.stoken +");
    data = data.replace("db.add(", " db.add(botdata.stoken +");
    data = data.replace("db.subtract(", " db.subtract(botdata.stoken +");
    data = data.replace("db.push(", "db.push(botdata.stoken +");
  }
     res.render("Create Events.ejs", {
        req: req,
    	bot: allbots.get(req.params.botID),
        botdata: chek,
        db: db,
        type: "edit",
        evname: evname,
        
        evdata: data
    })
 })
  app.post("/bot/:botID/event/:cmdname", checkAuth, checkOwner, async(req, res) => {
   let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
   
     if(!req.body.evname) return res.redirect("https://" + req.get('host') + "/bot/" + req.params.botID + "/event/" + req.params.cmdname + "?error=true&message=Give me Event Name");
     
     if(!req.body.evdata) return res.redirect("https://" + req.get('host') + "/bot/" + req.params.botID + "/event/" + req.params.cmdname + "?error=true&message=Give me Event Code");
     let data = req.body.evdata;
   if(data.includes("db"))
  {
    data = data.replace("db.fetch(", " db.fetch(botdata.stoken +");
    data = data.replace("db.set(", " db.set(botdata.stoken +");
    data = data.replace("db.delete(", " db.fetch(botdata.stoken +");
    data = data.replace("db.add(", " db.add(botdata.stoken +");
    data = data.replace("db.subtract(", " db.subtract(botdata.stoken +");
    data = data.replace("db.push(", "db.push(botdata.stoken +");
    
    
  }
         if(req.body.evname === "messagecreate")
   {
     db.set(chek.stoken + `DHVITOPXDIDKWHTLOL_events_message_${req.params.botID}`, data);
   } else {
      db.set(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${req.body.evname}_${req.params.botID}`, data);
   }
   if(db.has(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${req.body.evname}_${req.params.botID}`))
   {

   } else {
              let cmdsto = chek.events;
   cmdsto.shift(`${req.params.cmdname}`);
   cmdsto.push(`${req.body.evname}`);
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: req.params.botID},{$set: {events: cmdsto}})
     db.delete(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${req.params.evname}_${req.params.botID}`);
   
   }
   
    
     res.redirect(`https://` + req.get('host') + `/bot/${req.params.botID}/event/${req.body.evname}?success=true&message=Successful`);
     
 })
 app.get("/bot/:botID/commands", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/xd");
     res.render("Commands.ejs", {
        req: req,
    	bot: allbots.get(req.params.botID),
        botdata: chek,
        db: db
    })
 })
  app.get("/bot/:botID/command/:cmdname/delete", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
     let cmddes = db.fetch(`${chek.stoken}_${req.params.cmdname}_${req.params.botID}`);
     if(!cmddes)
     {
       return res.redirect("https://" + req.get('host') + "/bot/" + req.params.botID + "/command/" + req.params.cmdname + "?error=true&message=Command Doesn't Exist");
     }
     db.dchek.stoken +echek.stoken + lete(`${chek.stoken}_${req.params.cmdname}_${req.params.botID}`);
     db.delete(chek.stoken + `DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.params.cmdname}_${req.params.botID}`);
     let cmdsto = chek.commands;
   cmdsto.shift(`${req.params.cmdname}`);
  
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: req.params.botID},{$set: {commands: cmdsto}})
    res.redirect(`https://` + req.get('host') + `/bot/${req.params.botID}/commands?success=true&message=Deleted Command`);
     
 })
   app.get("/bot/:botID/event/:evname/delete", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
     let cmddes = db.fetch(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${req.params.evname}_${req.params.botID}`);
     if(!cmddes)
     {
       return res.redirect("https://" + req.get('host') + "/bot/" + req.params.botID + "/events?error=true&message=Event Doesn't Exist");
     }
     db.delete(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${req.params.evname}_${req.params.botID}`);
    
     let cmdsto = chek.events;
   cmdsto.shift(`${req.params.evname}`);
  
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: req.params.botID},{$set: {events: cmdsto}})
    res.redirect(`https://` + req.get('host') + `/bot/${req.params.botID}/events?success=true&message=Deleted Event`);
     
 })
  app.get("/bot/:botID/events", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/xd");
     res.render("Events.ejs", {
        req: req,
    	bot: allbots.get(req.params.botID),
        botdata: chek,
        db: db
    })
 })
  app.get("/bot/:botID/ce", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/xd");
     res.render("Create Events.ejs", {
        req: req,
    	bot: allbots.get(req.params.botID),
        botdata: chek,
        type: "create",
        db: db
    })
 })

  app.post("/bot/:botID/ce", checkAuth, checkOwner, async(req, res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://" + req.get('host') + "/bots?error=true&message=Bot Does Not Exist.");
     if(!req.body.evname) return res.redirect("https://" + req.get('host') + "/bot/"+ req.params.botID + "/ce?error=true&message=Give me an Event Name");
    
     if(!req.body.evdata) return res.redirect("https://" + req.get('host') + "/bot/"+ req.params.botID + "/ce?error=true&message=Give me an Event Code");
     let vxd = req.body.evname;
     let vent = vxd.toLowerCase();
    var data = `var db = require("quick.db")\n ${req.body.evdata}`;
     if(req.body.evdata.includes("db."))
  {
     data = data.replace("db.fetch(", " db.fetch(botdata.stoken +");
    data = data.replace("db.set(", " db.set(botdata.stoken +");
    data = data.replace("db.delete(", " db.fetch(botdata.stoken +");
    data = data.replace("db.add(", " db.add(botdata.stoken +");
    data = data.replace("db.subtract(", " db.subtract(botdata.stoken +");
    data = data.replace("db.push(", "db.push(botdata.stoken +");
    
    
  }

     if(vent === "messagecreate")
   {
     db.set(chek.stoken + `DHVITOPXDIDKWHTLOL_events_message_${req.params.botID}`, data);
   } else {
     
      db.set(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${vent}_${req.params.botID}`, `${data}`);
   }
   
       let cmdsto = chek.events;
   cmdsto.push(`${vent}`);
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: req.params.botID},{$set: {events: cmdsto}})

     res.redirect(`https://` + req.get('host') + `/bot/${req.params.botID}/event/${vent}?success=true&message=Event Created`);
    
 })
 app.post("/import", checkAuth, async(req, res) => {

      
       let urlxd = req.url;
       urlxd = urlxd.replace("import/", "importinbot/");
     let bots = await botsdata.find();
     res.render("cbots.ejs", {
        req: req,
    	allbots: allbots,
      bodyshare: req.body,
      url: urlxd,
        db: db,
       botsdata: bots
    })
    

   })
   app.post("/import/:botID", checkAuth, async(req, res) => {
      let cmdname = req.body.name;
    

  
     let botdata = await botsdata.findOne({botID: req.params.botID});
     
       let client = allbots.get(req.params.botID);
       if(!client)return res.redirect(`https://` + req.get('host') + `/import/`);
    
     cmdname = cmdname.toLowerCase();
           var data = req.body.code;
           try {
      var dataxd = new SlashCommandBuilder()
 
  .setName(cmdname)

.setDescription(req.body.description);
var xd = []
xd.push(dataxd)
await client.application.commands.set(xd);
           } catch(error) { 
                return res.redirect(`https://${req.get('host')}/bot/${req.params.botID}&message=${error}, An Errors Occured`);
           }
data = `var db = require("quick.db")\n ${data}`;
if(data.includes("db."))
  {
    data = data.replace("db.fetch(", " db.fetch(botdata.stoken +");
    data = data.replace("db.set(", " db.set(botdata.stoken +");
    data = data.replace("db.delete(", " db.fetch(botdata.stoken +");
    data = data.replace("db.add(", " db.add(botdata.stoken +");
    data = data.replace("db.subtract(", " db.subtract(botdata.stoken +");
    data =  data.replace("db.push(", "db.push(botdata.stoken +");
    
    
  }
     db.set(botdata.stoken + `DHVITOPXDIDKWHTLOL_CMDXDBREH_${cmdname}_${req.params.botID}`, data);
     db.set(`${botdata.stoken}_${cmdname}_${req.params.botID}`, req.body.description);
        
         let cmdsto = botdata.commands;
   cmdsto.push(`${cmdname}`);
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: req.params.botID},{$set: {commands: cmdsto}})
     res.redirect(`https://` + req.get('host') + `/bot/${req.params.botID}/command/${cmdname}`)
   })

 app.get("/login", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL; 
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
     }
    next();
  },
  passport.authenticate("discord", { prompt: 'none' }));
  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/error?code=999&message=We encountered an error while connecting." }), async (req, res) => {
     
     
      
          
           
            request({
                url: `https://discordapp.com/api/v8/guilds/875661895951056897/members/${req.user.id}`,
                method: "PUT",
                json: { access_token: req.user.accessToken },
                headers: { "Authorization": `Bot ODI4OTg4NTQyNDQwNzAyMDQ5.YGxlvg.u0CmCcc19lvAGjjZljuGGyEtOls` }
            });
   
      res.redirect(req.session.backURL || '/')
      
      
      
      
  });

  app.get("/logout", function (req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });
   app.listen(8000)
   /* CODESHARE COMMANDS IMPORT */
   /* CODESHARE COMMANDS IMPORT */
   /* CODESHARE COMMANDS IMPORT */
   
}
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
   function convertTime(time, type, noPrefix, locale){
		if(!type) time = "to";
	
		const languageData = "en";
		const m = moment(time)
			.locale(languageData);
      let xd = (type === "to" ? m.toNow(noPrefix) : m.fromNow(noPrefix));
      xd = xd.replace("a", "A");
      xd = xd.replace("f", "F");
      xd = xd.replace("minute", "Minute");
      xd = xd.replace("seconds", "Second");
      xd = xd.replace("hour", "Hour");
      xd = xd.replace("days", "Days");
    
		return xd;
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

