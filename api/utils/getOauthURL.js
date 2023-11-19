const config = require("../config/google");

const OAUTH_BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth";

/*
    Function to generate an OAuth URL to access
    user's google photos.
*/

function getGoogleOAuthURL(){
    
    const options = {
        redirect_uri : config.googleRedirectURL,
        client_id : config.googleClientId,
        access_type : 'offline',
        response_type : 'code',
        scope : ["https://www.googleapis.com/auth/photoslibrary"]
    }    
    const params = new URLSearchParams(options);
    return `${OAUTH_BASE_URL}?${params.toString()}`;
}

module.exports = getGoogleOAuthURL;