const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU9CemY0NW9hc2FvY3Z4UUhyZmkvTlYwbVNKVWV1aFA5SlJlWVdSWEJVOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0xUTXdwLzN1YllsMHQ4R1M5TWUrS3NEN1hjL3JqRk40MGM3bUxuLzVBTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpR0FlTFVHM0s1UHhva3hiVkRxYStZNk5rYkxiZzdYUCtyQ3NkWHhNTDJ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNaldjSlU4WnVaMEtWdnIwTDEyNmVHS2hnU2xVMHpGb1B0cy9PTnF6cVY0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFNcWFNK3RubTEybGNwOEpTT005MU5qZU1aQ1FvQ3hvTjZFMzY0aExSVjg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iml2NFBUUkVyTW5uNU5DYVNSMU9uZk1OYU9mVzRWRUphMXI4UjhncGR4UkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME9BL29sSmVMRFJMMVhLazlsMzJSRThabEtrRnhsb2lUc0FBT01nWWwxST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieWw2UWc0TnRQbzhwQWVaQmNXaGozeHhYTDh1Z1FXL3NWN0dYNXlpenhBcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRWTUxRS2tPVElUZzBrb2pvaXczdFV5a0VNU2VQczVJZkJIN25Xa1k0VzJOWm9CdEUwbndNZFNNVXIwbmpYWFBwYVFDcjVpdnRiUDlPWUZyUU1pUGpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTgsImFkdlNlY3JldEtleSI6Ik5uWHh1bXdnaVhxU1lKL3kyS0VWS2hsNkF6RjVGbFlBTXVCdlJiUjlIZlU9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InpPN2dwUXowUUltUXdOVjZlMUkxRGciLCJwaG9uZUlkIjoiMDZhZDQ3YjUtMzkxZi00ZjA2LTgxYzAtZjBlYjI1ZWIxOWZiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNKN2pxb2h6RUh1VTRVUlBsWDVtS0pkQUNFST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2MXlEQVNKUEZVNmhzdVpXWVNoWXp5RTV3ZVU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNlFZOVM5VkwiLCJtZSI6eyJpZCI6IjI1NTc1OTc2NzkzNzo2MkBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSWVkb0FrUW02SC91QVlZQWlBQUtBQT0iLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiVXROaGRUaVVKdGs4MHAxY0R0NzZSRnE0KzlKU2tSMTlsRzAwMVZFRTBFQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiYXg2MmZ1OWRkR0paV3pWcFdQZzAxWGwrQ0lrWnpZZ1hYNHNHbUpNTmRPU2g4OXVHUUdLZHNFSU9YRkxtYUQ3RDkzMWpscVpvRFNmOTkzdkQvOGRqQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IkxUdnFpblM0ZXZaQWhSWno0Y3o4NWwrLytLYTR1dzlrNE85VUxjNXZFMmVVNHNidVNQNStkTGd1QmdtSWVjcDN2VUkzMTJrQldETGdUUXRPNHNLMmhRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NzU5NzY3OTM3OjYyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZMVFlYVTRsQ2JaUE5LZFhBN2Ura1JhdVB2U1VwRWRmWlJ0Tk5WUkJOQkEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzAxMzgyODF9',
    PREFIXES: (process.env.PREFIX || '').split('.').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "PROFESSOR",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "255759767937",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
