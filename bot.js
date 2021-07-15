// Requirements for the bot to work, stuff like discord.js and some things we call things from other places in the files
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, osuOAuth2Key, osuClientSecret, osuClientId } = require('./config.json');
const fetch = require ('node-fetch');
const Nodesu = require('nodesu');
const mongo = require('./mongo.js')

const token = process.env.token

const api = new Nodesu.Client('d2862f44a1269fa8a28a26e9bfa62b94a6ef3317');

// Creating the client and collection for command handling
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Reads the commands folder and finds all files ending with .js (only our command files)
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// Set a new item in the Collection with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// When the bot goes live, it does all these things
client.once('ready', async () => {
    console.log('Bot is Online!');

    client.user.setActivity("poggers", {type: "PLAYING"})

    await mongo().then((mongoose => {
        try {
            console.log('Connected to mongo!')
        } finally {
            mongoose.connection.close()
        }
    }))
})

// Whenever a message is sent in a channel the bot has permission to read in,
// this happens
client.on('message', message => {
    // console.log(message.author, "Message:", message.content);

    // Checks if the message came from a bot, if it did then it stops the command being executed
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Transforms the commands being sent to all lowercase to make sure it catches everything (i think? idk lol)
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // If no command is sent, stop running
    if (!client.commands.has(command)) return;

    // Try to grab the .js command file from the commands folder,
    try {
    	client.commands.get(command).execute(message, args);
    // If it fails, the bot will simply state there was an error and then keep running normally
    } catch (error) {
    	console.error(error);
    	message.reply('there was an error trying to execute that command!');
    }

})

// Log in and start the bot with our Bot token that's in config.json
client.login(token);

