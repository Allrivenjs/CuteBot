module.exports = async (client, interaction) => {
    if(!interaction.guild || !interaction.channel) return;

    const command = client.commands.get(interaction.commandName);
    if (command) {
        if (command.OWNER){
            const owner = process.env.OWNER_ID.split(' ');
            if (!owner.includes(interaction.user.id)) return interaction.
            reply({ content: `😪 You are not the owner of this bot!, owners: ${owner.map(o => `<@${o}>`).join(', ')} `, ephemeral: true });
        }
        if(command.BOT_PERMISSIONS){
            const botPerms = interaction.guild.members.me.permissions;
            if (!botPerms ||   ! await botPerms.has(command.BOT_PERMISSIONS)) return interaction.
            reply({ content: `😖?? I don't have the required permissions to run this command!\nI required next permissions\n${command.BOT_PERMISSIONS.map(p=> `\`${p}\``).join(', ')}`, ephemeral: true });
        }
        if (command.BOT_PERMISSIONS){
            if (!interaction.member.permissions.has(command.PERMISSIONS)) return interaction.reply({ content: `😤???? You don't have the required permissions to run this command!\nYou required next permissions\n${command.PERMISSIONS.map(p=> `\`${p}\``).join(', ')}`, ephemeral: true });
        }

        try {
            await command.execute(client, interaction, '/');
        }catch (error) {
            console.log(error);
            interaction.reply({ content: `🥶?????? An error occurred while executing this command!`, ephemeral: true });
        }
    }
}