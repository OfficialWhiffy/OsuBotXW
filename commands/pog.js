const { Channel } = require("discord.js");

module.exports = {
	name: 'pog',
	description: 'pog',
	execute(message, args) {
		
        message.channel.send("pog");
        
	},
};