module.exports = {
    DESCRIPTION: 'A simple command that does nothing',
    PERMISSION: ['Administrator', 'KickMembers', 'BanMembers'],
    OWNER: false,
    async execute(client, message, args, prefix) {
        return message.reply(`\`${client.ws.ping}ms\``);
    }
}