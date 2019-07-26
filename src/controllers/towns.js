const axios = require('axios')
const {deleteUnwantedProperties} = require("../utils/utils");

const access_token = process.env.MAP_BOX;

exports.getTowns = async (req,res,next) =>{

    try{

     const place = req.query.place
     //get countries coordinates
     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${access_token}&autocomplete=true&types=place&limit=10&language=en`

     const response = await axios.get(url)

     //get only wanted town name and delete the rest
     const copiedData = response.data.features.map(el => deleteUnwantedProperties(el,['place_name']));
     //const copiedData = response.data.features.map(el => deleteUnwantedProperties(el,['center','bbox','place_name']));

     //data to be used ; location will be selected from this Array
     return res.status(200).json({
         location : copiedData
     })
    
    }catch(e){
        console.log(e)
    }


}
exports.getCoordinates = async (req,res,next) =>{

    try{

     const place = req.params.place
     //get countries coordinates
     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${access_token}&autocomplete=true&types=place&limit=1&language=en`

     const response = await axios.get(url)

     //get only wanted town name and delete the rest
     const copiedData = response.data.features.map(el => deleteUnwantedProperties(el,['center','bbox','place_name']));

     //data to be used ; location will be selected from this Array
     return res.status(200).json({
         location : copiedData[0]
     })
    
    }catch(e){
        console.log(e)
    }


}