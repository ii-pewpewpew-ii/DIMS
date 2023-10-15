const express = require("express")
const app = express()
const utils =require('./utils')

app.get('/',(req,res)=>{
    res.write(`<a href = ${utils.googleOAuthURL()}> Click to connect to google photos </a>`);
    res.end();
    return res;
})

app.listen(8080,()=>console.log("Server Listening on port 8000 : http://localhost:8080"));
