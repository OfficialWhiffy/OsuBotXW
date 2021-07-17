const Discord = require('discord.js');
const mongo = require('../mongo')
const userSchema = require ('../schemas/test-schema')
const fs = require('fs');
const Nodesu = require('nodesu');
const apiKey  = process.env.apiKey

const { V1, V2, tools } = require('osu-api-extended');

const api = new Nodesu.Client(apiKey,{ parseData : true});

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
				console.log(data.status.name);




		var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";
				if(`${recentDATA.rank}` == 'F'){
					const beatmapEmbedFailed = new Discord.MessageEmbed()
					.setColor('#992D22')
					.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
					.addFields(
						{name: 'PP: ', value: ppDATA, inline: true},
						{name: 'PP if FC: ', value: ppDATAFc, inline: true},
						{name: 'Accuracy : ', value: accuracy, inline: true},
						{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
						{name: 'Score' , value: `${recentDATA.score}`, inline: true},
						{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
						{name: '300 ', value: `${recentDATA.count300}`, inline: true},
						{name: '100 ', value: `${recentDATA.count100}`, inline: true},
						{name: '50 ', value: `${recentDATA.count50}`, inline: true},
						{name: 'Status: ', value: status, inline: true},
						{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)

				message.channel.send(beatmapEmbedFailed);

				}

				if(`${recentDATA.rank}` == 'S'){
					const beatmapEmbedS = new Discord.MessageEmbed()
					.setColor('#F1C40F')
					.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
					.addFields(
						{name: 'PP: ', value: ppDATA, inline: true},
						{name: 'PP if FC: ', value: ppDATAFc, inline: true},
						{name: 'Accuracy : ', value: accuracy, inline: true},
						{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
						{name: 'Score' , value: `${recentDATA.score}`, inline: true},
						{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
						{name: '300 ', value: `${recentDATA.count300}`, inline: true},
						{name: '100 ', value: `${recentDATA.count100}`, inline: true},
						{name: '50 ', value: `${recentDATA.count50}`, inline: true},
						{name: 'Status: ', value: status, inline: true},
						{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)

				message.channel.send(beatmapEmbedS);

				}

				if(`${recentDATA.rank}` == 'X'){
					const beatmapEmbedSS = new Discord.MessageEmbed()
					.setColor('#C27C0E')
					.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
					.addFields(
						{name: 'PP: ', value: ppDATA, inline: true},
						{name: 'PP if FC: ', value: ppDATAFc, inline: true},
						{name: 'Accuracy : ', value: accuracy, inline: true},
						{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
						{name: 'Score' , value: `${recentDATA.score}`, inline: true},
						{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
						{name: '300 ', value: `${recentDATA.count300}`, inline: true},
						{name: '100 ', value: `${recentDATA.count100}`, inline: true},
						{name: '50 ', value: `${recentDATA.count50}`, inline: true},
						{name: 'Status: ', value: status, inline: true},
						{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)

				message.channel.send(beatmapEmbedSS);

				}

				if(`${recentDATA.rank}` == 'B'){
					const beatmapEmbedB = new Discord.MessageEmbed()
					.setColor('#3498DB')
					.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
					.addFields(
						{name: 'PP: ', value: ppDATA, inline: true},
						{name: 'PP if FC: ', value: ppDATAFc, inline: true},
						{name: 'Accuracy : ', value: accuracy, inline: true},
						{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
						{name: 'Score' , value: `${recentDATA.score}`, inline: true},
						{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
						{name: '300 ', value: `${recentDATA.count300}`, inline: true},
						{name: '100 ', value: `${recentDATA.count100}`, inline: true},
						{name: '50 ', value: `${recentDATA.count50}`, inline: true},
						{name: 'Status: ', value: status, inline: true},
						{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)

				message.channel.send(beatmapEmbedB);

				}
				if(`${recentDATA.rank}` == 'C'){
		const beatmapEmbedC = new Discord.MessageEmbed()
			.setColor('#02fa62')
			.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
			.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
			.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
			.addFields(
				{name: 'PP: ', value: ppDATA, inline: true},
				{name: 'PP if FC: ', value: ppDATAFc, inline: true},
				{name: 'Accuracy : ', value: accuracy, inline: true},
				{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
				{name: 'Score' , value: `${recentDATA.score}`, inline: true},
				{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
				{name: '300 ', value: `${recentDATA.count300}`, inline: true},
				{name: '100 ', value: `${recentDATA.count100}`, inline: true},
				{name: '50 ', value: `${recentDATA.count50}`, inline: true},
				{name: 'Status: ', value: status, inline: true},
				{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
			.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
			.setTimestamp()
			.setFooter('Made by Xhera & Whiffy', footerImage)

		message.channel.send(beatmapEmbedC);
			}
			if(`${recentDATA.rank}` == 'D'){
				const beatmapEmbedB = new Discord.MessageEmbed()
				.setColor('#E74C3C')
				.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
				.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
				.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
				.addFields(
					{name: 'PP: ', value: ppDATA, inline: true},
					{name: 'PP if FC: ', value: ppDATAFc, inline: true},
					{name: 'Accuracy : ', value: accuracy, inline: true},
					{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
					{name: 'Score' , value: `${recentDATA.score}`, inline: true},
					{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
					{name: '300 ', value: `${recentDATA.count300}`, inline: true},
					{name: '100 ', value: `${recentDATA.count100}`, inline: true},
					{name: '50 ', value: `${recentDATA.count50}`, inline: true},
					{name: 'Status: ', value: status, inline: true},
					{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
				.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
				.setTimestamp()
				.setFooter('Made by Xhera & Whiffy', footerImage)

			message.channel.send(beatmapEmbedB);
				}
				else{
				const beatmapEmbedC = new Discord.MessageEmbed()
			.setColor('#02fa62')
			.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
			.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
			.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
			.addFields(
				{name: 'PP: ', value: ppDATA, inline: true},
				{name: 'PP if FC: ', value: ppDATAFc, inline: true},
				{name: 'Accuracy : ', value: accuracy, inline: true},
				{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
				{name: 'Score' , value: `${recentDATA.score}`, inline: true},
				{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
				{name: '300 ', value: `${recentDATA.count300}`, inline: true},
				{name: '100 ', value: `${recentDATA.count100}`, inline: true},
				{name: '50 ', value: `${recentDATA.count50}`, inline: true},
				{name: 'Status: ', value: status, inline: true},
				{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
			.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
			.setTimestamp()
			.setFooter('Made by Xhera & Whiffy', footerImage)
				}
				if(`${recentDATA.rank}` == 'SH'){
					const beatmapEmbedB = new Discord.MessageEmbed()
					.setColor('#BCC0C0')
					.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
					.addFields(
						{name: 'PP: ', value: ppDATA, inline: true},
						{name: 'PP if FC: ', value: ppDATAFc, inline: true},
						{name: 'Accuracy : ', value: accuracy, inline: true},
						{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
						{name: 'Score' , value: `${recentDATA.score}`, inline: true},
						{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
						{name: '300 ', value: `${recentDATA.count300}`, inline: true},
						{name: '100 ', value: `${recentDATA.count100}`, inline: true},
						{name: '50 ', value: `${recentDATA.count50}`, inline: true},
						{name: 'Status: ', value: status, inline: true},
						{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)
	
				message.channel.send(beatmapEmbedB);
					}
				
				
				

				
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




		var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";
				if(`${recentDATA.rank}` == 'F'){
					const beatmapEmbedFailed = new Discord.MessageEmbed()
					.setColor('#992D22')
					.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
					.addFields(
						{name: 'PP: ', value: ppDATA, inline: true},
						{name: 'PP if FC: ', value: ppDATAFc, inline: true},
						{name: 'Accuracy : ', value: accuracy, inline: true},
						{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
						{name: 'Score' , value: `${recentDATA.score}`, inline: true},
						{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
						{name: '300 ', value: `${recentDATA.count300}`, inline: true},
						{name: '100 ', value: `${recentDATA.count100}`, inline: true},
						{name: '50 ', value: `${recentDATA.count50}`, inline: true},
						{name: 'Status: ', value: status, inline: true},
						{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)

				message.channel.send(beatmapEmbedFailed);

				}

				if(`${recentDATA.rank}` == 'S'){
					const beatmapEmbedS = new Discord.MessageEmbed()
					.setColor('#F1C40F')
					.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
					.addFields(
						{name: 'PP: ', value: ppDATA, inline: true},
						{name: 'PP if FC: ', value: ppDATAFc, inline: true},
						{name: 'Accuracy : ', value: accuracy, inline: true},
						{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
						{name: 'Score' , value: `${recentDATA.score}`, inline: true},
						{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
						{name: '300 ', value: `${recentDATA.count300}`, inline: true},
						{name: '100 ', value: `${recentDATA.count100}`, inline: true},
						{name: '50 ', value: `${recentDATA.count50}`, inline: true},
						{name: 'Status: ', value: status, inline: true},
						{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)

				message.channel.send(beatmapEmbedS);

				}

				if(`${recentDATA.rank}` == 'X'){
					const beatmapEmbedSS = new Discord.MessageEmbed()
					.setColor('#C27C0E')
					.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
					.addFields(
						{name: 'PP: ', value: ppDATA, inline: true},
						{name: 'PP if FC: ', value: ppDATAFc, inline: true},
						{name: 'Accuracy : ', value: accuracy, inline: true},
						{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
						{name: 'Score' , value: `${recentDATA.score}`, inline: true},
						{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
						{name: '300 ', value: `${recentDATA.count300}`, inline: true},
						{name: '100 ', value: `${recentDATA.count100}`, inline: true},
						{name: '50 ', value: `${recentDATA.count50}`, inline: true},
						{name: 'Status: ', value: status, inline: true},
						{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)

				message.channel.send(beatmapEmbedSS);

				}

				if(`${recentDATA.rank}` == 'B'){
					const beatmapEmbedB = new Discord.MessageEmbed()
					.setColor('#3498DB')
					.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
					.addFields(
						{name: 'PP: ', value: ppDATA, inline: true},
						{name: 'PP if FC: ', value: ppDATAFc, inline: true},
						{name: 'Accuracy : ', value: accuracy, inline: true},
						{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
						{name: 'Score' , value: `${recentDATA.score}`, inline: true},
						{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
						{name: '300 ', value: `${recentDATA.count300}`, inline: true},
						{name: '100 ', value: `${recentDATA.count100}`, inline: true},
						{name: '50 ', value: `${recentDATA.count50}`, inline: true},
						{name: 'Status: ', value: status, inline: true},
						{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)

				message.channel.send(beatmapEmbedB);

				}
				if(`${recentDATA.rank}` == 'C'){
		const beatmapEmbedC = new Discord.MessageEmbed()
			.setColor('#02fa62')
			.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
			.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
			.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
			.addFields(
				{name: 'PP: ', value: ppDATA, inline: true},
				{name: 'PP if FC: ', value: ppDATAFc, inline: true},
				{name: 'Accuracy : ', value: accuracy, inline: true},
				{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
				{name: 'Score' , value: `${recentDATA.score}`, inline: true},
				{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
				{name: '300 ', value: `${recentDATA.count300}`, inline: true},
				{name: '100 ', value: `${recentDATA.count100}`, inline: true},
				{name: '50 ', value: `${recentDATA.count50}`, inline: true},
				{name: 'Status: ', value: status, inline: true},
				{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
			.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
			.setTimestamp()
			.setFooter('Made by Xhera & Whiffy', footerImage)

		message.channel.send(beatmapEmbedC);
			}
			if(`${recentDATA.rank}` == 'D'){
				const beatmapEmbedB = new Discord.MessageEmbed()
				.setColor('#E74C3C')
				.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
				.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
				.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
				.addFields(
					{name: 'PP: ', value: ppDATA, inline: true},
					{name: 'PP if FC: ', value: ppDATAFc, inline: true},
					{name: 'Accuracy : ', value: accuracy, inline: true},
					{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
					{name: 'Score' , value: `${recentDATA.score}`, inline: true},
					{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
					{name: '300 ', value: `${recentDATA.count300}`, inline: true},
					{name: '100 ', value: `${recentDATA.count100}`, inline: true},
					{name: '50 ', value: `${recentDATA.count50}`, inline: true},
					{name: 'Status: ', value: status, inline: true},
					{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
				.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
				.setTimestamp()
				.setFooter('Made by Xhera & Whiffy', footerImage)

			message.channel.send(beatmapEmbedB);
				}
				else{
				const beatmapEmbedC = new Discord.MessageEmbed()
			.setColor('#02fa62')
			.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
			.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
			.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
			.addFields(
				{name: 'PP: ', value: ppDATA, inline: true},
				{name: 'PP if FC: ', value: ppDATAFc, inline: true},
				{name: 'Accuracy : ', value: accuracy, inline: true},
				{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
				{name: 'Score' , value: `${recentDATA.score}`, inline: true},
				{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
				{name: '300 ', value: `${recentDATA.count300}`, inline: true},
				{name: '100 ', value: `${recentDATA.count100}`, inline: true},
				{name: '50 ', value: `${recentDATA.count50}`, inline: true},
				{name: 'Status: ', value: status, inline: true},
				{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
			.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
			.setTimestamp()
			.setFooter('Made by Xhera & Whiffy', footerImage)
				}
				if(`${recentDATA.rank}` == 'SH'){
					const beatmapEmbedB = new Discord.MessageEmbed()
					.setColor('#BCC0C0')
					.setTitle(`${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ` Played by ` + `${userDATA.username}` + ' + ' + modData + ' ['+ starRating + '*' + '] ')
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://s.ppy.sh/a/' +  `${recentDATA.userId}`)
					.addFields(
						{name: 'PP: ', value: ppDATA, inline: true},
						{name: 'PP if FC: ', value: ppDATAFc, inline: true},
						{name: 'Accuracy : ', value: accuracy, inline: true},
						{name: 'Rank ', value: `${recentDATA.rank}`, inline: true},
						{name: 'Score' , value: `${recentDATA.score}`, inline: true},
						{name: 'Misses ', value: `${recentDATA.countMiss}`, inline: true},
						{name: '300 ', value: `${recentDATA.count300}`, inline: true},
						{name: '100 ', value: `${recentDATA.count100}`, inline: true},
						{name: '50 ', value: `${recentDATA.count50}`, inline: true},
						{name: 'Status: ', value: status, inline: true},
						{name: 'Combo: ', value: `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true})
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)
	
				message.channel.send(beatmapEmbedB);
					}


})
})



})})}}}