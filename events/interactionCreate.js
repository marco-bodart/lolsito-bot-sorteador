const shuffle = require('../utils/shuffle');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { MAX_JUGADORES } = require('../config');

module.exports = (client, lobbies) => {
  client.on('interactionCreate', async (interaction) => {
    try {

      // *****************************
      // Comando con slash: /sortear
      // *****************************
      if (interaction.isChatInputCommand()) {

        if (interaction.commandName === 'sortear') {

          const modo = interaction.options.getString('modo');

          const msg = await interaction.reply({
            content: `Sorteo de equipos (${modo})\n\n Jugadores: 0/${MAX_JUGADORES}`,
            fetchReply: true
          });

          const botones = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId(`join_${msg.id}`)
              .setLabel(`Unirse (0/${MAX_JUGADORES})`)
              .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
              .setCustomId(`leave_${msg.id}`)
              .setLabel('Salir')
              .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
              .setCustomId(`sort_${msg.id}`)
              .setLabel('Sortear')
              .setStyle(ButtonStyle.Success),

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
            creador: interaction.user.id
          });
        }

        return;
      }

      // *****************************
      // BOTONES
      // *****************************
      if (!interaction.isButton()) return;

      const lobbyId = interaction.message.id;
      const lobby = lobbies.get(lobbyId);
      if (!lobby) return;

      const userId = interaction.user.id;

      // *****************************
      // UNIRSE
      // *****************************
      if (interaction.customId.startsWith('join_')) {

        if (lobby.jugadores.includes(userId)) {
          return interaction.reply({ content: 'Ya estás en el lobby', ephemeral: true });
        }

        if (lobby.jugadores.length >= MAX_JUGADORES) {
          return interaction.reply({ content: 'Lobby lleno', ephemeral: true });
        }

        lobby.jugadores.push(userId);
      }

      // *****************************
      // SALIR
      // *****************************
      if (interaction.customId.startsWith('leave_')) {

        if (!lobby.jugadores.includes(userId)) {
          return interaction.reply({ content: 'No estás en el lobby', ephemeral: true });
        }

        lobby.jugadores = lobby.jugadores.filter(id => id !== userId);
      }

      // *****************************
      // CANCELAR
      // *****************************
      if (interaction.customId.startsWith('close_')) {

        if (userId !== lobby.creador) {
          return interaction.reply({ content: 'Solo el creador puede cancelar', ephemeral: true });
        }

        lobbies.delete(lobbyId);

        return interaction.update({
          content: 'Sorteo cancelado :(',
          components: []
        });
      }

      // *****************************
      // SORTEAR
      // *****************************
      if (interaction.customId.startsWith('sort_')) {

        if (userId !== lobby.creador) {
          return interaction.reply({ content: 'Solo el creador puede sortear', ephemeral: true });
        }

        if (lobby.jugadores.length < MAX_JUGADORES) {
          return interaction.reply({ content: 'Faltan jugadores', ephemeral: true });
        }

        const jugadores = lobby.jugadores.map(id => `<@${id}>`);
        const mezclados = shuffle([...jugadores]);

        const mitad = Math.floor(mezclados.length / 2);
        const equipo1 = mezclados.slice(0, mitad);
        const equipo2 = mezclados.slice(mitad);

        let resultado = `RESULTADO (${lobby.modo})\n\n`;
        resultado += `🔵 Azul:\n${equipo1.join('\n')}\n\n`;
        resultado += `🔴 Rojo:\n${equipo2.join('\n')}`;

        await interaction.reply(resultado);

        lobbies.delete(lobbyId);

        return;
      }

      // *****************************
      // ACTUALIZAR UI
      // *****************************
      const lista = lobby.jugadores.map(id => `<@${id}>`).join('\n') || '—';

      const botones = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId(`join_${lobbyId}`)
          .setLabel(`Unirse (${lobby.jugadores.length}/${MAX_JUGADORES})`)
          .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
          .setCustomId(`sort_${lobbyId}`)
          .setLabel('Sortear')
          .setStyle(ButtonStyle.Success),

        new ButtonBuilder()
          .setCustomId(`leave_${lobbyId}`)
          .setLabel('Salir')
          .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
          .setCustomId(`close_${lobbyId}`)
          .setLabel('Cancelar')
          .setStyle(ButtonStyle.Danger)
      );

      await interaction.update({
        content: ` Sorteo de equipos (${lobby.modo})\n\n Jugadores (${lobby.jugadores.length}/${MAX_JUGADORES}):\n${lista}`,
        components: [botones]
      });

    } catch (error) {
      console.error('ERROR:', error);
    }
  });
};