require('dotenv').config();
require('colors');
const Bot = require("./structures/Client");
try{
    new Bot();
}catch (e) {
    console.log(e);
    new Bot();
}