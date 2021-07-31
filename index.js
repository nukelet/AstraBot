const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const mongoose = require('mongoose');
const Sequelize = require('sequelize')

process.env.NODE_ENV = 'development';

const keys = require('./config/keys.js').get();

// set up the database connection

// // this probably shouldn't be hardcoded like this lol
// const uri = `mongodb+srv://nuke:${keys.DB_PASSWORD}@test.mjedv.mongodb.net/Warnings?retryWrites=true&w=majority`;

// async function connectToDb() {
//     await mongoose.connect(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         keepAlive: true,
//     })
//         .then(() => {
//             console.log('connected!');

//             mongoose.connection
//             .on('error', console.log)
//             .on('disconnected', connectToDb);
//             // .once('open', console.log('Connected to database'));
//         })
//         .catch(console.log);
// }

// connectToDb();

const client = new CommandoClient({
    commandPrefix: '!',
    owner: '186543371307843584',
});

// Commando config setup
client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['moderation', 'Moderation commands'],
        ['fun', 'Silly stuff'],
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
