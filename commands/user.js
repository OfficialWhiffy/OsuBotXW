const Discord = require('discord.js');
const mongo = require('../mongo')
const userSchema = require ('../schemas/test-schema')
const fs = require('fs');
const Nodesu = require('nodesu');
const { apiKey } = require('../config.json');

const api = new Nodesu.Client(apiKey,{ parseData : true});

module.exports = {
	name: 'user',
	description: 'Description',
	async execute(message, args) {
		const { member, channel, content, guild } = message
        const cache = {}

        let text = content

        let data = cache[member.id]


        if (!data) {
            console.log('FETCHING FROM DATABASE')
            await mongo().then(async mongoose => {
                 try {
                    const result = await userSchema.findOne({ _id: member.id })

                    if(!result){
						message.channel.send("No user found set user using '.setuser <username or userid>' ")
						return;
					}

                    cache[member.id] = data = [result.text]
                } finally {
                    mongoose.connection.close()
                }
            })


            api.user
            .get(data)
            
            .then(data => {


                const dataJSON = JSON.stringify(data);
                fs.writeFileSync('user.json', dataJSON);
                const dataBuffer = fs.readFileSync('user.json');
                const stringJSON = dataBuffer.toString();
                const parseDATA = JSON.parse(stringJSON);
        
                console.log(message.author.username + " has called user command for account " + parseDATA.username);


                var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                const beatmapEmbed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle(`User profile for ` + `${parseDATA.username}`)
                    .setURL('https://osu.ppy.sh/u/' + `${parseDATA.id}`)
                    .setThumbnail('http://s.ppy.sh/a/' +  `${parseDATA.id}`)
                    .addFields(
                        {name: 'PP: ', value: `${parseDATA.ppRaw.toFixed(0)}`, inline: true},
                        {name: 'Accuracy : ', value: `${parseDATA.accuracy.toFixed(2)} % `, inline: true},
                        {name: 'Level ', value: `${parseDATA.level.toFixed(0)}`, inline: true},
                        {name: 'Rank' , value: `${parseDATA.ppRank}`, inline: true},
                        {name: 'Country ', value: `${parseDATA.country}`, inline: true},
                        {name: 'Country Rank ', value: `${parseDATA.ppCountryRank}`, inline: true})
                    .setTimestamp()
                    .setFooter('Made by Xhera & Whiffy', footerImage)

                message.channel.send(beatmapEmbed);

            })
            .catch(error => {
                console.log(error);
        });  
	}
    }
}