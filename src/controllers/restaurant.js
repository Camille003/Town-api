const axios = require("axios")
const {deleteUnwantedProperties,isEmpty} = require("../utils/utils")
const api_key = process.env.ZOMATO;


exports.getTownId = async(req,res,next) =>{
    try {
       
        const count = req.query.count || 5
        //get town id based on longitude and latitude
        const url = `https://developers.zomato.com/api/v2.1/cities?lat=${req.latitude}&lon=${req.longitude}&count=${count}`

        const response = await axios(
                {
                    method :'get' ,
                    url , 
                    headers :{"user-key": api_key}
                }
            )

        if(!response.data.location_suggestions){
            return res.status(200).json({
                townInfo : 'No registered restaurant'
            })
        }
        const townInfo =  deleteUnwantedProperties(response.data.location_suggestions[0],['id','name','state_name','country_name','country_flag_url'])
        return res.status(200).json(townInfo )
    } catch (e) {
        console.log(e)
    }
}

exports.getCategories = async(req,res,next) =>{
    try{
        //Get categories and their id
        const url = `https://developers.zomato.com/api/v2.1/categories`
    
        const response = await axios(
                {
                    method :'get' ,
                    url , 
                    headers :{"user-key": api_key}
                }
            )
        
        return res.status(200).json(response.data.categories)
    }catch(e){
        console.log(e)
    }
}

exports.getCuisines = async(req,res,next) =>{
     //Get cuisine types in a town
     const id = req.query.id;
    try {
        const url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${id}`
    
        const response = await axios(
                {
                    method :'get' ,
                    url , 
                    headers :{"user-key": api_key}
                }
            )
        
         return res.status(200).json(response.data.cuisines)
    } catch (e) {
       console.log(e)
    }
 }


 exports.searchForLocation = async (req,res,next)=>{
     try {

        //Posibilities
        //q search string,
        //entity_type : zone ,town ,city , city by default
        //start & count to get  not all but some data integer
        //lat & lon is to fine-tune our results
        //cuisines from our cuines routes type of cuisines african ,chinesse string
        //category string
        //sort sorting options cost , rating string
        //order asc , dec string
        const params = deleteUnwantedProperties(req.query,['q','entity_type','sort','cuisines','category','order','start','count']);
        
        for(let [key,value] in Object.entries(params)){
            if(key == 'start' || key == 'count'){
                params[key] = parseInt(value)
            }
        }

        const url = `https://developers.zomato.com/api/v2.1/search?entity_type=city`

        params.lat = req.latitude;
        params.lon = req.longitude;
    
        const response = await axios(
                {
                    method :'get' ,
                    url , 
                    headers :{"user-key": api_key},
                    params
                }
            )
     
        
       if(!response.data.restaurants.length){
           return res.status(200).json()
       }
        response.data.restaurants.forEach(el => delete el.restaurant.apikey)
       return res.status(200).json(response.data)
        
     } catch (e) {
        console.log(e.message)
     }
 }
  //Url /restaurant to get details about a restaurant required params res_id restaurant id
  exports.getRestaurant = async(req,res,next) =>{
      try {

        const res_id = req.params.res_id

        const url = `https://developers.zomato.com/api/v2.1/restaurant?res_id=${res_id}`
    
        const response = await axios(
                {
                    method :'get' ,
                    url , 
                    headers :{"user-key": api_key}
                }
            )

        
        if(isEmpty(response.data)){
            return res.status(200).json()
        }
        return res.status(200).json(response.data)
        
      } catch (e) {
      
      }
  }

 //Url : /reviews : get reviews for a restaurant must include the restaurant id (res_id param) and occasionaly the start and count param to limit the number of reviews per request
 exports.getRestaurantReviews = async(req,res,next) =>{
    try {

      const res_id = req.params.res_id

      const params = deleteUnwantedProperties(req.query,['start','count']);

      for(let [key,value] in Object.entries(params)){
        if(key == 'start' || key == 'count'){
            params[key] = parseInt(value)
        }
      }

      const url = `https://developers.zomato.com/api/v2.1/reviews?res_id=${res_id}`
  
      const response = await axios(
              {
                  method :'get' ,
                  url , 
                  headers :{"user-key": api_key}
              }
          )

      
      if(isEmpty(response.data)){
          return res.status(200).json()
      }
      return res.status(200).json(response.data)
      
    } catch (e) {
    
    }
}


