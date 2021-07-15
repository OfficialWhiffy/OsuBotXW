const mongo = require('../mongo')
const Discord = require('discord.js')
const welcomeSchema = require('../schemas/test-schema')
const fs = require('fs');
const Nodesu = require('nodesu');
const { apiKey } = require('../config')

const api = new Nodesu.Client(apiKey,{ parseData : true});

module.exports = {
	name: 'whiffy',
	description: 'Description',
	async execute(message, args) {

        const { member, channel, content, guild } = message

        const cache = {} // guildId: [ChannelId, Text]

        let text = content

        const split = text.split(' ')

        if (split.length < 2) {
            channel.send('Please provide a userid or username')
            return
        }

        split.shift()
        text = split.join(' ')

        cache[guild.id] = [channel.id, text]

        await mongo().then(async (mongoose) =>{
            try{
               await welcomeSchema.findOneAndUpdate(
               {
                   _id: guild.id
               }, 
               {
                
                    _id: guild.id,
                    channelId: channel.id,
                    text, 
               }, 
               {
                   upsert: true
               }
            )
            }   finally{
             mongoose.connection.close()
                
            }
        })

        const onJoin = async member => {
            const { guild } = member

            let data = cache[guild.id]

            if(!data) {

                console.log('FETCHING FROM DATABASE')
                await mongo().then(async (mongoose) =>{
                    try{
                        const result = await welcomeSchema.findOne({ _id: guild.id})

                        cache[guild.id] = [result.channelId, result.text]

                    } finally{
                        mongoose.connection.close()
                    }
                })
            }

            const channelId = data[0]
            const text = data[1]

            const channel = guild.channels.cache.get(channelId)
            channel.send(text)

        }

        api.user
            .get(text)
            
            .then(data => {


                const dataJSON = JSON.stringify(data);
                fs.writeFileSync('user.json', dataJSON);
                const dataBuffer = fs.readFileSync('user.json');
                const stringJSON = dataBuffer.toString();
                const parseDATA = JSON.parse(stringJSON);
        
                console.log(parseDATA.id);
                message.channel.send('Succesfully set user! Welcome, ' + parseDATA.username)


                var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                const beatmapEmbed = new Discord.MessageEmbed()
                    .setColor('#02fa62')
                    .setTitle(`User profile for ` + `${parseDATA.username}`)
                    .setURL('https://osu.ppy.sh/u/' + `${parseDATA.id}`)
                    .setThumbnail('http://s.ppy.sh/a/' +  `${parseDATA.id}`)
                    .addFields(
                        {name: 'PP: ', value: `${parseDATA.ppRaw.toFixed(0)}`, inline: true},
                        {name: 'Accuraccy : ', value: `${parseDATA.accuracy.toFixed(2)} % `, inline: true},
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