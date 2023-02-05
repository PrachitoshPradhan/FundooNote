import { send } from 'process'

const nodemailer = require ('nodemailer')
const { google } = require('googleapis')



export const sendMail=(data) => {
    try{
        const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URI)

        oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})

        const accessToken = oAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'prachitoshpp.pradhans@gmail.com',
                clientId : CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'PRACHITOSH <prachitoshpp.pradhans@gmail.com>',
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: data.html,
        };

        transport.sendMail(mailOptions);   
    }catch(error){
        console.log(error);
    }
}
