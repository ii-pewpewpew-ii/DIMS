const jwt = require("jsonwebtoken");
const { JWTDetails } = require("../config");


function verifyToken(token){
    if(!token)
        return null;
    try{
        const decoded = jwt.verify(token);
        return decoded;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

module.exports = verifyToken;