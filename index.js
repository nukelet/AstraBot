const { CommandoClient } = require('discord.js-commando');
const path = require('path');

process.env.NODE_ENV = 'development';

const keys = require('./config/keys.js').get();

const client = new CommandoClient({
    commandPrefix: '!',
    owner: '186543371307843584',
});

// Commando config setup
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['moderation', 'Moderation commands'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        eval: false,
    })
    .registerCommandsIn(path.join(__dirname, 'commands'));

try {
    client.login(keys.DISCORD_API_TOKEN);
}
catch (e) {
    console.log(e);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
    console.log(`Invite link: ${`https://discord.com/oauth2/authorize?client_id=${keys.BOT_CLIENT_ID}&scope=bot`}`);

    client.user.setActivity('WeirdChamp');
});