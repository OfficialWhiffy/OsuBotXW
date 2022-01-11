const { format } = require('timeago.js')

const Discord = require('discord.js');
const mongo = require('../mongo')
const userSchema = require ('../schemas/user-schema')
const fs = require('fs');
const Nodesu = require('nodesu');
//const { apiKey, token } = require('../config.json')
const osu = require('node-osu');
const timeago = require('timeago.js')
const scoresSchema = require("../schemas/score-schema")
const dotenv = require('dotenv');
dotenv.config();


const apiKey = process.env.apiKey

const { V1, V2, tools } = require('osu-api-extended');
const v1 = new V1(apiKey)

const api = new Nodesu.Client(apiKey,{ parseData : true});

const osuApi = new osu.Api(apiKey, {
	// baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
	notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
	completeScores: true, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
	parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
});

const token = process.env.token

let osr = require('node-osr');
const { parse } = require('path');

module.exports = {
	name: 'scores',
    aliases: ['c', 'sc'],
	description: 'Loads all scores for a given map',
	async execute(message, args) {


        const { member, channel, content, guild } = message
        const cache = {}

        let text = content

        let data = cache[member.id]

        let idData = {}


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


                await mongo().then(async (mongoose) =>{
                    try{

						console.log('Grabbing BeatmapId')
						
                        const result = await scoresSchema.findOne({channelId: channel.id})

                        
                        

                        idData = [result.beatmapIDScore]



                    } finally{
                        
                        mongoose.connection.close()
                    }
                        
                })


            console.log(parseInt(idData[0]))



	



        v1.scores({ b: idData[0], u: `${data}`, limit: 3 })
        .then(scores => { 
            


            if(!Object.keys(scores).length) {
                message.channel.send("No scores found")
                return;
            }
            console.log(scores)
            format(scores[0].date)

            const len = scores.length
            console.log(len)
        

        api.beatmaps
		.getByBeatmapId(idData[0])
		.then(beatmapData =>{
		
			const dataJSON = JSON.stringify(beatmapData);
			fs.writeFileSync('data.json', dataJSON);
			const dataBuffer = fs.readFileSync('data.json');
			const stringJSON = dataBuffer.toString();
			newString = stringJSON.replace(/^(.)|(.)$/g,'');
			fs.writeFileSync('data.json', newString);
        	const beatmapDATA = JSON.parse(newString);




            switch(len){

                case 1:

                    var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                    const scoreEmbed1 = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('Scores for ' + `${scores[0].user.name}` + ' on ' + `${beatmapDATA.title}` + ` ${beatmapDATA.version}`)
                        .setURL('https://osu.ppy.sh/b/' + `${beatmapDATA.id}`)
                        .setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
                        .setDescription(`1. \`${scores[0].mods.name}\` **Rank: **` + `${scores[0].rank}` + ' ➠ ' + '**PP: **' + `${scores[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores[0].score.total}` +

                        ' \n**Hits: **' + `${scores[0].hits[300]}` + ' / ' + `${scores[0].hits[100]}` + ' / ' +  `${scores[0].hits[50]}` + ' / ' + `${scores[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores[0].combo.max}` + 
                        ' \n**Score set:** ' + timeago.format(scores[0].date))
                        .setTimestamp()
                        .setFooter('Made by Xhera & Whiffy', footerImage)

                        message.channel.send(scoreEmbed1);

                break;
                case 2:

                var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                const scoreEmbed2 = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('Scores for ' + `${scores[0].user.name}` + ' on ' + `${beatmapDATA.title}` + ` ${beatmapDATA.version}`)
                    .setURL('https://osu.ppy.sh/b/' + `${beatmapDATA.id}`)
                    .setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
                    .setDescription(`1. \`${scores[0].mods.name}\` **Rank: **` + `${scores[0].rank}` + ' ➠ ' + '**PP: **' + `${scores[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores[0].score.total}` +

                    ' \n**Hits: **' + `${scores[0].hits[300]}` + ' / ' + `${scores[0].hits[100]}` + ' / ' +  `${scores[0].hits[50]}` + ' / ' + `${scores[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores[0].combo.max}` + 
                    ' \n**Score set:** ' + timeago.format(scores[0].date) +
                    ' \n' + 
                    ` \n2. \`${scores[1].mods.name}\` **Rank: **` + `${scores[1].rank}` + ' ➠ ' + '**PP: **' + `${scores[1].pp}` + ' ➠ ' + '**Acc: **' + `${scores[1].accuracy}` + '% ➠ ' + '**Score: **' + `${scores[1].score.total}` +
                    ' \n' +

                    ' \n**Hits: **' + `${scores[1].hits[300]}` + ' / ' + `${scores[1].hits[100]}` + ' / ' +  `${scores[1].hits[50]}` + ' / ' + `${scores[1].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores[1].combo.max}` + 
                    ' \n**Score set:** ' + timeago.format(scores[1].date))
                    .setTimestamp()
                    .setFooter('Made by Xhera & Whiffy', footerImage)

                    message.channel.send(scoreEmbed2);

                break;

                case 3:
                var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                const scoreEmbed3 = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTitle('Scores for ' + `${scores[0].user.name}` + ' on ' + `${beatmapDATA.title}` + ` ${beatmapDATA.version}`)
                    .setURL('https://osu.ppy.sh/b/' + `${beatmapDATA.id}`)
                    .setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
                    .setDescription(`1. \`${scores[0].mods.name}\` **Rank: **` + `${scores[0].rank}` + ' ➠ ' + '**PP: **' + `${scores[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores[0].score.total}` +

                    ' \n**Hits: **' + `${scores[0].hits[300]}` + ' / ' + `${scores[0].hits[100]}` + ' / ' +  `${scores[0].hits[50]}` + ' / ' + `${scores[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores[0].combo.max}` + 
                    ' \n**Score set:** ' + timeago.format(scores[0].date) +
                    ' \n' + 

                    ` \n2. \`${scores[1].mods.name}\` **Rank: **` + `${scores[1].rank}` + ' ➠ ' + '**PP: **' + `${scores[1].pp}` + ' ➠ ' + '**Acc: **' + `${scores[1].accuracy}` + '% ➠ ' + '**Score: **' + `${scores[1].score.total}` +

                    ' \n**Hits: **' + `${scores[1].hits[300]}` + ' / ' + `${scores[1].hits[100]}` + ' / ' +  `${scores[1].hits[50]}` + ' / ' + `${scores[1].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores[1].combo.max}` + 
                    ' \n**Score set:** ' + timeago.format(scores[1].date) +

                    ' \n' +

                    ` \n3. \`${scores[2].mods.name}\` **Rank: **` + `${scores[2].rank}` + ' ➠ ' + '**PP: **' + `${scores[2].pp}` + ' ➠ ' + '**Acc: **' + `${scores[2].accuracy}` + '% ➠ ' + '**Score: **' + `${scores[2].score.total}` +

                    ' \n**Hits: **' + `${scores[2].hits[300]}` + ' / ' + `${scores[2].hits[100]}` + ' / ' +  `${scores[2].hits[50]}` + ' / ' + `${scores[2].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores[2].combo.max}` + 
                    ' \n**Score set:** ' + timeago.format(scores[2].date))
                    .setTimestamp()
                    .setFooter('Made by Xhera & Whiffy', footerImage)

                    message.channel.send(scoreEmbed3);



                    
            }

        })
    })

     
    }
    }
}