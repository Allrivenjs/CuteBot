const { glob } = require('glob');
const { promisify } = require('util');
const proGlob = promisify(glob);

module.exports = class BotUtils{
    constructor(client){
        this.client = client;
    }
    async loadFiles(dirname){
        const ARCHIVO = await proGlob(`${process.cwd().replace(/\\/g, '/')}/${dirname}/**/*.js`);
        ARCHIVO.forEach((a) => delete require.cache[require.resolve(a)]);
        return ARCHIVO;
    }
}