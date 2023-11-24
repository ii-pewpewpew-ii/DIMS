const express = require("express")
const cors=require('cors')
const app = express()
const utils =require('./utils')
const routes = require("./routes");

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

utils.dbConnection.sync().then(()=>{    
    console.log("Database synced");
}).catch((err) => {
    console.log(err);
})

app.use("/api/auth",routes.authRoutes);

app.use("/api/sessions",routes.oauthRoutes);

app.get('/',(req,res)=>{
    res.write(`<a href = ${utils.googleOAuthURL()}> Click to connect to google photos </a>`);
    res.end();
    return res;
})


app.use((req,res,next) => {

    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    // console.log("TOKEN AH?",token,req.get("x-access-token"), res.get("x-access-token"),req.body.access_token)

    if(!token || token == "Bearer no_token"){
        return res.status(400).send({message : "token required"});
    }
    const data = utils.verifyToken(token);
    console.log(data)
    if(data){
        res.locals.id = data.id;
        res.locals.username = data.username;
    }
    else{
        return res.status(401).send({message : "Token invalid. Sign in again to continue",invalidToken : "invalid"});
    }
    next();
});

app.use("/api/user",routes.userRoutes);


app.listen(8080,()=>console.log("Server Listening on port 8000 : http://localhost:8080"));
