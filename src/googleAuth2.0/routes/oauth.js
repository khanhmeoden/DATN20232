const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const {OAuth2Client} = require('google-auth-library')

async function getUserData(access_token){
    const respone = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?acces_token${access_token}`);
    const data = await respone.json();
    console.log('data', data); 
}

router.get('/', async function(req, res, next) {
    const code = req.query.code;
    try{
        const redirectUrl = 'http://localhost:8080/api/auth/google/callback';
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID, 
            process.env.CLIENT_SECRET,
            redirectUrl
        );
        const res = await oAuth2Client.getToken(code);
        await oAuth2Client.setCredentials(res.tokens);
        console.log('Token acquired');
        const user = oAuth2Client.credentials;
        console.log('credentials',user);
        await getUserData(user.access_token);
    }catch(err){
        console.log('Error with signing in with Google')
    }

});
