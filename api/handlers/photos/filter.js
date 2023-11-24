const {createRequestParams} = require("../../utils")
// const fs=require('fs')
const fs=require('fs-extra')
const {stringify}=require('json5')
const models = require("../../models");
const axios = require("axios");
const apiURL = "https://photoslibrary.googleapis.com/v1/mediaItems:search";
const Authtoken = models.Authtoken;

const FILE_PATH='../frontend/src/data/userCreated.json'

async function handleFilter(req,res){
    const username = req.body.username;
    // const access_token=req.headers.authorization
    // console.log(username)
    var params = createRequestParams(req,res);
    console.log(params)
    const data = await Authtoken.findOne({
        where : {
            username : username
        }
    });
    if(!data){
        return res.status(400).send({message : "No Access-Token found. Sign in to google for accessing photos"});
    }
    const access_token = data.dataValues.access_token;
    console.log(username, access_token,params)
    
    // Code for fetching all the image URLs from google photos API.
    const googlePhotosResponse = await axios.post(apiURL,{
        "filters":params
    },{
        // params : params,
        headers : {
            Authorization : `Bearer ${access_token}`
        }
    },(err)=>{
        console.error("HEY ERROR");
    });
    // console.log(googlePhotosResponse)
    const mediaItems = googlePhotosResponse.data.mediaItems;
    // console.log(mediaItems)
    if(!mediaItems){
        console.log("No images found");
        return res.status(200).send({message : "No images"})
    }
    var photosURL = [];
    mediaItems.forEach((mediaItem)=>{
        let baseUrl = mediaItem.baseUrl+'=d';
        photosURL.push(baseUrl);
    })
    return res.status(200).send({baseUrls : photosURL,access_token : access_token});
}

async function handleAllFilter(req,res){
    const username = req.body.username;
    // const access_token=req.headers.authorization
    // console.log(username)
    var params = createRequestParams(req,res);
    console.log(params)
    const data = await Authtoken.findOne({
        where : {
            username : username
        }
    });
    if(!data){
        return res.status(400).send({message : "No Access-Token found. Sign in to google for accessing photos"});
    }
    const access_token = data.dataValues.access_token;
    console.log(username, access_token,params)
    
    // Code for fetching all the image URLs from google photos API.
    const googlePhotosResponse = await axios.post(apiURL,{
        "filters":params
    },{
        // params : params,
        headers : {
            Authorization : `Bearer ${access_token}`
        }
    },(err)=>{
        console.error("HEY ERROR");
    });
    // console.log(googlePhotosResponse)
    const mediaItems = googlePhotosResponse.data.mediaItems;
    // console.log(mediaItems)
    if(!mediaItems){
        console.log("No images found");
        return res.status(200).send({message : "No images"})
    }
    var photosURL = [];
    mediaItems.forEach((mediaItem)=>{
        let baseUrl = mediaItem.baseUrl+'=d';
        let id=mediaItem.id;
        photosURL.push({baseUrl, id});
    })
    return res.status(200).send({mediaData : photosURL,access_token : access_token});
}

async function writeIntoFile(req,res){
    // console.log(req.body.data)
    const catName=req.body.data.categoryname;
    const images=req.body.data.images;
    console.log(process.cwd())
    try {
        fs.readJSON(FILE_PATH,(err, data)=>{
            if(err) return console.error(err)
            const catKeys=Object.keys(data)
            if(catKeys.length>0){
                const catValues=Object.values(data)
                let temp={}
                catKeys.forEach((e)=>{
                    temp[e]=data[e]
                })
                temp[catName]=images
                console.log(temp)
                fs.outputJSON(FILE_PATH,
                   temp
                    );
            }
            else{
                fs.outputJSON(FILE_PATH,
                    {
                        [catName]:images
                    });
            }
            
        })
        
        // file written successfully
    } catch (err) {
        console.error(err);
    }
    return res.status(200).send({message:"success"})
}
module.exports = { handleFilter, handleAllFilter, writeIntoFile};