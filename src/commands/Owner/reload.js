const { EmbedBuilder } = require('discord.js');
module.exports = {
    DESCRIPTION: "Reload the files of bot",
    OWNER: true,
    async execute(client, message, args, prefix) {
        let options = "Commands, Events, Handlers";
        try {
            const start = Date.now();
            switch (args[0]?.toLowerCase()) {
                case "commands":
                case "commando": {
                    options = "Commands";
                    await client.loadCommands();
                    message.channel.send("Commands reloaded");
                }
                    break;
                case "slashCommands":
                case "slash": {
                    options = "Slash Commands";
                    await client.loadSlashCommands();
                    message.channel.send("Slash Commands reloaded");
                }
                    break;
                case "events":
                case "eventos": {
                    options = "Events";
                    await client.loadEvents();
                    message.channel.send("Events reloaded");
                }
                    break;
                case "handlers": {
                    await client.loadHandlers();
                    message.channel.send("Handlers reloaded");
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
            console.log('reload'.green, `${message.author?.tag || 'Anymore admin' } ${'('+ message.author?.id  || ''  + ')'}`.yellow, `reloaded ${options}`.cyan, `in ${calc}s`.yellow);
            message.reply({
               embeds: [
                  new EmbedBuilder()
                      .addFields({
                          name: `✨ ${options} reloaded`,
                          value: `✅ > *Okay!*` + `\n` + `⏱️ > *${calc}s*`
                      }).setColor(process.env.COLOR)
               ]
            });

        }catch (e) {
            message.reply("** exception error, show console " + e);
            console.log(e);
        }
    }
}