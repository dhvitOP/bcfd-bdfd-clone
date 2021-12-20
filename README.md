# Requirements
NodeJS V16 <br> 
Should know Basics of JS and Express also discord.js lol
# Upcoming/Todo
✔ = In Development and ❌ = Pending <br>
~~CodeShare from which you can import codes in your bot directly (Almost Made)~~<br>
Add Slash Commands Options/Arguments for Commands                                             ❌ <br>
# Info on Codeshare Integration (Done)
For This Its making a POST Method System, So that any codeshare website can integrate any of this project and add an code import system to their codeshare site. <br>
Only Discord.js Code Type will be supported (If i don't have any plan to add new language support) <br>
# Documentation for CodeShare Integration
You can see it [Here](https://github.com/dhvitOP/bcfd-bdfd-clone/wiki)
# Notice
Please Star if you liked this project and fork it if you want to use it also make sure of LICENSE, dont use this project without giving credits or without seeing LICENSE 
Also It is fully made by me xd <br>

Date : 19 December, Time : 4:00PM IST  Added Codeshare Integration, Documentation of it will be coming soon
# Features 
Make Your own bot in 20 Seconds <br>
Easy to Setup <br>
A Special Token for Each bot which owner of the bot cannot see. (It is used to encrypt the data which you store in quick.db) <br>
Slash Commands and Message Commands Both Are Supported. (You cannot create options in slash commands as of right now) <br>
Bots are free to customize their settings. <br>
Importing Commands from codeshare (Coming Soon almost ready) <br>
Make Unlimited Commands for your bot!! <br>
CodeShare Integration Support <br>
# Getting Started
First of all Clone this Project or Download it if you wanna run it on localhost/your own computer

# Installation
After Downloading the Project, Go in Terminal/Console (If you are on local computer than Enter the Directory where the project is unzipped) and type `npm install` <br>

# Setting Up
After Installing all the node modules and packages you have to setup config.js. For doing it go to config.js and you will have something like this - <br>
```
module.exports = {
  mongourl : "", // MongoDB Url 
  callback: "", // The Callback for discord auth e.g - https://yourwebsite.com/callback
  botid: "", // Your Official botID
  botsecret: "" // Your Official Bot Client Secret
  bottoken: "" // Your Official Bot Token
}
```
So in Mongourl Give your Mongodb Url. <br> <br>
In Callback You have to give https://yourwebsite.com/callback and replace yourwebsite.com with your domain (If you are on Local Computer than replace it with localhost:8000). After Doing that Go in Your Discord Developers Portal And in That Portal Choose your Official bot and in that bot page select Oauth2 and in Redirects Click on `add another redirect` Than in the Text Area give the link which you also entered in the config.js callback. Just paste it in that text area and than save. <br>
<br>
In Bot ID Give your Official bot's client ID from the Discord Developers Portal of that bot. <br> <br>
In Bot Secret Give your Official bot's Client Secret from the Discord Developers Portal of that bot. You can find it in Oauth2 Section. <br> <br>
And the Last Give your Official bot's Token from the Discord Developers Portal of that bot. You can find it in Bot Section. <br>

# Completed
Now the Setup is completed and you just made your own Bot Designer for Discord Clone!!!!
# Problems 
Having Errors? Create Issue or contact me on Discord my tag is - DHVIT#7547
# Important 
First of all star otherwise i will eat your icecream <br>
So, After Setting up the whole Project go in https://yourwebsite.com/bots and replace yourwebsite.com with your website where you hosted it (if hosting on your pc/locally than it will be https://localhost:8000/bots)
# Example 
You can find a demo/example website at https://bcfd.dhvitop.repl.co/bots
# Creators Credits
Frontend/Html and Css are made by itsMcraft#9988  and AdiOS#1754 (my friends)
Backend/JS Things By me  



