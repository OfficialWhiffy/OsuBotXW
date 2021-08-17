// Requirements for the bot to work, stuff like discord.js and some things we call things from other places in the files
const fs = require('fs');
const Discord = require('discord.js');
//const { prefix, token, osuOAuth2Key, osuClientSecret, osuClientId } = require('./config.json');
const fetch = require ('node-fetch');
const Nodesu = require('nodesu');
const mongo = require('./mongo.js')

const dotenv = require('dotenv');
dotenv.config();

apiKey = process.env.apiKey
token = process.env.token
prefix = process.env.prefix

// v KEEP THESE TWO LINES FOR THE ACTUAL BOT ^ //

const api = new Nodesu.Client(apiKey);

// Creating the client and collection for command handling
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

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

    client.user.setActivity("The circle game", {type: "PLAYING"})

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
	if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    
    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    try {
        command.execute(message, args);
    } catch (error) {

    }});

// Log in and start the bot with our Bot token that's in config.json
client.login(token);