const dotenv = require('dotenv');
dotenv.config();
token = process.env.token

const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'restart',
	description: 'Restarts the bot, owners use only',
	execute(message, args) {
		if (message.author.id == 179986264982945793 || 273019019869552640) {
        try {
            message.channel.send('Restarting bot...')
            .then (msg => client.destroy())   
            .then (client.login(token))
            .then (message.channel.send ('Bot has restarted!'));
        } catch (error) {
            console.error(error);
    	    message.reply("Couldn't restart the bot");
        }
        } else {
            message.reply("You don't have permissions to execute this command!")
        }
	},
};