const Nodesu = require('nodesu');
const Discord = require('discord.js');
const fs = require('fs');

//const { apiKey } = require('../config')

const apiKey = process.env.apiKey

const { V1, V2, tools } = require('osu-api-extended');
const v1 = new V1(apiKey)

const api = new Nodesu.Client(apiKey,{ parseData : true});

//const token = process.env.token

module.exports = {
	name: 'beatmap',
    aliases: ['m', 'map'],
	description: 'look up a beatmap',
	async execute(message, args) {

        const IDraw = fs.readFileSync('ID.json')
        

        api.beatmaps
        .getByBeatmapId(`${IDraw}`)
        .then(data => {


        const dataJSON = JSON.stringify(data);
        fs.writeFileSync('mapdata.json', dataJSON);
        const dataBuffer = fs.readFileSync('data.json');
        const stringJSON = dataBuffer.toString();
        const parseDATA = JSON.parse(stringJSON);



        const statusRaw  = `${parseDATA.approved}`

        

			switch (statusRaw) {

				case '1':
					status = "<:Ranked:866411450285031434>"
					break;
				case '4':
					status = "<:Loved:866411436795101245>"
					break;
				case '2':
					status = "<:Approved:866411416156110858>"
					break;
				default:
					status = ''
					break;

			}

        
            
        var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

        const beatmapEmbed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(status + ' ' + `${parseDATA.title}` + ' [' + `${parseDATA.version}` + '] ')
            .setDescription('**Star Difficulty**: ' + `**${parseDATA.difficultyRating.toFixed(2)}**` + '✰')
            .setURL('https://osu.ppy.sh/b/' + `${parseDATA.beatmapId}`)
            .setThumbnail('https://b.ppy.sh/thumb/' +  `${parseDATA.setId}` + 'l.jpg')
            .addFields(
                {name: '\u200b', value: '**BPM: **' + `${parseDATA.bpm}` + ' ➠ ' + '**Length: **' + `${parseDATA.totalLength}s` + ' ➠ ' + '**Creator: **' + `${parseDATA.creator}`},
                {name: '\u200b', value: '**CS:**' + `${parseDATA.diffSize}` + ' ➠ ' + '**AR:**' + `${parseDATA.diffApproach}` + ' ➠ ' + '**OD:**' + `${parseDATA.diffOverall}` + ' ➠ ' + '**HP:**' + `${parseDATA.diffDrain}` + ' ➠ ' + ' **Combo:** '  + `${parseDATA.maxCombo}`, inline: true })
            .setTimestamp()
            .setFooter('Made by Xhera & Whiffy', footerImage)

        message.channel.send(beatmapEmbed);
        })
        
    }
};