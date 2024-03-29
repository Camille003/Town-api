
const axios = require("axios");

const {deleteUnwantedProperties,copy,max,min,getAverage} = require("../utils/utils");
    
const getWeatherForecast = async (req,res,next) =>{

     const {mode='currently',units='si',language='en'} = req.query
    


     try {
            let summary = {}
            summary.town = req.placeName;
            console.log(req.latitude,req.longitude)

            if(mode == 'currently'){
                const excludes = ['hourly','minutely','daily'];

                const response = await axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY}/${parseFloat(req.latitude)},${parseFloat(req.longitude)}?exclude=${[excludes].join(",")}&lang=${language}&units=${units}`)

                //copy the data of object to summarry
                summary = copy(response.data.currently)

                const wantedProperties = ['summary','temperature','windSpeed','precipIntensity','precipProbability','humidity','icon'];

                    //delete unwanted properties from summary object
                summary = deleteUnwantedProperties(summary,wantedProperties)

                
            }else if (mode == 'daily'){
                const excludes = ['hourly','minutely','currently'];

                const response = await axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY}/${req.latitude},${req.longitude}?exclude=${[excludes].join(",")}&lang=${language}&units=${units}`)

                //copy the data of object response.data.daily[0] to summary object
                summary = copy(response.data.daily.data[0])

                //delete unwanted properties from summary object
                const wantedProperties = ['apparentTemperatureMin','precipType','humidity','apparentTemperatureMax','windSpeed','precipIntensity','precipProbability'];
                summary = deleteUnwantedProperties(summary,wantedProperties)

                //add extra properties that lived on the daily object directly
                summary.description = response.data.daily.summary
                summary.icon = response.data.daily.icon
                

            }else if(mode == "weekly"){
                const excludes = ['hourly','minutely','currently'];

                const response = await axios.get(`https://api.darksky.net/forecast/${process.env.DARK_SKY}/${parseFloat(req.latitude)},${parseFloat(req.longitude)}?exclude=${[excludes].join(",")}&lang=${language}&units=${units}`)



                const array = response.data.daily.data

                summary.apparentTemperatureMin = min(array,'apparentTemperatureMin')
                summary.apparentTemperatureMax = max(array,'apparentTemperatureMax')

                summary.windSpeed              = getAverage(array,'windSpeed')
                summary.precipIntensity        = getAverage(array,'precipIntensity')
                summary.humidity               = getAverage(array,'humidity')
                summary.precipProbability      = getAverage(array,'precipProbability')

                summary.description            = response.data.daily.summary
                summary.icon                   = response.data.daily.icon

            }

            return res.status(200).json({
                forecast : summary
            })
     } catch (e) {
        console.log(e.message)    
    }
}
module.exports = getWeatherForecast


