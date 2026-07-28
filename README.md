# Discord Bot - League of Legends Team Randomizer

Discord bot built with Node.js and discord.js that allows users to create lobbies and randomly assign teams for custom League of Legends matches

The bot handles lobby creation, player joining through interactive buttons, and final team randomization.

---

## Features

- Single slash command `/sortear`
- Game mode selection **ARAM** o **Grieta** (Summoner's Rift)
- Create lobbies within Discord text channels
- Interactive buttons: Unirse / Salir / Cancelar
- Automatic team randomization when the lobby is full

---

## Technologies Used

<p>
  <img src="https://skillicons.dev/icons?i=nodejs,discordjs" />
</p>

---

## Installation

1- Clone the repository:

```bash
git clone https://github.com/marco-bodart/lolsito-bot-sorteador.git
```
2- Navigate to the project root and run `npm install` to install dependencies.

3- Rename `.env.example` and `config.example.js` by removing the `.example` extension.

4- Inside `.env` add your bot token and client ID (from the Discord Developer Portal).
```env
TOKEN=your_bot_token
CLIENT_ID=your_client_id
```
5- Invite your bot to a Discord server via the Discord Developer Portal (OAuth2). Then, from the project root, run:
   
```bash
node index.js
```
If everything is set up correctly, the bot will start running.
