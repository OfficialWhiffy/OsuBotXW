const axios = require('axios');
const { osuOAuth2Key, osuClientSecret, osuClientId } = require('../config.json');
// var mods = require('../useful data/mods.js')

module.exports = {
	name: 'test69',
	description: 'Description',
	execute(message, args) {

        fs.writeFileSync('recent.json', newString);
        const recentDATA = JSON.parse(newString);

		if (isNaN(args)) {
			message.channel.send("not a number!");
		} else if (args > 2147483647) {
			console.log("ERROR: Stack Overflow!")
		} else { 
			message.channel.send("number!")
			// message.channel.send('mod value: '+ recentDATA.enabledMods)
			// message.channel.send(enabledMods & mods)
		}
	},
};