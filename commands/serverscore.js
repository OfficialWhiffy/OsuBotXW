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
	name: 'serverscore',
    aliases: ['sc'],
	description: 'Loads all scores for a server',
	async execute(message, args) {


        const { member, channel, content, guild } = message
        var data = ''

        let text = content
        let idData = {}




                await mongo().then(async (mongoose) =>{
                    try{

						console.log('Grabbing users')
						
                        const result = await userSchema.find({
                            channelId: channel.id})

                        data = result



                    } finally{
                        
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


                if(!Object.keys(data).length) {
                    message.channel.send("No members have set this server as their main server! To do this use the `.setuser` command in this server!")
                    return;
                }

                const lenMem = data.length

                switch(lenMem){

                    case 1:

                        v1.scores({ b: idData[0], u: data[0].text, limit: 1 })
                        .then(scores => { 
                            
                
                
                            if(!Object.keys(scores).length) {
                                message.channel.send("No scores found for members in this server")
                                return;
                            }

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

                                var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                    const scoreEmbed1 = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('Scores for this server' + ' on ' + `${beatmapDATA.title}` + ` ${beatmapDATA.version}`)
                        .setURL('https://osu.ppy.sh/b/' + `${beatmapDATA.id}`)
                        .setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
                        .setDescription(`1. \`${scores[0].user.name}\` **Rank: **` + `${scores[0].rank}` + ' ➠ ' + '**PP: **' + `${scores[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores[0].score.total}` +

                        ' \n**Hits: **' + `${scores[0].hits[300]}` + ' / ' + `${scores[0].hits[100]}` + ' / ' +  `${scores[0].hits[50]}` + ' / ' + `${scores[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores[0].combo.max}` + 
                        ' \n**Score set:** ' + timeago.format(scores[0].date))
                        .setTimestamp()
                        .setFooter('Made by Xhera & Whiffy', footerImage)

                        message.channel.send(scoreEmbed1);
                        return;

                    })
                })

                        break;

                case 2:

                    v1.scores({ b: idData[0], u: data[0].text, limit: 1 })
                    .then(scores => { 

                        v1.scores({ b: idData[0], u: data[1].text, limit: 1 })
                    .then(scores1 => {

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


                            if(!Object.keys(scores).length) {
                                var sc0 = 1
                                score_0()
                                return
                            }

                            if(!Object.keys(scores1).length) {
                                var sc1 = 1
                                score_1()
                                return
                            }

                        
            
            
                       if(sc0 && sc1) {
        
                        
                            message.channel.send("No scores found for members in this server")
                            
                            return;
                        }

                            function score_0(){
                                var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                                const scoreEmbed0 = new Discord.MessageEmbed()
                                .setColor('RED')
                                .setTitle('Scores for this server' + ' on ' + `${beatmapDATA.title}` + ` ${beatmapDATA.version}`)
                                .setURL('https://osu.ppy.sh/b/' + `${beatmapDATA.id}`)
                                .setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
                                .setDescription(`1. \`${scores1[0].user.name}\` **Rank: **` + `${scores1[0].rank}` + ' ➠ ' + '**PP: **' + `${scores1[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores1[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores1[0].score.total}` +
        
                                ' \n**Hits: **' + `${scores1[0].hits[300]}` + ' / ' + `${scores1[0].hits[100]}` + ' / ' +  `${scores1[0].hits[50]}` + ' / ' + `${scores1[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores1[0].combo.max}` + 
                                ' \n**Score set:** ' + timeago.format(scores1[0].date))
                                .setTimestamp()
                                .setFooter('Made by Xhera & Whiffy', footerImage)
        
                                message.channel.send(scoreEmbed0)
                            }

                            function score_1(){
                                var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                                const scoreEmbed1 = new Discord.MessageEmbed()
                                .setColor('RED')
                                .setTitle('Scores for this server' + ' on ' + `${beatmapDATA.title}` + ` ${beatmapDATA.version}`)
                                .setURL('https://osu.ppy.sh/b/' + `${beatmapDATA.id}`)
                                .setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
                                .setDescription(`1. \`${scores[0].user.name}\` **Rank: **` + `${scores[0].rank}` + ' ➠ ' + '**PP: **' + `${scores[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores[0].score.total}` +
        
                                ' \n**Hits: **' + `${scores[0].hits[300]}` + ' / ' + `${scores[0].hits[100]}` + ' / ' +  `${scores[0].hits[50]}` + ' / ' + `${scores[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores[0].combo.max}` + 
                                ' \n**Score set:** ' + timeago.format(scores[0].date))
                                .setTimestamp()
                                .setFooter('Made by Xhera & Whiffy', footerImage)
        
                                message.channel.send(scoreEmbed1)
                            }




                            var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                            const scoreEmbed0 = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle('Scores for this server' + ' on ' + `${beatmapDATA.title}` + ` ${beatmapDATA.version}`)
                            .setURL('https://osu.ppy.sh/b/' + `${beatmapDATA.id}`)
                            .setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
                            .setDescription(`1. \`${scores1[0].user.name}\` **Rank: **` + `${scores1[0].rank}` + ' ➠ ' + '**PP: **' + `${scores1[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores1[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores1[0].score.total}` +
    
                            ' \n**Hits: **' + `${scores1[0].hits[300]}` + ' / ' + `${scores1[0].hits[100]}` + ' / ' +  `${scores1[0].hits[50]}` + ' / ' + `${scores1[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores1[0].combo.max}` + 
                            ' \n**Score set:** ' + timeago.format(scores1[0].date) +

                            `\n2. \`${scores[0].user.name}\` **Rank: **` + `${scores[0].rank}` + ' ➠ ' + '**PP: **' + `${scores[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores[0].score.total}` +
        
                                ' \n**Hits: **' + `${scores[0].hits[300]}` + ' / ' + `${scores[0].hits[100]}` + ' / ' +  `${scores[0].hits[50]}` + ' / ' + `${scores[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores[0].combo.max}` + 
                                ' \n**Score set:** ' + timeago.format(scores[0].date))
                            .setTimestamp()
                            .setFooter('Made by Xhera & Whiffy', footerImage)
    
                            message.channel.send(scoreEmbed0)


                        })

                })
            })

                    break;
            case 3:

                v1.scores({ b: idData[0], u: data[0].text, limit: 1 })
                .then(scores => { 

                    v1.scores({ b: idData[0], u: data[1].text, limit: 1 })
                .then(scores1 => {

                    v1.scores({ b: idData[0], u: data[2].text, limit: 1 })
                    .then(scores2 => {

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

                        function score_0(){
                            var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                            const scoreEmbed0 = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle('Scores for this server' + ' on ' + `${beatmapDATA.title}` + ` ${beatmapDATA.version}`)
                            .setURL('https://osu.ppy.sh/b/' + `${beatmapDATA.id}`)
                            .setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
                            .setDescription(`1. \`${scores1[0].user.name}\` **Rank: **` + `${scores1[0].rank}` + ' ➠ ' + '**PP: **' + `${scores1[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores1[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores1[0].score.total}` +
    
                            ' \n**Hits: **' + `${scores1[0].hits[300]}` + ' / ' + `${scores1[0].hits[100]}` + ' / ' +  `${scores1[0].hits[50]}` + ' / ' + `${scores1[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores1[0].combo.max}` + 
                            ' \n**Score set:** ' + timeago.format(scores1[0].date))
                            .setTimestamp()
                            .setFooter('Made by Xhera & Whiffy', footerImage)
    
                            message.channel.send(scoreEmbed0)
                        }

                        function score_1(){
                            var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                            const scoreEmbed1 = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle('Scores for this server' + ' on ' + `${beatmapDATA.title}` + ` ${beatmapDATA.version}`)
                            .setURL('https://osu.ppy.sh/b/' + `${beatmapDATA.id}`)
                            .setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
                            .setDescription(`1. \`${scores[0].user.name}\` **Rank: **` + `${scores[0].rank}` + ' ➠ ' + '**PP: **' + `${scores[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores[0].score.total}` +
    
                            ' \n**Hits: **' + `${scores[0].hits[300]}` + ' / ' + `${scores[0].hits[100]}` + ' / ' +  `${scores[0].hits[50]}` + ' / ' + `${scores[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores[0].combo.max}` + 
                            ' \n**Score set:** ' + timeago.format(scores[0].date))
                            .setTimestamp()
                            .setFooter('Made by Xhera & Whiffy', footerImage)
    
                            message.channel.send(scoreEmbed1)
                        }

                        function score_2(){
                            var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                            const scoreEmbed1 = new Discord.MessageEmbed()
                            .setColor('RED')
                            .setTitle('Scores for this server' + ' on ' + `${beatmapDATA.title}` + ` ${beatmapDATA.version}`)
                            .setURL('https://osu.ppy.sh/b/' + `${beatmapDATA.id}`)
                            .setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
                            .setDescription(`1. \`${scores2[0].user.name}\` **Rank: **` + `${scores2[0].rank}` + ' ➠ ' + '**PP: **' + `${scores2[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores2[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores2[0].score.total}` +
    
                            ' \n**Hits: **' + `${scores2[0].hits[300]}` + ' / ' + `${scores2[0].hits[100]}` + ' / ' +  `${scores2[0].hits[50]}` + ' / ' + `${scores2[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores2[0].combo.max}` + 
                            ' \n**Score set:** ' + timeago.format(scores2[0].date))
                            .setTimestamp()
                            .setFooter('Made by Xhera & Whiffy', footerImage)
    
                            message.channel.send(scoreEmbed1)
                        }

                        if(!Object.keys(scores).length) {
                            score_0()
                            return
                        }

                        if(!Object.keys(scores1).length) {
                            score_1()
                            return
                        }

                        if(!Object.keys(scores2).length) {
                            score_2()
                            return
                        }
                    
        
        
                    if(!Object.keys(scores).length && !Object.keys(scores1).length && !Object.keys(scores2).length) {
    
                    
                        message.channel.send("No scores found for members in this server")
                        
                        return;
                    }

                    else{

                        var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

                        const scoreEmbed0 = new Discord.MessageEmbed()
                        .setColor('RED')
                        .setTitle('Scores for this server' + ' on ' + `${beatmapDATA.title}` + ` ${beatmapDATA.version}`)
                        .setURL('https://osu.ppy.sh/b/' + `${beatmapDATA.id}`)
                        .setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
                        .setDescription(`1. \`${scores1[0].user.name}\` **Rank: **` + `${scores1[0].rank}` + ' ➠ ' + '**PP: **' + `${scores1[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores1[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores1[0].score.total}` +

                        ' \n**Hits: **' + `${scores1[0].hits[300]}` + ' / ' + `${scores1[0].hits[100]}` + ' / ' +  `${scores1[0].hits[50]}` + ' / ' + `${scores1[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores1[0].combo.max}` + 
                        ' \n**Score set:** ' + timeago.format(scores1[0].date) +

                        `\n2. \`${scores[0].user.name}\` **Rank: **` + `${scores[0].rank}` + ' ➠ ' + '**PP: **' + `${scores[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores[0].score.total}` +
    
                            ' \n**Hits: **' + `${scores[0].hits[300]}` + ' / ' + `${scores[0].hits[100]}` + ' / ' +  `${scores[0].hits[50]}` + ' / ' + `${scores[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores[0].combo.max}` + 
                            ' \n**Score set:** ' + timeago.format(scores[0].date) +
                            
                        `\n3. \`${scores2[0].user.name}\` **Rank: **` + `${scores2[0].rank}` + ' ➠ ' + '**PP: **' + `${scores2[0].pp}` + ' ➠ ' + '**Acc: **' + `${scores2[0].accuracy}` + '% ➠ ' + '**Score: **' + `${scores2[0].score.total}` +
    
                            ' \n**Hits: **' + `${scores2[0].hits[300]}` + ' / ' + `${scores2[0].hits[100]}` + ' / ' +  `${scores2[0].hits[50]}` + ' / ' + `${scores2[0].hits[0]}` + ' ➠ ' + ' **Max Combo:** '  + `${scores2[0].combo.max}` + 
                            ' \n**Score set:** ' + timeago.format(scores2[0].date))
                        .setTimestamp()
                        .setFooter('Made by Xhera & Whiffy', footerImage)

                        message.channel.send(scoreEmbed0)


                    }
                    })
                    })

            })
        })

                break;


                }}}





