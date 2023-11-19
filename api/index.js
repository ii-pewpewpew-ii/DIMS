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

app.get('/',(req,res)=>{
    res.write(`<a href = ${utils.googleOAuthURL()}> Click to connect to google photos </a>`);
    res.end();
    return res;
})

app.use((req,res,next) => {

    const token = req.headers.authorization;

    if(!token || token == "Bearer no_token"){
        return res.status(400).send({message : "token required"});
    }
    const data = utils.verifyToken(token);

    if(data){
        res.locals.id = data.id;
        res.locals.username = data.username;
    }
    else{
        return res.status(401).send({message : "Token invalid. Sign in again to continue"});
    }

})

app.use("/api/user",routes.userRoutes);



app.listen(8080,()=>console.log("Server Listening on port 8000 : http://localhost:8080"));
