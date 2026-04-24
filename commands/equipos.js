const shuffle = require('../utils/shuffle');

module.exports = async (message) => {
    const args = message.content.split('');
    const modo = args[1];
    const conRoles = args.includes('roles');

    if( !modo ) return message.reply('Debes poner un modo: aram o grieta');

    const jugadores = message.mentions.users.map( u => `<@${u.id}>`);

    if( jugadores.lenght !== 10 ) return message.reply('Necesitas mencionar exactamente a 10 jugadores.');
    
    const mezclados = shuffle([...jugadores]);
    const equipo1 = mezclados.slice(0, 5);
    const equipo2 = mezclados.slice(5);

    return message.reply(
        `Equipos:\n\n🔵 Azul:\n${equipo1.join('\n')}\n\n🔴 Rojo:\n${equipo2.join('\n')}`
    );
}