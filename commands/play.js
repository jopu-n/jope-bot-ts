const {Client, Intents} = require("discord.js");
const music = require("@koenie06/discord.js-music");
const ytSearch = require("yt-search");


module.exports = {

    name: "play",
    description: "Discord music player using a package by @Koenie06 in GitHub.",

    async execute(message, args){
        
        const channel = message.member.voice.channel;
        const query = args.join(" ");

        if(!channel) return message.channel.send("Mee ny eka kanavalle hei :rage:");
        const permissions = channel.permissionsFor(message.client.user);
        if(!permissions.has("CONNECT")) return message.channel.send("Ei ol oikeuksii");
        if(!permissions.has("SPEAK")) return message.channel.send("Ei ol oikeuksii");
        if(!query.length) return message.channel.send("Mul pitäs olla hakusana tai linkki...");

        console.log(query);
        try {
            music.play({
                interaction: message,
                channel: channel,
                song: query
            });
        } catch(e) {
            console.error(e);
            message.channel.send("Virhe " + e)
            message.channel.connection.destroy();
        }
    }
}