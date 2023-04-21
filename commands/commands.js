module.exports = {

    name: "commands",
    description: "A list of different commands",

    execute(message, args){
        message.channel.send("!degen / !gachi(!g) / !ilpo / !leave(!l) / !play(!p) / skip(!s) / !stop ");
    }
}