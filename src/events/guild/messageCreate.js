module.exports = async (client, message) => {
    if(!message.guild || !message.channel || message.author.bot) return;

    if(!message.content.startsWith(process.env.PREFIX)) return;

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
    const cmd = args?.shift()?.toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.ALIASES && a.ALIASES.includes(cmd));
    if (command) {
        if (command.OWNER){
            const owner = process.env.OWNER_ID.split(' ');
            if (!owner.includes(message.author.id)) return message.
            reply({ content: `😪 You are not the owner of this bot!, owners: ${owner.map(o => `<@${o}>`).join(', ')} `, ephemeral: true });
        }
        if(command.BOT_PERMISSIONS){
            const botPerms = message.guild.members.me.permissions;
            if (!botPerms ||   ! await botPerms.has(command.BOT_PERMISSIONS)) return message.
            reply({ content: `😖?? I don't have the required permissions to run this command!\nI required next permissions\n${command.BOT_PERMISSIONS.map(p=> `\`${p}\``).join(', ')}`, ephemeral: true });
        }
        if (command.BOT_PERMISSIONS){
            if (!message.member.permissions.has(command.PERMISSIONS)) return message.reply({ content: `😤???? You don't have the required permissions to run this command!\nYou required next permissions\n${command.PERMISSIONS.map(p=> `\`${p}\``).join(', ')}`, ephemeral: true });
        }

        try {
            await command.execute(client, message, args, process.env.PREFIX);
        }catch (error) {
            console.log(error);
            message.reply({ content: `🥶?????? An error occurred while executing this command!`, ephemeral: true });
            return;
        }
    }
}