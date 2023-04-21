const {Client, Intents} = require("discord.js");
const Discord = require("discord.js");
const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] } );
const {token} = require("./config.json");
const fs = require("fs");
const music = require('@koenie06/discord.js-music');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

const PREFIX = "!";


client.once("ready", () => {
    console.log('Ilpo online')
} );

music.event.on('playSong', (channel, songInfo) => {
	channel.send({ content: `:sunglasses: DJ Ilpo tässä! Nyt soi ***${songInfo.title}***` });
});

music.event.on('addSong', (channel, songInfo) => {
	channel.send({ content: `:sunglasses: ***${songInfo.title}*** Lisätty DJ Ilpon biisijonoon.` });
});

client.on("message", message => {

    let checkMention = message.content.split(" ")[0]
    if(checkMention == "<@769129605536940032>"){
        if ( typeof(message.content.split(" ")[1]) === 'undefined') {
            message.channel.send("Yes daddy :3");
            return;
        }
        let i = Math.floor(Math.random() * 5);
        let msgs = ["Juu :3","Ehdottomasti!","Mahdollisesti :flushed:","Ei missään tapauksessa!","Eei..."];
        message.channel.send(msgs[i]);
        return;
    }
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(" ");
    const command = args.shift().toLowerCase();

    if(command == "ilpo"){
        client.commands.get("ilpo").execute(message, args);
    }
    else if(command == "playOld" || command == "pOld"){
        client.commands.get("playOld").execute(message, args);
    }
    else if(command == "stop"){
        client.commands.get("stop").execute(message);
    }
    else if(command == "play" || command == "p"){
        client.commands.get("play").execute(message, args);
    }
    else if(command == "skip" || command == "s" || command == "seis"){
        client.commands.get("skip").execute(message);
    }
    else if(command == "gachi" || command == "g"){
        client.commands.get("gachi").execute(message);
    }
    else if(command == "leave" || command == "l"){
        client.commands.get("leave").execute(message);
    }
    else if (command == "degen"){
        client.commands.get("degen").execute(message, args);
    }
    else if (command == "commands"){
        client.commands.get("commands").execute(message, args);
    }
});

client.on('error', error => {
    console.error("The client countered an error: ", error);
});



client.login(token)