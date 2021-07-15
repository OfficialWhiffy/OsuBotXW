const axios = require('axios');
const { V1, V2, mods, tools } = require('osu-api-extended');

const Discord = require('discord.js');
const mongo = require('../mongo')
const userSchema = require ('../schemas/test-schema')
const fs = require('fs');
const Nodesu = require('nodesu');
const { apiKey, token } = require('../config.json')

const {Beatmap, Osu: {DifficultyCalculator, PerformanceCalculator}} = require('osu-bpdpc')
const request = require('request-promise-native')

const api = new Nodesu.Client(apiKey,{ parseData : true});
const v1 = new V1(apiKey);


//const {NoMod, NF, EZ, TD, HD, HR, SD, DT, RX, HT, NC, FL, AU, SO, AP, PF, fourK, fiveK, sixK, sevenK, eightK, FI, RD, CN, TP, nineK, CK, oneK, threeK, twoK, scoreV2, MR, HDDT} = require('../modules/mods.js')
const { HDHR } = require('../modules/mods.json')






module.exports = {
	name: 'anew',
	description: 'beatmap info',
	async execute(message, args) {

         tools.calc({ id: 2316176, mods: 0, combo: 1684, miss: 0, acc: 93.26 }).then(data => {
         const ppDATA = data.pp.current;
         console.log(ppDATA);

			
			


			

         })
	},
};