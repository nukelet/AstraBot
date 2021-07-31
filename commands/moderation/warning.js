const { Command } = require('discord.js-commando');
const db = require('../../models/index.js')

module.exports = class Warning extends Command {
    constructor(client) {
        super (client, {
            name: 'warning',
            group: 'moderation',
            memberName: 'warning',
            description: 'warning stuff',
            args: [
                {
                    key: 'operation',
                    type: 'string',
                    prompt: 'Invalid arguments',
                    oneOf: ['list', 'add', 'remove']
                },

                {
                    key: 'args',
                    type: 'string',
                    prompt: 'Invalid operation (no arguments)',
                }
            ]
        });
    }

    async run(msg, { operation, args }) {
        if (operation === 'add') {
            addWarning(msg, args);
        } else if (operation === 'remove') {
            removeWarning(msg, args);
        } else if (operation === 'list') {
            listWarnings(msg, args);
        }
    }
}

async function listWarnings(msg, args) {
    const warnings = await db.Warning.findAll();
    let warningFields = [];
    for (const element of warnings) {
        const values = element.dataValues;
        console.log(values.id, values.userId, values.reason);
        warningFields.push({
            name: `Warning by ${values.authorName}`,
            value:  `**Warned user**: ${values.userName}\n` +
                    `**Warning ID:** ${values.id}\n` +
                    `**Reason:** ${values.reason}\n`,
        });
    }
    return msg.embed({
        color: 0x0099ff,
        title: 'Warning log',
        timestamp: new Date(),
        fields: warningFields,
    });
}

async function removeWarning(msg, args) {
    // TODO: implement
}

async function addWarning(msg, args) {
    args = args.split(' ');
    let user = args.shift();
    let reason = args.join(' ');
    console.log(user, reason);

    // <@!186543371307843584>, for example
    const mentionRegex = new RegExp('<@![0-9]*>');
    // only numbers
    const idRegex = new RegExp('^[0-9]*$');
    
    let userId = null;
    if (mentionRegex.test(user)) {
        userId = user.replace(/[<@!>]/g, '');
    } else if (idRegex.test(user)) {
        userId = user;
    } else {
        msg.say(`Invalid user: \"${user}\"`);
        return null;
    }

    const guildMember = await msg.guild.members.cache.get(userId);

    if (!guildMember) {
        return msg.say(`Could not find user: ${user}`);
    }

    try {
        const warning = await db.Warning.create({
            userName: guildMember.user.tag,
            userId: guildMember.user.id,
            authorName: msg.author.tag,
            reason: reason,
        });

        return msg.embed(getNewWarningEmbed(warning));
    } catch (e) {
        console.log(e);
    }
}

function getNewWarningEmbed(warning) {
    return {
        color: 0x0099ff,
        title: 'Warning',
        description: 'The following **warning** was registered:',
        timestamp: new Date(),

        thumbnail: {
            url: 'https://cdn.discordapp.com/emojis/802562999381917727.png?v=1',
        },

        fields: [
            {
                name: 'Warned user:',
                value: warning.userName,
            },

            {
                name: 'Author:',
                value: warning.authorName,
            },

            {
                name: 'Warning ID:',
                value: warning.id,
            },

            {
                name: 'Reason:',
                value: warning.reason,
            },
        ],
    };
}
