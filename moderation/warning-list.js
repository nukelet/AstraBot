const { Command } = require('discord.js-commando');

const WarningModel = require('../../structures/Warning');

module.exports = class WarningAddCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'warning-list',
            group: 'moderation',
            memberName: 'warning-list',
            description: 'Logs a warning given to a user.',
            userPermissions: ['KICK_MEMBERS'],
            args: [
                {
                    key: 'userId',
                    prompt: 'The Discord ID of the user being warned',
                    type: 'string',
                },

                {
                    key: 'warningMessage',
                    prompt: 'The warning message',
                    type: 'string',
                    validate: text => text.length < 251,
                },
            ],
        });
    }

    run(message, { userId, warningMessage }) {
        const targetUser = message.guild.members.cache.get(userId).user;
        const authorUser = message.author;
        console.log(targetUser, authorUser);
        const warning = {
            userId: targetUser.id,
            userName: targetUser.username,
            userDiscriminator: targetUser.discriminator,

            authorId: authorUser.id,
            authorName: authorUser.username,
            authorDiscriminator: authorUser.discriminator,

            description: warningMessage,
        };
        console.log(warning);

        WarningModel.addWarning(warning);

        const warningEmbed = {
            color: 0x0099ff,

            title: 'Warning',

            description: 'The following warning was registered:',

            thumbnail: {
                url: 'https://cdn.discordapp.com/emojis/802562999381917727.png?v=1',
            },

            fields: [
                {
                    name: 'Warned user:',
                    value: `${targetUser.username}#${targetUser.discriminator}`,
                },

                {
                    name: 'Author:',
                    value: `${authorUser.username}#${authorUser.discriminator}`,
                },

                {
                    name: 'Description:',
                    value: warningMessage,
                },
            ],

            timestamp: new Date(),

        };

        return message.embed(warningEmbed);
    }
};