const linebot = require('@line/bot-sdk');
const createHash = require("sha256-uint8array").createHash;
const User = require("../models").User;
var followMessageJSON = require("../messages/follow.js");
require('dotenv').config();

const config = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET
}

const client = new linebot.Client(config)

module.exports = {
    returnText: (event) => {
        const {
            type,
            text,
        } = event.message;
    
        if (text.includes('疲れた') || text.includes('つかれた') || text.includes('ツカレタ')) {
            return client.replyMessage(event.replyToken, {
                "type": "image",
                "originalContentUrl": "https://picsum.photos/200/300",
                "previewImageUrl": "https://picsum.photos/200/300"
            });
        }

        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: text
        });
    }, 

    postback: (event) => {

    },

    follow: event => {
        const userLINEID = event.source.userId;
        let hashID = null;
        console.log("----------------hashID----------------------------------", hashID)
        console.log("-----------------source---------------------------------:", event);
        console.log("------------------userID---------------------------------: ", userLINEID);
        hashID = createHash().update(userLINEID).digest("hex");
        console.log("------------------hashID---------------------------------: ", hashID);
        followMessageJSON.text += "?h=" + hashID;
        return client.replyMessage(event.replyToken, followMessageJSON);
    },

    unfollow: async (event) => {
        const userLINEID = event.source.userId;
        const hashID = createHash().update(userLINEID).digest("hex");
        User.findOne({
            where:{
                hashID
            }
        })
        .then(user => {
            user.destroy();
        })
    }
}