const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

// Definir comandos
const commands = [
  new SlashCommandBuilder()
    .setName('sortear')
    .setDescription('Crear lobby de equipos')
    .addStringOption(option =>
      option.setName('modo')
        .setDescription('Modo de juego')
        .setRequired(true)
        .addChoices(
          { name: 'ARAM', value: 'aram' },
          { name: 'Grieta', value: 'grieta' }
        )
    )
].map(cmd => cmd.toJSON());

// API de Discord
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// Esto pa registrar los comandos
(async () => {
  try {
    console.log('Registrando comandos...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('Comandos registrados correctamente');
  } catch (error) {
    console.error(error);
  }
})();