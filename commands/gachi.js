const { joinVoiceChannel,
    AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource, } = require("@discordjs/voice");
const {Client, Intents} = require("discord.js");
var fs = require('fs');
const path = require('path');


module.exports = {

    name: "gachi",
    description: "trying to make a command that plays gachimuchi sounds",

    async execute(message, args){
        try{ // Does this even do anything?
            const channel = message.member.voice.channel;

            if(!channel) return message.channel.send("Mee ny eka kanavalle hei :rage:");
            const permissions = channel.permissionsFor(message.client.user);
            if(!permissions.has("CONNECT")) return message.channel.send("Ei ol oikeuksii");
            if(!permissions.has("SPEAK")) return message.channel.send("Ei ol oikeuksii");
            
            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })
            
            const dirPath = path.resolve(__dirname, './gachi_sounds');
            var files = fs.readdirSync(dirPath);
            let chosenFile = dirPath + '\\' + files[Math.floor(Math.random() * files.length)];
            let resFile = path.resolve(__filename, chosenFile);

            let resource = createAudioResource(resFile)
            const player = createAudioPlayer();
            player.play(resource);
            connection.subscribe(player);
        } catch (error) {
            console.error(error);
        }
    }
}