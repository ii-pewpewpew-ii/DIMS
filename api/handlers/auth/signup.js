const {User,UserProfile} = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/*
    PATH : /api/auth/signup
    params = {
        emailid : String
        password : String
        firstname : string
        lastname : string (optional)
        username : string (unique)
    }
    No JWT Needed.
*/

async function signupHandler(req,res) {
    
    try{
        const emailid = req.body.emailid;
        const password = req.body.password;
        const firstname = req.body.firstname;
        const lastname = (req.body.lastname === undefined) ? null :  req.body.lastname;
        const username = req.body.username;

        let data = await User.findOne({
            where : {
                emailid : emailid
            }
        });
        if(data !== null) {
            return res.status(400).send({message : "email already registered"});
        }
        data = await User.findOne({
            where : {
                username : username
            }
        })
        if(data !== null){
            return res.status(400).send({message : "username already registered"});
        }

        bcrypt.genSalt(saltRounds,async (err,salt) => {
            if(err){
                console.log(err);
                return res.status(400).send({message : "Server Error"});
            }

            bcrypt.hash(password,salt,async (err,hash) =>{
                if(err){
                    return res.status(400).send({message : "Server Error"});
                }

                else{
                    const data1 = await User.create({
                        emailid : emailid,
                        password : hash,
                        username : username

                    })
                    const data2 = await UserProfile.create({
                        username : username,
                        firstname : firstname,
                        lastname :lastname
                    })
                    return res.status(200).send({message : "Success"});
                }
            });
        });
    }
    catch(err){
        console.log(err);
        return res.status(400).send({message : "Server Error, Try again later"});
    }
}

module.exports = signupHandler;