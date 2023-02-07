const nodemailer = require('nodemailer');
const { google } = require('googleapis');
import dotenv from 'dotenv';
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token:  process.env.REFRESH_TOKEN });

export async function sendMail(token, email) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
 
        // console.log("MESSAGE--------------->", token);
        // console.log("MESSAGE---------------->", email);
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'prachitoshpp.pradhans@gmail.com',
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'Prachitosh <prachitoshpp.pradhans@gmail.com>',
            to: email,
            subject: 'Hello from gmail using API',
            text: 'Hello from gmail email using API',
            html: `<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/${token}">click here</a></h1>`
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}
