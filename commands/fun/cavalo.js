const { Command } = require('discord.js-commando');

module.exports = class Cavalo extends Command {
    constructor(client) {
        // calls the parent class (Command) constructor
        super(client, {
            name: 'cavalo',
            aliases: ['caballo', 'horse'],
            group: 'fun',
            memberName: 'cavalo',
            description: 'test command',
        });
    }

    run(message) {
        return message.say(':horse:');
    }
};