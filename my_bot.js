const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);

    client.user.setActivity("YOUTUBE!", {type: "WATCHING"})

    client.guilds.forEach((guild) => {
        console.log(guild.name);
        guild.channels.forEach((channel) => {
            console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
            // General channel id : 552436435744063501
        })
    })
    let generalChannel = client.channels.get("552436435744063501")
    const attachment = new Discord.Attachment("https://www.devdungeon.com/sites/all/themes/devdungeon2/logo.png")
    generalChannel.send(attachment)

})

client.on('message', (receivedMessage) => {
    //To avoid bot responding to its own messages infinetely
    if (receivedMessage.author == client.user) {
        return
    } 
    // receivedMessage.channel.send(`Message received: ${receivedMessage.author.toString()}: ${receivedMessage.content}`)
    // receivedMessage.react("👍")
    
    // let customEmoji = receivedMessage.guild.emojis.get("557495338945216515")
    // receivedMessage.react(customEmoji)
    if (receivedMessage.content.startsWith("!")) {
        processCommand(receivedMessage)
    }

    function processCommand(receivedMessage) {
        let fullCommand = receivedMessage.content.substr(1)
        let splitCommand = fullCommand.split(" ")
        let primaryCommand = splitCommand[0]
        let arguments = splitCommand.splice(1) 
        if (primaryCommand == "help") {
            helpCommand(arguments, receivedMessage)
        } else if(primaryCommand == "multiply") {
            multiplyCommand(receivedMessage, arguments)
        } else {receivedMessage.channel.send("Unknown command. Try `!help` or `!multiply`")}
    } 
})
function multiplyCommand(receivedMessage, arguments) {
    if(arguments.length < 2) {
        receivedMessage.channel.send("Not enough arguments. Try `!multiply 2 10`")
        return
    }
    let product = 1
    arguments.forEach((value) => {
        product *= parseFloat(value)
    }) 
    receivedMessage.channel.send("The product of " + arguments + " is " + product.toString())
}

function helpCommand(arguments, receivedMessage) {
    if(arguments.length == 0) {
        receivedMessage.channel.send("I'm not sure what you need help with. Try `!help[topic]`")
    } else {
        receivedMessage.channel.send("It looks like you need help with " + arguments)
    }
} 
//https://discordapp.com/developers/applications/
bot_secret_token = "NTUyNDUwOTMxOTA0NjEwMzE1.D1_wAQ.K8NH-2kzRx48h5-xA807NQV3p6k"
client.login(bot_secret_token)
