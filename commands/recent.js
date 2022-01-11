const Discord = require('discord.js');
const mongo = require('../mongo')
const userSchema = require ('../schemas/user-schema')
const fs = require('fs');
const Nodesu = require('nodesu');
//const { apiKey, token } = require('../config.json')
const scoresSchema = require("../schemas/score-schema")
const client = new Discord.Client();
const oj = require('ojsama');
const curl = require('curl');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.apiKey

const { V1, V2, tools } = require('osu-api-extended');
const v1 = new V1(apiKey)

const api = new Nodesu.Client(apiKey,{ parseData : true});

const token = process.env.token

let osr = require('node-osr');
const scoreSchema = require('../schemas/score-schema');

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
					console.log(result)

                    cache[member.id] = data = [result.text]
					
                } finally {
					mongoose.connection.close() 
                }

				console.log(data)
            


				
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
				console.log(userData)

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
			var hit50 = "<:50_:878033880844746782>"
			var hit100 = "<:100_:878032224505700372>"
			var hit300 = "<:300_:878032224363094017>"

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
					Rank = "<:C_:868515923357753354>"
				break;
				case 'D':
					sidecolor = '#E74C3C'
					Rank = "<:D_:868515923315810364>"
				break;
				case 'F':
					sidecolor = '#992D22'
					Rank = "F"
				break;
				case 'S':
					sidecolor = '#F1C40F'
					Rank = "<:S_:868515923823329280>"
				break;
				case 'X':
					sidecolor = '#C27C0E'
					Rank = "<:X_:868226433259016273>"
				break;
				case 'SH':
					sidecolor = '#7F8C8D'
					Rank = "<:SH:868515923936563261>"
				break;
				case 'XH':
					sidecolor = '#BCC0C0'
					Rank = "<:XH:868515923781369898>"
				break;



			}

				if(data.pp.current === data.pp.fc) {
					var fcdata = (' with ')
				}
				else {
					fcdata = ' **»** ' + ppDATAFc + 'PP with '
				}



				curl.get(`https://osu.ppy.sh/osu/${recentDATA.beatmapId}`, async function(err, response, body) {
				mods = oj.modbits.from_string(data.mods.name);
				combo = parseInt(recentDATA.maxCombo);
				nmiss = parseInt(recentDATA.countMiss);

				

				const parser = new oj.parser().feed(body);

				const pMap = parser.map;

				const stars = new oj.diff().calc({ map: pMap, mods: mods });
				const star = stars.toString().split(' ');
				console.log(star[0])

				const hitobj = [];



				const yhit300 = count300;
				const yhit100 = count100;
				const yhit50 = count50;
				const yhitmiss = countMiss;
				const totalhits = yhit300 + yhit100 + yhit50 + yhitmiss;

				const numobj = totalhits - 1;

				const num = pMap.objects.length;

				pMap.objects.forEach(obj => {
					hitobj.push(obj.time);
				});

				const timing = hitobj[num - 1] - hitobj[0];
				const point = hitobj[numobj] - hitobj[0];

				const mapCompletion = (point / timing) * 100;
	
					console.log(mapCompletion.toFixed(2))




                const connectToMongoDB = async () =>{
                await mongo().then(async (mongoose) =>{
                    try{

						console.log('Saving ID')
                        const scoresID = {
							beatmapIDScore: `${recentDATA.beatmapId}`,
							channelId: channel.id
						}

						if(!scoresID){
							message.channel.send("Data couldn't be saved")
							return;
						}

						await scoresSchema.findOneAndUpdate({channelId: channel.id}, {beatmapIDScore: recentDATA.beatmapId}, {upsert: true})



                    } finally{
                        mongoose.connection.close()
                    }
                })
			}

			connectToMongoDB()



			if(rawRank === 'F'){

				const recentEmbedJSON = new Discord.MessageEmbed()
					.setAuthor(`Recent play for: ${userDATA.username}`, `http://a.ppy.sh/${userDATA.id}`, `https://osu.ppy.sh/u/${userDATA.id}`)
					.setColor(sidecolor)
					.setTitle('')
					
					.setDescription(status + '** ' + `${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ' + ' + modData + ' ['+ star[0] + '*' + ']** '+
									'\n' + '\n' +'**Rank: **' + Rank  +
									'\n**PP:** ' + ppDATA + fcdata + accuracy + '%' +'  **Score:** ' + `${recentDATA.score}` +
									'\n' + '**Hits:**' + miss + `${recentDATA.countMiss}` + ' |' + hit300 + `${recentDATA.count300}` + ' |' + hit100 + `${recentDATA.count100}` + ' |' + hit50 + `${recentDATA.count50}`  +
									'\n' + '**Map completion:** ' + mapCompletion.toFixed(2) + '%' + 
									'\n**Combo:** ' + `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}x`  
									+ '\n[**Map link**](https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`+ ')', 'https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)


					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://a.ppy.sh/' + `${userDATA.id}`)
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					
					
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)
					message.channel.send(recentEmbedJSON)
					return;


			}



				


			const recentEmbedJSON = new Discord.MessageEmbed()
					.setColor(sidecolor)
					.setAuthor(`Recent play for: ${userDATA.username}`, `http://a.ppy.sh/${userDATA.id}`, `https://osu.ppy.sh/u/${userDATA.id}`)
					.setTitle('')
					.setDescription(status + '** ' + `${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ' + ' + modData + ' ['+ star[0] + '*' + ']** ' + 
									'\n'+ '\n' + '**Rank: **' + Rank  +
									'\n**PP:** ' + ppDATA + fcdata + accuracy + '%' +'  **Score:** ' + `${recentDATA.score}` +
									'\n' + '**Hits:**' + miss + `: ${recentDATA.countMiss}` + ' | ' + hit300 + `: ${recentDATA.count300}` + ' | ' + hit100 + `: ${recentDATA.count100}` + ' | ' + hit50 + `: ${recentDATA.count50}`  +
									'\n**Combo:** ' + `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}x`
									+ '\n[**Map link**](https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`+ ')')

					.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
					.setThumbnail('http://a.ppy.sh/' + `${userDATA.id}`)
					.setImage('https://assets.ppy.sh/beatmaps/' +  `${beatmapDATA.setId}` + '/covers/cover.jpg')
					
					.setTimestamp()
					.setFooter('Made by Xhera & Whiffy', footerImage)
					recentEmbedJSON.toJSON()
					const recentEmbed = JSON.stringify(recentEmbedJSON);
					fs.writeFileSync('embed.json', recentEmbed);
					const embedBuffer = fs.readFileSync('embed.json');
					const embedJSON = embedBuffer.toString();
					const embedDATA = JSON.parse(embedJSON);
					

				message.channel.send(recentEmbedJSON)

					})
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
				console.log(data);


				const rawRank = `${recentDATA.rank}`
			const statusRaw  = `${beatmapDATA.approved}`
			var footerImage = Math.random() < 0.5 ? "https://i.imgur.com/mDXh9Sd.png" : "https://a.ppy.sh/14459921?1577801006.jpeg";
			var sidecolor = ('');
			var Rank =('');
			var miss = "<:miss:868232869607247912>"
			var hit50 = "<:50_:878033880844746782>"
			var hit100 = "<:100_:878032224505700372>"
			var hit300 = "<:300_:878032224363094017>"

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
					status = ' ? '
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
					Rank = "<:C_:868515923357753354>"
				break;
				case 'D':
					sidecolor = '#E74C3C'
					Rank = "<:D_:868515923315810364>"
				break;
				case 'F':
					sidecolor = '#992D22'
					Rank = "F"
				break;
				case 'S':
					sidecolor = '#F1C40F'
					Rank = "<:S_:868515923823329280>"
				break;
				case 'X':
					sidecolor = '#C27C0E'
					Rank = "<:X_:868226433259016273>"
				break;
				case 'SH':
					sidecolor = '#7F8C8D'
					Rank = "<:SH:868515923936563261>"
				break;
				case 'XH':
					sidecolor = '#BCC0C0'
					Rank = "<:XH:868515923781369898>"
				break;



			}

			const hitobj = [];

			const num = data.combo;

			const numobj = data.req.combo - 1;

			const timing = hitobj[num - 1] - hitobj[0];
				const point = hitobj[numobj] - hitobj[0];

				const mapCompletion = (point / timing) * 100;

				console.log(mapCompletion)


				if(data.pp.current === data.pp.fc) {
					var fcdata = (' with ')
				}
				else {
					fcdata = ' **»** ' + ppDATAFc + 'PP with '
				}

				const connectToMongoDB = async () =>{
					await mongo().then(async (mongoose) =>{
						try{
	
							console.log('Saving ID')
							const scoresID = {
								beatmapIDScore: recentDATA.beatmapId,
								channelId: channel.id
							}
	
							if(!scoresID){
								message.channel.send("Data couldn't be saved")
								return;
							}
	
							await scoresSchema.findOneAndUpdate({channelId: channel.id}, {beatmapIDScore: recentDATA.beatmapId}, {upsert: true})
	
	
	
						} finally{
							mongoose.connection.close()
						}
					})
				}
	
				connectToMongoDB()


				if(rawRank === 'F'){

					const recentEmbedJSON = new Discord.MessageEmbed()
						.setColor(sidecolor)
						.setAuthor(`Recent play for: ${userDATA.username}`, `http://a.ppy.sh/${userDATA.id}`, `https://osu.ppy.sh/u/${userDATA.id}`)
						.setTitle('')
						.setDescription(status + '** ' + `${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ' + ' + modData + ' ['+ star[0] + '*' + ']** ' + 
										'\n' +
										'\n**PP:** ' + ppDATA + fcdata + accuracy + '%' +'  **Score:** ' + `${recentDATA.score}` +
										'\n' + '**Hits:**' + miss + `${recentDATA.countMiss}` + ' | ' + hit300 + `${recentDATA.count300}` + ' | ' + hit100 + `${recentDATA.count100}` + ' | ' + hit50 + `${recentDATA.count50}`  +
										'\n' + '**Map completion:** ' + mapCompletion.toFixed(2) + '%' + 
										'\n**Combo:** ' + `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}x` +
										'[Map link](https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`+ ')')
	
	
						.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
						.setThumbnail('http://a.ppy.sh/' + `${userDATA.id}`)
						.setImage('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
						
						.setTimestamp()
						.setFooter('Made by Xhera & Whiffy', footerImage)
						message.channel.send(recentEmbedJSON)
						return;
	
	
				}
	
	
	
					
	
	
				const recentEmbedJSON = new Discord.MessageEmbed()
						.setColor(sidecolor)
						.setAuthor(`Recent play for: ${userDATA.username}`, `http://a.ppy.sh/${userDATA.id}`, `https://osu.ppy.sh/u/${userDATA.id}`)
						.setTitle('')
						.setDescription(status + '** ' + `${beatmapDATA.title}` + ' [' + `${beatmapDATA.version}` + '] ' + ' + ' + modData + ' ['+ star[0] + '*' + ']** ' + 
										'\n'+
										'\n**PP:** ' + ppDATA + fcdata + accuracy + '%' +'  **Score:** ' + `${recentDATA.score}` +
										'\n' + '**Hits:**' + miss + `: ${recentDATA.countMiss}` + ' | ' + hit300 + `: ${recentDATA.count300}` + ' | ' + hit100 + `: ${recentDATA.count100}` + ' | ' + hit50 + `: ${recentDATA.count50}`  +
										'\n**Combo:** ' + `${recentDATA.maxCombo}`+ '/' + `${beatmapDATA.maxCombo}x`
										+ '\n[**Map link**](https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`+ ')')
	
						.setURL('https://osu.ppy.sh/b/' + `${recentDATA.beatmapId}`)
						.setThumbnail('http://a.ppy.sh/' + `${userDATA.id}`)
						.setImage('https://b.ppy.sh/thumb/' +  `${beatmapDATA.setId}` + 'l.jpg')
						
						.setTimestamp()
						.setFooter('Made by Xhera & Whiffy', footerImage)
						recentEmbedJSON.toJSON()
						const recentEmbed = JSON.stringify(recentEmbedJSON);
						fs.writeFileSync('embed.json', recentEmbed);
						const embedBuffer = fs.readFileSync('embed.json');
						const embedJSON = embedBuffer.toString();
						const embedDATA = JSON.parse(embedJSON);
						
	
					message.channel.send(recentEmbedJSON)


})
})



})})}}}