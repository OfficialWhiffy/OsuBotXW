const { token } = require('../config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	name: 'restart',
	description: 'Restarts the bot, owners use only',
	execute(message, args) {
		
        try {
            message.channel.send('Restarting bot...')
            .then (msg => client.destroy())   
            .then (client.login(token))
            .then (message.channel.send ('Bot has restarted!'));
        } catch (error) {
            console.error(error);
    	    message.reply("Couldn't restart the bot");
        }

	},
};