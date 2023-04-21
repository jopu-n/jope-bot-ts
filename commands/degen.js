module.exports = {

    name: "degen",
    description: "how degenerate is the user?",

    execute(message, args){
        let num = Math.floor(Math.random() * 100)
        message.channel.send(`${message.author.username} degen level is ${num}%! Be proud of yourself`);
    }
}