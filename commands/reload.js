module.exports = {
	name: 'reload',
    description: 'Reloads a command',
    cooldown: 5,
	execute(message, args) {
        if (message.author.id == 179986264982945793 || 273019019869552640) {
			if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
        	    const commandName = args[0].toLowerCase();
        	    const command = message.client.commands.get(commandName)
	    	        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        	if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

        	delete require.cache[require.resolve(`./${command.name}.js`)];
        	try {
        	    const newCommand = require(`./${command.name}.js`);
        	    message.client.commands.set(newCommand.name, newCommand);
        	} catch (error) {
        	    console.error(error);
        	    message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        	}
        	message.channel.send(`Command \`${command.name}\` was reloaded!`);
    	} else {
        	message.reply ("You don't have permission to execute this command!")
    	}
	},
};