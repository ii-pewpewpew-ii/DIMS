const dotenv = require("dotenv");
dotenv.config();

const config = {
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
    googleRedirectURL : process.env.GOOGLE_REDIRECT_URL
}

module.exports = config;