const Nodesu = require('nodesu');
const Discord = require('discord.js');
const fs = require('fs');

const  apiKey  = process.env.apiKey

const api = new Nodesu.Client(apiKey,{ parseData : true});
// ... see docs/Modules:Components - typical usage = api.<component>.<function>();
// most functions return Promise objects.

// eg: get beatmap data

module.exports = {
	name: 'beatmap',
	description: 'look up a beatmap',
	async execute(message, args) {

        api.beatmaps
        .getByBeatmapId('2502505')
        .then(data => {


        const dataJSON = JSON.stringify(data);
        fs.writeFileSync('data.json', dataJSON);
        const dataBuffer = fs.readFileSync('data.json');
        const stringJSON = dataBuffer.toString();
        newString = stringJSON.replace(/^(.)|(.)$/g,'');
        fs.writeFileSync('data.json', newString);
        const parseDATA = JSON.parse(newString);

        console.log(parseDATA.id);
        
            
        var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";

        const beatmapEmbed = new Discord.MessageEmbed()
            .setColor('#02fa62')
            .setTitle(`${parseDATA.title}` + ' - ' + `${parseDATA.artist}` + ' By ' + `${parseDATA.creator}`)
            .setURL('https://osu.ppy.sh/b/' + `${parseDATA.id}`)
            .addFields({name: 'Aritist ', value: `${parseDATA.artist}`})
            .addFields({ name: '\u200B', value: '\u200B' })
            .addFields(
                {name: 'Stars: ', value: `${parseDATA.difficultyRating.toFixed(2)}`, inline: true},
                {name: 'BPM: ', value: `${parseDATA.bpm}`, inline: true},
                {name: 'AR ', value: `${parseDATA.diffApproach}`, inline: true},
                {name: 'CS ' , value: `${parseDATA.diffSize}`, inline: true},
                {name: 'OD ', value: `${parseDATA.diffOverall}`, inline: true},
                {name: 'HP ', value: `${parseDATA.diffDrain}`, inline: true})
            .setImage('https://assets.ppy.sh/beatmaps/' +  `${parseDATA.setId}` + '/covers/cover.jpg')
            .setTimestamp()
            .setFooter('Made by Xhera & Whiffy', footerImage)

        message.channel.send(beatmapEmbed);
        })

	}

};