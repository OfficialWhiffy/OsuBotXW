const Discord = require('discord.js');
const mongo = require('../mongo')
const userSchema = require ('../schemas/test-schema')
const fs = require('fs');
const Nodesu = require('nodesu');
const { token } = require('../config.json')

apiKey = process.env.apiKey

const { V1, V2, tools } = require('osu-api-extended');
const v1 = new V1(apiKey)

const api = new Nodesu.Client(apiKey,{ parseData : true});

let osr = require('node-osr')

module.exports = {
	name: 'recent',
	aliases: ['rs', 'r'],
	description: 'beatmap info',
	async execute(message, args) {

		const { member, channel, content, guild } = message
        const cache = {}

		

        let text = content

		let data = cache[member.id];

		

		if(!args[0]){

        

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
            


				
api.user
	.getRecent(data, 0, 1)
	.then(recentData => {

		if(!Object.keys(recentData).length) {
			message.channel.send("No recent play found in the last 24h")
			return;
		}
		


		const dataJSON = JSON.stringify(recentData);
		fs.writeFileSync('recent.json', dataJSON);
		const dataBuffer = fs.readFileSync('recent.json');
		const stringJSON = dataBuffer.toString();
		newString = stringJSON.replace(/^(.)|(.)$/g,'');
        fs.writeFileSync('recent.json', newString);



		function recentCheck(){
			try{
				const dataRECENT = fs.readFileSync('recent.json');
				
				return JSON.parse(dataRECENT);
				
			} catch(err) {
				message.channel.send("No recent play found in the last 24h")
				
			}
		}

		const recentDATA = recentCheck();


		var enabledmod = `${recentDATA.enabledMods}`;

		api.user
            .get(data)
            
            .then(userData => {

                const dataJSON = JSON.stringify(userData);
                fs.writeFileSync('user.json', dataJSON);
                const dataBuffer = fs.readFileSync('user.json');
                const stringJSON = dataBuffer.toString();
                const userDATA = JSON.parse(stringJSON);
        
                console.log(message.author.username + " called recent play for user " + userDATA.username);

		api.beatmaps
		.getByBeatmapId(`${recentDATA.beatmapId}`)
		.then(beatmapData =>{
		
			const dataJSON = JSON.stringify(beatmapData);
			fs.writeFileSync('data.json', dataJSON);
			const dataBuffer = fs.readFileSync('data.json');
			const stringJSON = dataBuffer.toString();
			newString = stringJSON.replace(/^(.)|(.)$/g,'');
			fs.writeFileSync('data.json', newString);
        	const beatmapDATA = JSON.parse(newString);


			var count50 = parseInt(`${recentDATA.count50}`)
			var count100 = parseInt(`${recentDATA.count100}`)
			var count300 = parseInt(`${recentDATA.count300}`)
			var countMiss = parseInt(`${recentDATA.countMiss}`)
			var total = (countMiss + count100 + count300 + count50);

			const accurracyRAW = ((50 * count50) + (100 * count100) + (300 * count300)) / (300 *(total)) *100
			const accuracy = accurracyRAW.toFixed(2); 


			

			tools.calc({ id: `${recentDATA.beatmapId}`, mods: `${recentDATA.enabledMods}`, combo: `${recentDATA.maxCombo}`, miss: `${recentDATA.countMiss}`, acc: accurracyRAW }).then(data => {
				const ppDATA = data.pp.current;
				const ppDATAFc = data.pp.fc;
				const starRating = data.stats.star.pure;
				const modData = data.mods.name
				const status = data.status.name;
				console.log(data);

		

			const rawRank = `${recentDATA.rank}`
			var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";
			var sidecolor = ('');
			switch(rawRank){

				case 'A':
					sidecolor = '#2ECC71'
				break;
				case 'B':
					sidecolor ='#3498DB'
				break;
				case 'C':
					sidecolor = '#AD1457'
				break;
				case 'D':
					sidecolor = '#E74C3C'
				break;
				case 'F':
					sidecolor = '#992D22'
				break;
				case 'S':
					sidecolor = '#F1C40F'
				break;
				case 'X':
					sidecolor = '#C27C0E'
				break;
				case 'SH':
					sidecolor = '#7F8C8D'
				break;
				case 'XH':
					sidecolor = '#BCC0C0'
				break;



			}


				if(data.pp.current === data.pp.fc) {
					var fcdata = (' with ')
				}
				else {
					fcdata = ' | **PP if FC ->** ' + ppDATAFc + ' with '
				}


				const recentEmbed = new Discord.MessageEmbed()
					.setColor(sidecolor)
					.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ' + ' + modData + ' ['+ starRating + '*' + '] ')
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
					.addFields(
						{name: '\u200b', value: '**PP:** ' + ppDATA + fcdata + accuracy + '% accuracy' , inline: true},
						{name: '\u200b' , value: '**Rank:** ' + `${recentDATA.rank}` +'  **Score:** ' + `${recentDATA.score}`},
						{name: '\u200b', value: '**Misses** ' + `${recentDATA.countMiss}` + ' ,**300** ' + `${recentDATA.count300}` + ' ,**100** ' + `${recentDATA.count100}` + ' ,**50** ' + `${recentDATA.count50}`},
						{name: '\u200b', value: '**Combo:** ' + `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}` + ' **Status:** ' + status + ' ' , inline: true})
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)

				message.channel.send(recentEmbed)
				
				})
			})
	
		})
	})
})

}}

else{

	var Udata = args[0]

	api.user
	.getRecent(Udata, 0, 1)
	.then(recentData => {

		if(!Object.keys(recentData).length) {
			message.channel.send("No recent play found in the last 24h")
			return;
		}
		


		const dataJSON = JSON.stringify(recentData);
		fs.writeFileSync('recent.json', dataJSON);
		const dataBuffer = fs.readFileSync('recent.json');
		const stringJSON = dataBuffer.toString();
		newString = stringJSON.replace(/^(.)|(.)$/g,'');
        fs.writeFileSync('recent.json', newString);



		function recentCheck(){
			try{
				const dataRECENT = fs.readFileSync('recent.json');
				
				return JSON.parse(dataRECENT);
				
			} catch(err) {
				message.channel.send("No recent play found in the last 24h")
				
			}
		}

		const recentDATA = recentCheck();


		var enabledmod = `${recentDATA.enabledMods}`;

		api.user
            .get(Udata)
            
            .then(userData => {

                const dataJSON = JSON.stringify(userData);
                fs.writeFileSync('user.json', dataJSON);
                const dataBuffer = fs.readFileSync('user.json');
                const stringJSON = dataBuffer.toString();
                const userDATA = JSON.parse(stringJSON);
        
                console.log(message.author.username + " called recent play for user " + userDATA.username);

		api.beatmaps
		.getByBeatmapId(`${recentDATA.beatmapId}`)
		.then(beatmapData =>{
		
			const dataJSON = JSON.stringify(beatmapData);
			fs.writeFileSync('data.json', dataJSON);
			const dataBuffer = fs.readFileSync('data.json');
			const stringJSON = dataBuffer.toString();
			newString = stringJSON.replace(/^(.)|(.)$/g,'');
			fs.writeFileSync('data.json', newString);
        	const beatmapDATA = JSON.parse(newString);


			var count50 = parseInt(`${recentDATA.count50}`)
			var count100 = parseInt(`${recentDATA.count100}`)
			var count300 = parseInt(`${recentDATA.count300}`)
			var countMiss = parseInt(`${recentDATA.countMiss}`)
			var total = (countMiss + count100 + count300 + count50);

			const accurracyRAW = ((50 * count50) + (100 * count100) + (300 * count300)) / (300 *(total)) *100
			const accuracy = accurracyRAW.toFixed(2); 


			

			tools.calc({ id: `${recentDATA.beatmapId}`, mods: `${recentDATA.enabledMods}`, combo: `${recentDATA.maxCombo}`, miss: `${recentDATA.countMiss}`, acc: accurracyRAW }).then(data => {
				const ppDATA = data.pp.current;
				const ppDATAFc = data.pp.fc;
				const starRating = data.stats.star.pure;
				const modData = data.mods.name
				const status = data.status.name;
				console.log(data.status.name);

				const rawRank = `${recentDATA.rank}`


				switch(rawRank){

					case 'A':
						sidecolor = '#2ECC71'
					break;
					case 'B':
						sidecolor ='#3498DB'
					break;
					case 'C':
						sidecolor = '#AD1457'
					break;
					case 'D':
						sidecolor = '#E74C3C'
					break;
					case 'F':
						sidecolor = '#992D22'
					break;
					case 'S':
						sidecolor = '#F1C40F'
					break;
					case 'X':
						sidecolor = '#C27C0E'
					break;
					case 'SH':
						sidecolor = '#7F8C8D'
					break;
					case 'XH':
						sidecolor = '#BCC0C0'
					break;
	
	
	
				}

				if(data.pp.current === data.pp.fc) {
					var fcdata = (' with ')
				}
				else {
					fcdata = ' | **PP if FC ->** ' + ppDATAFc + ' with '
				}




		var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";
		const recentEmbed = new Discord.MessageEmbed()
		.setColor(sidecolor)
		.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ' + ' + modData + ' ['+ starRating + '*' + '] ')
		.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
		.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
		.addFields(
			{name: '\u200b', value: '**PP:** ' + ppDATA + fcdata + accuracy + '% accuracy' , inline: true},
			{name: '\u200b' , value: '**Rank:** ' + `${recentDATA.rank}` +'  **Score:** ' + `${recentDATA.score}`},
			{name: '\u200b', value: '**Misses** ' + `${recentDATA.countMiss}` + ' ,**300** ' + `${recentDATA.count300}` + ' ,**100** ' + `${recentDATA.count100}` + ' ,**50** ' + `${recentDATA.count50}`},
			{name: '\u200b', value: '**Combo:** ' + `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}` + ' **Status:** ' + status + ' ' , inline: true})
		.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
		.setTimestamp()
		.setFooter('Made by Xhera & Whiffy', footerImage)

	message.channel.send(recentEmbed)


})
})



})})}}}