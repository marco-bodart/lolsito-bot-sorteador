# Bot de Discord - Sorteo de equipos para League of Legends

Bot de Discord hecho con Node.js y discord.js que permite crear salas para sortear equipos para partidas personalizadas de League of Legends.

El bot gestiona la creación de lobbies, la entrada de jugadores mediante botones interactivos y el sorteo final de equipos.

---

## Características

- Comando principal (y único) `/sortear`
- Selección de modo de juego **ARAM** o **Grieta del Invocador**
- Creación de salas dentro de canales de texto de Discord
- Botones: Unirse / Salir / Cancelar
- Sorteo automático a llenar la sala

---

## Tecnologías utilizadas

<p>
  <img src="https://skillicons.dev/icons?i=nodejs,discordjs" />
</p>

---

## Instalación

1- Clona el repositorio:

```bash
git clone https://github.com/marco-bodart/lolsito-bot-sorteador.git
cd lolsito-bot-sorteador
```
2- Dirígete al directorio raiz y ejecuta `npm install` para instalar las dependencias necesarias.
3- Renombra los archivos `.env.example` y `config.example.js` quitándoles ".example".
4- Dentro de `.env` coloca tu TOKEN y tu CLIENT ID (desde el Discord Developer Portal con tu bot previamente creado).
```env
TOKEN=tu_token_del_bot
CLIENT_ID=tu_client_id
```
5- Invita tu bot a un servidor de Discord desde el Discord Developer Portal (OAuth2).
6. Abre una terminal ubicada en la ruta raiz del proyecto y ejecuta:
```bash
node index.js
```
El bot comenzará a funcionar si todo está correcto.
