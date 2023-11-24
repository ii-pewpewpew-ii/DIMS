const jwt = require("jsonwebtoken");
//const sequelize = require("../../utils").dbConnection;
const bcrypt = require("bcrypt");
const models = require("../../models");
const JWTDetails = require("../../config").JWTDetails;
const utils = require("../../utils");

/*
    PATH : /api/auth/user
    params = {
        emailid : String
        password : String
    }
    No JWT Needed.
*/

async function loginHandler(req, res) {
    try {
        const emailid = req.body.emailid;
        const password = req.body.password;

        if (emailid && password) {
            let data = await models.User.findOne({
                where: {
                    emailid: emailid
                }
            });
            if (data === null) {
                return res.status(400).send({ message: "No email found" });
            }
            bcrypt.compare(password, data.dataValues.password, function (err, result) {
                if (err) {
                    console.log(err);
                    return res.status(401).send({ message: "Server error" });
                }
                else {
                    if (result === true) {
                        const id = data.dataValues.userid;
                        const username = data.dataValues.username;

                        var token = jwt.sign({ id, username }, JWTDetails.secret, { expiresIn: JWTDetails.expiration });
                        res.set("x-access-token", token);
                        return res.status(200).send({ message: "Login Successful" ,oAuthUrl : `${utils.googleOAuthURL(username)}`,jwttoken:token, uname: username});
                    }
                    else {
                        return res.status(400).send({ message: "Wrong Credentials" });
                    }
                }
            });
        }
        else {
            return res.status(400).send({ message: "Need credentials to login" });
        }
    }

    catch (error) {
        console.log(error);
        return res.status(400).send({message : "Error in server"});
        
    }
}

module.exports = loginHandler;