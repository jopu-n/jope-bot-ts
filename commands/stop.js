const music = require("@koenie06/discord.js-music");

module.exports = {

    name: "stop",
    description: "Stops the sound played by the music bot.",
    
    async execute(message){

        var connected = await music.isConnected({interaction: message});
        
        if (connected){
            music.stop({interaction: message});
            message.channel.send({ content: `:sunglasses: DJ Ilpoa ei tarvita enää.` });
        } else if (!connected) {
            return message.channel.send({content: `:rage: Eihän DJ Ilpo edes soita mitään!`});
        }
    }
}