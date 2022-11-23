const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    CMD: new SlashCommandBuilder()
        .setDescription('A simple command that does nothing'),
    async execute(client, interaction, prefix) {
        return interaction.reply(`\`${client.ws.ping}ms\``);
    }
}