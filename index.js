require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const messageEvent = require('./events/messageCreate');
const interactionEvent = require('./events/interactionCreate');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

const lobbies = new Map();

client.once('clientReady', () => {
  console.log(`Bot listo como ${client.user.tag}`);
});

messageEvent(client, lobbies);
interactionEvent(client, lobbies);

client.login(process.env.TOKEN);