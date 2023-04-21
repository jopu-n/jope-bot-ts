const { joinVoiceChannel,
    AudioPlayerStatus,
	StreamType,
	createAudioPlayer,
	createAudioResource, } = require("@discordjs/voice");
const ytSearch= require("yt-search");
const ytdl = require("ytdl-core");


module.exports = {

    name: "playOld",
    description: "Hopefully plays a YouTube video. No longer in use, still exists for references.",

    async execute(message, args){
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("Mee ny eka kanavalle hei :rage:");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has("CONNECT")) return message.channel.send("Ei ol oikeuksii");
        if(!permissions.has("SPEAK")) return message.channel.send("Ei ol oikeuksii");
        if(!args.length) return message.channel.send("Mul pitäs olla hakusana tai linkki...");

        const connection = await joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return(videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(" "));

        if(video){
            const stream = ytdl(video.url, {filter: "audioonly"});
            const resource = createAudioResource(stream, {inputType: StreamType.Arbitrary});
            const player = createAudioPlayer();

            player.play(resource);
            connection.subscribe(player);
            
            await message.channel.send(`:sunglasses: DJ Ilpo tässä! Nyt soi ***${video.title}***`);
            
            await player.on('error', error => {
                console.error(`Error: ${error.message} with resource ${error.resource.metadata}`);
            });

            player.on(AudioPlayerStatus.Idle, () => connection.destroy());
        } else { 
            message.channel.send("Nyt ei kyllä löytynyt videoita")
        }
    }
}