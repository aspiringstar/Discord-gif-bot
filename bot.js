
require('dotenv').config();

const fetch = require('node-fetch');

const Discord = require ('discord.js');
const client  = new Discord.Client();
client.login(process.env.DISCORD_TOKEN);

client.on('ready', ()=> {
    console.log("Logged in as Giffy");
});

client.on('message', msgAction);

async function msgAction (msg) {

    let msgtokens = msg.content.split(" ");

    if (msg.content === "$help"){
        msg.reply("Hello, I am Giffy, personalised by Omnius!\nI will provide you with your desired gifs in your desired channels.\nUse $giffy [search-term] to use Giffy anytime, anywhere. For this menu, type $help.");
    }

    else if (msgtokens[0] === "$giffy"){

        let msgsearch = msgtokens.slice(1).join(" ");
        let url = `https://g.tenor.com/v1/search?q=${msgsearch}&key=${process.env.TENOR_KEY}&limit=8`;
        let response = await fetch(url);
        let result = await response.json();
        //console.log(result);

        let index = Math.floor(Math.random()*result.results.length);
        msg.channel.send(`${result.results[index].url}`);
    }

    
}