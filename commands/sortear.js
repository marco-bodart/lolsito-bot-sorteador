const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = async (message, lobbies) => {

  const args = message.content.split(' ');
  const modo = args[1];

  if (!modo) {
    return message.reply('Usa: !sortear aram o grieta');
  }

  const msg = await message.reply({
    content: `Lobby creado (${modo})\nJugadores: 0/2`,
    components: []
  });

  const botones = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId(`join_${msg.id}`)
      .setLabel('Unirse (0/2)')
      .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
      .setCustomId(`leave_${msg.id}`)
      .setLabel('Salir')
      .setStyle(ButtonStyle.Secondary),

    new ButtonBuilder()
      .setCustomId(`close_${msg.id}`)
      .setLabel('Cancelar')
      .setStyle(ButtonStyle.Danger)
  );

  await msg.edit({
    components: [botones]
  });

  lobbies.set(msg.id, {
    jugadores: [],
    modo,
    creador: message.author.id
  });
};