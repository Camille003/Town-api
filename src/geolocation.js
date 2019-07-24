const axios = require('axios')

//const getWeather = require("./forecast")
//This function present a list of relevant places to the user input
//Used for geocoding and getting latitudes and longitudes of future  request 
const {deleteUnwantedProperties} = require("./utils/utils")

const access_token = process.env.MAP_BOX;

const getCountriesCoordinates = async ({place}) =>{

    try{

     //get countries coordinates
     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${access_token}&autocomplete=true&types=place&limit=10&language=en`

     const response = await axios.get(url)

     //get only wanted properties and delete the rest
     const copiedData = response.data.features.map(el => deleteUnwantedProperties(el,['center','bbox','place_name']));

     //data to be used ; location will be selected from this Array
     console.log(copiedData)
    
    }catch(e){
        console.log(e)
    }
}

getCountriesCoordinates({place : 'America , New York City '})



