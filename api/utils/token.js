const jwt = require("jsonwebtoken");
const { JWTDetails } = require("../config");


function verifyToken(token){
    if(!token)
        return null;
    try{
        const decoded = jwt.verify(token);
    }
    catch(err){
        console.log(error);
        return null;
    }
}

module.exports = verifyToken;