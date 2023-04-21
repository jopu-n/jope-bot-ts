const music = require("@koenie06/discord.js-music");

module.exports = {

    name: "skip",
    description: "Skips the current sound played by the music bot.",
    
    async execute(message){

        var connected = await music.isConnected({interaction: message});
        
        if (connected){
            music.skip({interaction: message});
            message.channel.send({ content: `:sunglasses: DJ Ilpo skippaa nykyisen kipaleen.` });
        } else if (!connected) {
            return message.channel.send({content: `:rage: Eihän DJ Ilpo edes soita mitään!`});
        }
    }
}