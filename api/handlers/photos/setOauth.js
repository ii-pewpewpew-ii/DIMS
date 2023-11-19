const sequelize = require("sequelize");
const models = require("../../models");
const { user } = require("../../config/db");

async function handleSetOauth(req, res) {

    const username = req.locals.state;
    const token = req.body.access_token;
    const model = models.Authtoken;

    if (!token) {
        return res.status(400).send({ message: "Google auth token missing" });
    }
    if(!username){
        return res.status(400).send({message : "Error in verifying token"});
    }
    let data = await model.findOne({
        where: {
            username: username
        }
    });
    if(data === null){
        await model.create({
            username : username,
            access_token : token
        });
    }else{
        data.access_token = token;
        await data.save();
    }
    return res.status(200).send({message : "Access token updated"});
}

module.exports =  handleSetOauth;