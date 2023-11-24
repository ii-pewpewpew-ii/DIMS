const {googleAuth} = require("../config");

const OAUTH_BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth";

/*
    Function to generate an OAuth URL to access
    user's google photos.
*/

function getGoogleOAuthURL(username){
    
    const options = {
        redirect_uri : googleAuth.googleRedirectURL,
        client_id : googleAuth.googleClientId,
        // access_type : 'online',
        response_type : 'token',
        scope : ["https://www.googleapis.com/auth/photoslibrary"],
        state : username
    }    
    const params = new URLSearchParams(options);
    return `${OAUTH_BASE_URL}?${params.toString()}`;
}

module.exports = getGoogleOAuthURL;