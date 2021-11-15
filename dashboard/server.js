const url = require("url");
const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const ejs = require("ejs");
const bodyParser = require("body-parser");
const Discord = require("discord.js");
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
module.exports = async(globalbots) => {
  sleep(5000)
  
    let allbots = globalbots;
      let mclient = globalbots.get("828988542440702049");
      

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
 console.log("it got started");

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  passport.use(new Strategy({
    clientID: "828988542440702049",
    clientSecret: "G3OJBhMcnYcjXziYHLWCEBTGT6JUMEZd",
    callbackURL: "https://bcfd.dhvitop.repl.co/callback",      
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
       /* if(chek.ownerid != req.user.id)
       {
         return res.redirect("https://bcfd.dhvitop.repl.co/not-owner");
       } else { */
         return next();
       //} 
     }
     
  }

 app.get("/bot/:botID", checkAuth, checkOwner, async(req,res) => {
     let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/xd");
     let bot = allbots.get(req.params.botID);
    
     res.render("lol.ejs", {
        req: req,
    	bot: bot,
        botdata: chek,
        hostingtime: convertTime(Date.now()+bot.uptime, "from", true),
        db: db
    })

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
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/xd");
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
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/xd");
    if(!req.body.botname) return res.redirect("https://bcfd.dhvitop.repl.co/xd");


if(!req.body.botprefix) return res.redirect("https://bcfd.dhvitop.repl.co/xd");
if(!req.body.botstatus) return res.redirect("https://bcfd.dhvitop.repl.co/xd");
 let bot = allbots.get(req.params.botID);
 bot.user.setUsername(req.body.botname);
 await bot.user.setPresence({ activities: [{ name: req.body.botstatus }] });
 db.set(chek.stoken + `prefix_${req.params.botID}`, req.body.botprefix);
 db.set(chek.stoken + `status_${req.params.botID}`, req.body.botstatus);
 return res.redirect("https://bcfd.dhvitop.repl.co/bot/"+ req.params.botID + "/settings");
    
 })
 app.get("/bot/:botID/cc", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect
     ("https://bcfd.dhvitop.repl.co/xd");
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
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/no-bot");
     if(!req.body.cmdname) return res.redirect("https://bcfd.dhvitop.repl.co/no-cmdname");
     if(!req.body.cmddes) return res.redirect("https://bcfd.dhvitop.repl.co/no-cmddes");
     if(!req.body.cmddata) return res.redirect("https://bcfd.dhvitop.repl.co/no-cmddata");
     if(db.has(`${chek.stoken}_${req.body.cmdname}_${req.params.botID}`))
     {return res.redirect("https://bcfd.dhvitop.repl.co/cmd-already-exist");

     }
     let client = allbots.get(req.params.botID);
     let lol = req.body.cmdname;
     let cmdname = lol.toLowerCase();
      var data = new SlashCommandBuilder()

  .setName(cmdname)

.setDescription(req.body.cmddes.toLowerCase())
var xd = []
xd.push(data)
await client.application.commands.set(xd);
     db.set(`DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.body.cmdname}_${req.params.botID}`, req.body.cmddata);
     db.set(`${chek.stoken}_${req.body.cmdname}_${req.params.botID}`, req.body.cmddes);
 
         let cmdsto = chek.commands;
   cmdsto.push(`${req.body.cmdname}`);
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: req.params.botID},{$set: {commands: cmdsto}})
     
    
     res.redirect(`https://bcfd.dhvitop.repl.co/bot/${req.params.botID}/command/${req.body.cmdname}`);
    
 })
 app.get("/bot/:botID/command/:cmdname", checkAuth, checkOwner, async(req, res) => {
   let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/no-bot");
     let cmdname = req.params.cmdname;

     let cmddes = db.fetch(`${chek.stoken}_${req.params.cmdname}_${req.params.botID}`);
     if(!cmddes)
     {
       return res.redirect("https://bcfd.dhvitop.repl.co/no-cmd-exist");
     }
     let cmddata = db.fetch(`DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.params.cmdname}_${req.params.botID}`);
     res.render("Create Command.ejs", {
       req: req,
    	bot: allbots.get(req.params.botID),
        botdata: chek,
        db: db,
        type: "edit",
        cmdname: cmdname,
        cmddes: cmddes,
        cmddata: cmddata
    })
 })
  app.post("/bot/:botID/command/:cmdname", checkAuth, checkOwner, async(req, res) => {
   let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/no-bot");
  
     if(!req.body.cmdname) return res.redirect("https://bcfd.dhvitop.repl.co/no-cmdname");
     if(!req.body.cmddes) return res.redirect("https://bcfd.dhvitop.repl.co/no-cmddes");
     if(!req.body.cmddata) return res.redirect("https://bcfd.dhvitop.repl.co/no-cmddata");
  
     if(db.has(`DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.body.cmdname}_${req.params.botID}`))
     {

     } else {
         let cmdsto = chek.commands;
   cmdsto.shift(`${req.params.cmdname}`);
   cmdsto.push(`${req.body.cmdname}`);
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: req.params.botID},{$set: {commands: cmdsto}})
     db.delete(`DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.params.cmdname}_${req.params.botID}`);
     db.delete(`${chek.stoken}_${req.params.cmdname}_${req.params.botID}`);
     }
     
        db.set(`DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.body.cmdname}_${req.params.botID}`, req.body.cmddata);
     db.set(`${chek.stoken}_${req.body.cmdname}_${req.params.botID}`, req.body.cmddes);
     
    
     res.redirect(`https://bcfd.dhvitop.repl.co/bot/${req.params.botID}/command/${req.body.cmdname}`);
     
 })
  app.get("/bot/:botID/event/:cmdname", checkAuth, checkOwner, async(req, res) => {
   let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/no-bot");
     let evname = req.params.cmdname;

   
     let evdata = db.fetch(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${req.params.cmdname}_${req.params.botID}`);
     if(!evdata || !evname)
     {
       return res.redirect("/no-event-exist");
     }
     res.render("Create Events.ejs", {
        req: req,
    	bot: allbots.get(req.params.botID),
        botdata: chek,
        db: db,
        type: "edit",
        evname: evname,
        
        evdata: evdata
    })
 })
  app.post("/bot/:botID/event/:cmdname", checkAuth, checkOwner, async(req, res) => {
   let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/no-bot");
   
     if(!req.body.evname) return res.redirect("https://bcfd.dhvitop.repl.co/no-eventname");
     
     if(!req.body.evdata) return res.redirect("https://bcfd.dhvitop.repl.co/no-eventdata");
  
   
         if(req.body.evname === "messagecreate")
   {
     db.set(chek.stoken + `DHVITOPXDIDKWHTLOL_events_message_${req.params.botID}`, req.params.evdata);
   } else {
      db.set(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${req.body.evname}_${req.params.botID}`, `${req.body.evdata}`);
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
   
    
     res.redirect(`https://bcfd.dhvitop.repl.co/bot/${req.params.botID}/event/${req.body.evname}`);
     
 })
 app.get("/bot/:botID/commands", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/xd");
     res.render("Commands.ejs", {
        req: req,
    	bot: allbots.get(req.params.botID),
        botdata: chek,
        db: db
    })
 })
  app.get("/bot/:botID/command/:cmdname/delete", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/xd");
     let cmddes = db.fetch(`${chek.stoken}_${req.params.cmdname}_${req.params.botID}`);
     if(!cmddes)
     {
       return res.redirect("https://bcfd.dhvitop.repl.co/no-cmd-exist");
     }
     db.delete(`${chek.stoken}_${req.params.cmdname}_${req.params.botID}`);
     db.delete(`DHVITOPXDIDKWHTLOL_CMDXDBREH_${req.params.cmdname}_${req.params.botID}`);
     let cmdsto = chek.commands;
   cmdsto.shift(`${req.params.cmdname}`);
  
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: req.params.botID},{$set: {commands: cmdsto}})
    res.redirect(`https://bcfd.dhvitop.repl.co/bot/${req.params.botID}/commands`);
     
 })
   app.get("/bot/:botID/event/:evname/delete", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/xd");
     let cmddes = db.fetch(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${req.params.evname}_${req.params.botID}`);
     if(!cmddes)
     {
       return res.redirect("https://bcfd.dhvitop.repl.co/no-event-exist");
     }
     db.delete(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${req.params.evname}_${req.params.botID}`);
    
     let cmdsto = chek.events;
   cmdsto.shift(`${req.params.evname}`);
  
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: req.params.botID},{$set: {events: cmdsto}})
    res.redirect(`https://bcfd.dhvitop.repl.co/bot/${req.params.botID}/events`);
     
 })
  app.get("/bot/:botID/events", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/xd");
     res.render("Events.ejs", {
        req: req,
    	bot: allbots.get(req.params.botID),
        botdata: chek,
        db: db
    })
 })
  app.get("/bot/:botID/ce", checkAuth, checkOwner, async(req,res) => {
    let chek = await botsdata.findOne({botID: req.params.botID});
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/xd");
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
     if(!chek) return res.redirect("https://bcfd.dhvitop.repl.co/no-bot");
     if(!req.body.evname) return res.redirect("https://bcfd.dhvitop.repl.co/no-evname");
    
     if(!req.body.evdata) return res.redirect("https://bcfd.dhvitop.repl.co/no-evdata");
     let vxd = req.body.evname;
     let vent = vxd.toLowerCase();
     if(vent === "messagecreate")
   {
     db.set(chek.stoken + `DHVITOPXDIDKWHTLOL_events_message_${req.params.botID}`, req.body.evdata);
   } else {
     
      db.set(chek.stoken + `DHVITOPXDIDKWHTLOL_events_${vent}_${req.params.botID}`, `${req.body.evdata}`);
   }
       let cmdsto = chek.events;
   cmdsto.push(`${vent}`);
 //  console.log(cmdsto);
     await botsdata.findOneAndUpdate({botID: req.params.botID},{$set: {events: cmdsto}})

     res.redirect(`https://bcfd.dhvitop.repl.co/bot/${req.params.botID}/event/${vent}`);
    
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
                headers: { "Authorization": `Bot ODI4OTg4NTQyNDQwNzAyMDQ5.YGxlvg.kiRMfSPNRzwcJ_e7XJacM-4g700` }
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

