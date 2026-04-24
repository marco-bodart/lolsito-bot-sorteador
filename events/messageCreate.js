const { CANAL_PERMITIDO } = require('../config');
const equipos = require('../commands/equipos');
const sortear = require('../commands/sortear');

module.exports = (client, lobbies) => {
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const esComando = message.content.startsWith('!');

    // if (message.channel.id !== CANAL_PERMITIDO) {
    //   if (esComando) {
    //     return message.reply('Aquí no puedes usar este bot');
    //   }
    //   return;
    // }

    if (message.content.startsWith('!equipos')) {
      return equipos(message);
    }

    if (message.content.startsWith('!sortear')) {
      return sortear(message, lobbies);
    }
  });
};
