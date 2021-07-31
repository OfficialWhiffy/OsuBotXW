const Discord = require('discord.js');
const mongo = require('../mongo')
const userSchema = require ('../schemas/test-schema')
const fs = require('fs');
const Nodesu = require('nodesu');
const { apiKey, token } = require('../config.json')

const apiKey = process.env.apiKey

const { V1, V2, tools } = require('osu-api-extended');
const v1 = new V1(apiKey)

const api = new Nodesu.Client(apiKey,{ parseData : true});

//const token = process.env.token

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
				console.log(data);

		

			const rawRank = `${recentDATA.rank}`
			const statusRaw  = `${beatmapDATA.approved}`
			var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";
			var sidecolor = ('');
			var Rank =('');
			var miss = "<:miss:868232869607247912>"
			var hit50 = "<:50_:868520483186933820>"
			var hit100 = "<:100_:868520483216302080>"
			var hit300 = "<:300_:868520482977235046>"

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


			switch(rawRank){

				case 'A':
					sidecolor = '#2ECC71'
					Rank = "<:A_:868515923093512262>"
				break;
				case 'B':
					sidecolor ='#3498DB'
					Rank = "<:B_:868515923638779954>"
				break;
				case 'C':
					sidecolor = '#AD1457'
					Rank = "<:C_:868226433259028530>"
				break;
				case 'D':
					sidecolor = '#E74C3C'
					Rank = "<:D_:868226432868974644>"
				break;
				case 'F':
					sidecolor = '#992D22'
					Rank = "F"
				break;
				case 'S':
					sidecolor = '#F1C40F'
					Rank = "<:S_:868226433284206712>"
				break;
				case 'X':
					sidecolor = '#C27C0E'
					Rank = "<:X_:868226433259016273>"
				break;
				case 'SH':
					sidecolor = '#7F8C8D'
					Rank = "<:SH:868226433275822170>"
				break;
				case 'XH':
					sidecolor = '#BCC0C0'
					Rank = "<:XH:868226433036714095>"
				break;



			}


				if(data.pp.current === data.pp.fc) {
					var fcdata = (' with ')
				}
				else {
					fcdata = ' **»** ' + ppDATAFc + ' with '
				}


				const recentEmbedJSON = new Discord.MessageEmbed()
					.setColor(sidecolor)
					.setTitle(status + ' ' + `${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ' + ' + modData + ' ['+ `${beatmapDATA.difficultyRating.toFixed(2)}` + '*' + '] ')
					.setDescription('**Played by [' + userDATA.username + ']**' + ' - ' + ' **Rank:** ' + Rank )
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
					.addFields(
						{name: '\u200b', value: '**PP:** ' + ppDATA + fcdata + accuracy + '%' +'  **Score:** ' + `${recentDATA.score}`, inline: false},
						{name: '\u200b', value:  miss + `:${recentDATA.countMiss}` + ' |' + hit300 + `:${recentDATA.count300}` + ' |' + hit100 + `:${recentDATA.count100}` + ' |' + hit50 + `:${recentDATA.count50}` + ' **Combo:** ' + `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true })
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)
					recentEmbedJSON.toJSON()
					const recentEmbed = JSON.stringify(recentEmbedJSON);
					fs.writeFileSync('embed.json', recentEmbed);
					const embedBuffer = fs.readFileSync('embed.json');
					const embedJSON = embedBuffer.toString();
					const embedDATA = JSON.parse(embedJSON);
					beatmapID = embedDATA.url.replace('https://osu.ppy.sh/b/', '')
					fs.writeFileSync('ID.json', beatmapID);


					console.log(beatmapID)
					

				message.channel.send(recentEmbedJSON)
				
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
				console.log(data.status.name);


				const rawRank = `${recentDATA.rank}`
			const statusRaw  = `${beatmapDATA.approved}`
			var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";
			var sidecolor = ('');
			var Rank =('');
			var miss = "<:miss:868232869607247912>"
			var hit50 = "<:50_:868520483186933820>"
			var hit100 = "<:100_:868520483216302080>"
			var hit300 = "<:300_:868520482977235046>"

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


			switch(rawRank){

				case 'A':
					sidecolor = '#2ECC71'
					Rank = "<:A_:868515923093512262>"
				break;
				case 'B':
					sidecolor ='#3498DB'
					Rank = "<:B_:868515923638779954>"
				break;
				case 'C':
					sidecolor = '#AD1457'
					Rank = "<:C_:868226433259028530>"
				break;
				case 'D':
					sidecolor = '#E74C3C'
					Rank = "<:D_:868226432868974644>"
				break;
				case 'F':
					sidecolor = '#992D22'
					Rank = "F"
				break;
				case 'S':
					sidecolor = '#F1C40F'
					Rank = "<:S_:868226433284206712>"
				break;
				case 'X':
					sidecolor = '#C27C0E'
					Rank = "<:X_:868226433259016273>"
				break;
				case 'SH':
					sidecolor = '#7F8C8D'
					Rank = "<:SH:868226433275822170>"
				break;
				case 'XH':
					sidecolor = '#BCC0C0'
					Rank = "<:XH:868226433036714095>"
				break;



			}


				if(data.pp.current === data.pp.fc) {
					var fcdata = (' with ')
				}
				else {
					fcdata = ' **»** ' + ppDATAFc + ' with '
				}


				const recentEmbedJSON = new Discord.MessageEmbed()
					.setColor(sidecolor)
					.setTitle(status + ' ' + `${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ' + ' + modData + ' ['+ `${beatmapDATA.difficultyRating.toFixed(2)}` + '*' + '] ')
					.setDescription('**Played by [' + userDATA.username + ']**' + ' - ' + ' **Rank:** ' + Rank )
					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
					.addFields(
						{name: '\u200b', value: '**PP:** ' + ppDATA + fcdata + accuracy + '%' +'  **Score:** ' + `${recentDATA.score}`, inline: false},
						{name: '\u200b', value:  miss + `:${recentDATA.countMiss}` + ' |' + hit300 + `:${recentDATA.count300}` + ' |' + hit100 + `:${recentDATA.count100}` + ' |' + hit50 + `:${recentDATA.count50}` + ' **Combo:** ' + `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}`, inline: true })
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)
					recentEmbedJSON.toJSON()
					const recentEmbed = JSON.stringify(recentEmbedJSON);
					fs.writeFileSync('embed.json', recentEmbed);
					const embedBuffer = fs.readFileSync('embed.json');
					const embedJSON = embedBuffer.toString();
					const embedDATA = JSON.parse(embedJSON);
					beatmapID = embedDATA.url.replace('https://osu.ppy.sh/b/', '')

					console.log(beatmapID)
					

				message.channel.send(recentEmbedJSON)


})
})



})})}}}