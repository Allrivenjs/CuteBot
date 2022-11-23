const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
module.exports = {
    OWNER: true,
    CMD: new SlashCommandBuilder()
        .setDescription('Reload files of bot')
        .addStringOption(option =>
            option.setName('module')
                .setDescription('File to reload')
                .addChoices(
                    { name: 'Commands', value: 'commands' },
                    { name: 'Events', value: 'events' },
                    { name: 'Handlers', value: 'handlers' },
                    { name: 'Slash', value: 'slash' }
                ).setRequired(false)
        )
    ,
    async execute(client, interaction, prefix) {
        let args = interaction.options.getString('module');
        let options = "Commands, Events, Handlers";
        try {
            const start = Date.now();
            switch (args?.toLowerCase()) {
                case "commands":
                case "commando": {
                    options = "Commands";
                    await client.loadCommands();
                    interaction.channel.send("Commands reloaded");
                }
                    break;
                case "slashCommands":
                case "slash": {
                    options = "Slash Commands";
                    await client.loadSlashCommands();
                    interaction.channel.send("Slash Commands reloaded");
                }
                    break;
                case "events":
                case "eventos": {
                    options = "Events";
                    await client.loadEvents();
                    interaction.channel.send("Events reloaded");
                }
                    break;
                case "handlers": {
                    await client.loadHandlers();
                    interaction.channel.send("Handlers reloaded");
                }
                    break;
                default: {
                    await client.loadHandlers();
                    await client.loadEvents();
                    await client.loadSlashCommands();
                    await client.loadCommands();
                }
                    break;
            }
            const end = Date.now();
            const calc = (end - start) / 1000;
            console.info(`Reloaded ${options}`.yellow);
            console.log('reload'.green, `${interaction.author?.tag || 'Anymore admin' } ${'('+ interaction.author?.id  || ''  + ')'}`.yellow, `reloaded ${options}`.cyan, `in ${calc}s`.yellow);
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .addFields({
                            name: `✨ ${options} reloaded`,
                            value: `✅ > *Okay!*` + `\n` + `⏱️ > *${calc}s*`
                        }).setColor(process.env.COLOR)
                ]
            });

        }catch (e) {
            interaction.reply("** exception error, show console " + e);
            console.log(e);
        }
    }
}