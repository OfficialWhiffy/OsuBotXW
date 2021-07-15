const axios = require('axios');
const { osuOAuth2Key, osuClientSecret, osuClientId } = require('../config.json');

module.exports = {
	name: 'api',
	description: 'Description',
	execute(message, args) {
		
		axios.get("https://osu.ppy.sh/api/[version]/", {
            headers: {
              Authorization: 'Bearer {{eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI2MzQ4IiwianRpIjoiNTM2YzhhOGYzYWQ2ZTBmMGQyM2IxN2MyZmZiNjg0MTg4YjEzNjZiYTI1Y2MwNjg5ZWY3OTgzNGY5M2YyZWJiMDBhM2YxYzVkZjdmYzIzMjEiLCJpYXQiOjE2MTc2MzUwNjIsIm5iZiI6MTYxNzYzNTA2MiwiZXhwIjoxNjE3NzIxNDYyLCJzdWIiOiIiLCJzY29wZXMiOlsicHVibGljIl19.SstxGI6N8FKPQ58e535MH-3ImdwYeCAoT_OQKsP4CQMdn8pJ6w97qUOeIV_mRwb1xy2BR-Y9Ah8DGzrzrX3qBrGx4vHgOpqDZiuXvj01SZw9onRwNE0vdudq4I6UeDRyL0FNtuiDadJRVhx_6pIGiU8KUojmb2FCSOBaABkMvQztCHaH8Y3Bl_pFThCq1EuYelQsItWm1tdYp6X2AFuUSoHR-a1k8cFqtxBJaQdRPBbvfi6JR2m6nDoFlmzWgOj90jMgxYtv6OwrKZRHTwd9ynay3FoHdVvwagsTLYYPxGo6J-J62xcDdnpgYrLVjvq9ozd_j_GNteLq6zKjm6MO3v3rtP_3Uxv_tSkFAA7ck0KQOK_RbCS3Du-Mr2KSaOSxDi6f6k3GV2LRnhXFBPeJX3i-CNl9ltZbcJqwDTdLEdH9Bb3IAP8v-AKHTUXdrelXrMdRRWoUXxoig-MQ4rpo0K6PrIGHMrgD4-BcwpBnZH6rLjXgbuJSOPC4pLu53f6oVg6IEjDO7a-2wyCDEV6-Mqe_8Q1TwZDGiDBcgqW6mHtfTIHXN-xDH5zm8cN-k0YfiBEwo9-en0jed3gJq8iOTEh6guxn3bPD4miowBAW-YOyFpxzIRqQ_5dMPfwGovEiJpeHErQP7dKZbDEvHW2xcDEPrx0_3ZcDn4yoen3NRmw}}'
            }
        })
		.then(function (response) {
            console.log(response.data);
        })
        
	},
};