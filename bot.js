// fs module and youtube video  to mp3 converter and ffmpeg ->Importing
const fs = require('fs');
const mp3 = require('youtube-mp3-downloader');
const ffmpeg = require('ffmpeg-static');
const yd = new mp3({
    ffmpegPath:ffmpeg,
    outputPath:'./',
    youtubeVideoQuality:'highestaudio'
})
// youtube id module -> Importing
const youtubeId = require('get-video-id')
// telegram bot api -> Importing
const TelegramBot = require("node-telegram-bot-api");
const request = require('request');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "Welcome "+msg.from.first_name);
    bot.sendMessage(msg.chat.id,"Enter Your Youtube URL");
  });
bot.on("message",(mg)=>{
    const msg=mg.text;
    var id = youtubeId(msg)
    var ID = id.id
    if(msg!=="/start"){
        yd.download(ID,'song.mp3')
        bot.sendAudio(mg.chat.id,"./song.mp3")
    }
})