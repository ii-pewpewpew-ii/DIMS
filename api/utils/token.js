const jwt = require("jsonwebtoken");
const { JWTDetails } = require("../config");


function verifyToken(token){
    console.log(token)
    if(!token)
        return null;
    try{
        const decoded = jwt.verify(token,JWTDetails.secret);
        return decoded;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

module.exports = verifyToken;