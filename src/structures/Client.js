const {Client, GatewayIntentBits, Partials, ActivityType, PresenceUpdateStatus, Collection} = require('discord.js');
const BotUtils = require("./Utils");

module.exports = class extends Client {
    constructor(options = {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates,
        ],
        partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction],
        allowedMentions: {
            parse: ['users', 'roles'],
            repliedUser: false,
        },
        presence: {
            activities: [{name: process.env.STATUS, type: ActivityType[process.env.STATUS_TYPE]}],
            status: PresenceUpdateStatus.Online,
        },

    }) {
        super({...options});
        this.commands = new Collection();
        this.slashCommands = new Collection();
        this.slashArray = [];
        this.utils = new BotUtils(this);
        this.start();
    }

    async start(){
        await this.loadHandlers();
        await this.loadEvents();
        await this.loadCommands();
        await this.loadSlashCommands();
        await this.login(process.env.BOT_TOKEN);
    }

    async loadCommands(){
        console.log(`(${process.env.PREFIX}) Loading commands...`.yellow);
        await this.commands.clear();
        const RUTA_ARCHIVOS = await this.utils.loadFiles('/src/commands');
        if (RUTA_ARCHIVOS.length > 0) {
            RUTA_ARCHIVOS.forEach((file) => {
                try {
                    const command = require(file);
                    const commandName = file.split('\\').pop().split('/').pop().split('.')[0];
                    command.NAME = commandName;
                    if (commandName) this.commands.set(commandName, command);
                }catch (e) {
                    console.log(`(${process.env.PREFIX}) Error loading command ${file}:\n${e}`.bgRed);
                }
            });
        }
        console.log(`(${process.env.PREFIX}) Loaded ${this.commands.size} commands`.green);
    }

    async loadSlashCommands(){
        console.log(`(/) Loading slash commands...`.yellow);
        await this.slashCommands.clear();
        this.slashArray = [];
        const RUTA_ARCHIVOS = await this.utils.loadFiles('/src/slashCommands');
        if (RUTA_ARCHIVOS.length) {
            RUTA_ARCHIVOS.forEach((file) => {
                try {
                    const command = require(file);
                    const commandName = file.split('\\').pop().split('/').pop().split('.')[0];
                    command.CMD.name = commandName;
                    if (commandName) this.slashCommands.set(commandName, command);
                    this.slashArray.push(command.CMD.toJSON());
                }catch (e) {
                    console.log(`(${process.env.PREFIX}) Error loading command ${file}:\n${e}`.bgRed);
                }
            });
        }
        console.log(`(/) Loaded ${this.slashCommands.size} commands`.green);

        if (this?.application?.commands){
            await this.application.commands.set(this.slashArray);
            console.log(`(/) Loaded ${this.slashCommands.size} slash commands`.green);
        }
    }

    async loadHandlers(){
        console.log(`(-) Loading handlers...`.yellow);

        const RUTA_ARCHIVOS = await this.utils.loadFiles('/src/handlers');
        if (RUTA_ARCHIVOS.length) {
            RUTA_ARCHIVOS.forEach((file) => {
                try {
                    require(file)(this);
                }catch (e) {
                    console.log(`(${process.env.PREFIX}) Error loading command ${file}:\n${e}`.bgRed);
                }
            });
        }
        console.log(`(${process.env.PREFIX}) Loaded ${RUTA_ARCHIVOS.length} Handlers`.green);
    }

    async loadEvents(){
        console.log(`(+) Loading events...`.yellow);
        const RUTA_ARCHIVOS = await this.utils.loadFiles('/src/events');
        this.removeAllListeners();
        if (RUTA_ARCHIVOS.length) {
            RUTA_ARCHIVOS.forEach((file) => {
                try {
                    const event = require(file);
                    const eventName = file.split('\\').pop().split('/').pop().split('.')[0];
                    this.on(eventName, event.bind(null, this));
                }catch (e) {
                    console.log(`(${process.env.PREFIX}) Error loading command ${file}:\n${e}`.bgRed);
                }
            });
        }
        console.log(`(+) Loaded ${RUTA_ARCHIVOS.length} Events`.green);
    }
}