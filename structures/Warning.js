const WarningModel = require('../models/WarningModel');

module.exports = {
    findWarning: async function(options) {
        const results = await WarningModel.find(options);
        return results;
    },

    addWarning: async function(targetUser, authorUser) {
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

        const addWarningEmbed = {
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
        };

        const warningModel = new WarningModel(options);
        await warningModel.save();
        return message.embed(addWarningEmbed);
    },
};
