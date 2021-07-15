const axios = require('axios');
const { osuOAuth2Key, osuClientSecret, osuClientId } = require('../config.json');

module.exports = {
	name: 'credentialgrant',
	description: 'Description',
	execute(message, args) {
		
		axios.post('https://osu.ppy.sh/oauth/token', {
            "client_id": osuClientId,
            "client_secret": osuClientSecret,
            "grant_type": 'client_credentials',
            "scope": "public"
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        
	},
};