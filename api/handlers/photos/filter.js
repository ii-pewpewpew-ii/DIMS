const {createRequestParams} = require("../../utils")
const models = require("../../models");
const axios = require("axios");
const apiURL = "https://photoslibrary.googleapis.com/v1/mediaItems:search";
const Authtoken = models.Authtoken;


async function handleFilter(req,res){
    const username = req.locals.username;
    var params = createRequestParams(req,res);
    const data = await Authtoken.findOne({
        where : {
            username : username
        }
    });
    if(!data){
        return res.status(400).send({message : "No Access-Token found. Sign in to google for accessing photos"});
    }
    const access_token = data.dataValues.access_token;
    
    // Code for fetching all the image URLs from google photos API.
    const googlePhotosResponse = await axios.post(apiURL,{params : params,headers : {authorization : `bearer ${access_token}`}},(err)=>{
        console.error(err);
    });
    const mediaItems = googlePhotosResponse.json().data.mediaItems;
    if(!mediaItems){
        console.log("Error fetching media items");
        return res.status(400).send({message : "Error fetching media items"})
    }
    var photosURL = [];
    mediaItems.forEach((mediaItem)=>{
        let baseUrl = mediaItem.baseUrl+'=d';
        photosURL.push(baseUrl);
    })
    return res.status(200).send({baseUrls : photosURL,access_token : access_token});
}

module.exports = handleFilter;