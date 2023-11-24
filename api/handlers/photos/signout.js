const models = require("../../models");

async function signoutHandler(req,res){
    const model = models.Authtoken;
    const username = res.locals.username;

    try{
        const data = await model.findOne({
            where : {
                username : username
            }
        });
        if(data){
            await model.destroy({
                where : {
                    username : username
                }
            });
            console.log("\naccess token deleted");
        }
        return res.status(200).send({message : "Logout Successful", invalidToken : "invalid"});
    }catch(err){
        console.log(err);
        return res.status(401).send({message : "Logout Failed."});
    }
}

module.exports = signoutHandler;