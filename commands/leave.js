const { joinVoiceChannel,
    AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource, } = require("@discordjs/voice");
const {Client, Intents} = require("discord.js");

module.exports = {

    name: "leave",
    description: "makes the bot leave a voice channel",

    async execute(message){
        try{
            const connection = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })

            if(connection){
                connection.destroy();
                message.channel.send("Ilpo lähtee nyt.");
            }
            else {message.channel.send("Ilpo ei ole millään kanavalla.")}
        } catch(err){
            console.error(err);
            message.channel.send("Tuli virhe mut ei haittaa koska jope on hyvä koodari \n" + err )
        }
    }
}