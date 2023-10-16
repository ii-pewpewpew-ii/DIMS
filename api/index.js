const express = require("express")
const app = express()
const utils =require('./utils')
const routes = require("./routes");
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

utils.dbConnection.sync().then(()=>{    
    console.log("Database synced");
}).catch((err) => {
    console.log(err);
})
app.get('/',(req,res)=>{
    res.write(`<a href = ${utils.googleOAuthURL()}> Click to connect to google photos </a>`);
    res.end();
    return res;
})

app.use("/api/auth",routes.authRoutes);

app.listen(8080,()=>console.log("Server Listening on port 8000 : http://localhost:8080"));
