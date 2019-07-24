const axios = require("axios")

const api_key = process.env.ZOMATO;


const getTownId = async() =>{
    try {
       
        //get town id based on longitude and latitude
        const url = `https://developers.zomato.com/api/v2.1/cities?lat=&lon=&count=`

        const response = await axios(
                {
                    method :'get' ,
                    url , 
                    headers :{"user-key": api_key}
                }
            )

        console.log(response.data)
    } catch (e) {
        console.log(e)
    }
}

const getCategories = async() =>{
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
        
        console.log(response.data.categories)
    }catch(e){
        console.log(e)
    }
}

 const getCuisines = async({id}) =>{
     //Get cuisine types in a town
    try {
        const url = `https://developers.zomato.com/api/v2.1/cuisines?city_id=${id}`
    
        const response = await axios(
                {
                    method :'get' ,
                    url , 
                    headers :{"user-key": api_key}
                }
            )
        
         console.log(response.data.cuisines)
    } catch (e) {
       console.log(e)
    }
 }


 const searchForLocation = async ()=>{
     try {

        
     } catch (e) {
        console.log(e)
     }
 }

 //Url : /reviews : get reviews for a restaurant must include the restaurant id (res_id param) and occasionaly the start and count param to limit the number of reviews per request
 //Url /restaurant to get details about a restaurant required params res_id restaurant id

