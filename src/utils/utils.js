const isEmpty = (entity)=>{
    if(Array.isArray(entity)){
        return entity.length == 0 ? true : false; 
    }
    const objectArray = Object.keys(entity)
    return objectArray.length == 0 ? true : false; 
}

const copy = (entity) => {
    if(Array.isArray(entity)){
        return [...entity]; 
    }
    return {...entity}
}
const deleteUnwantedProperties = (object , arrayOfProperties) =>{

    for(let key of Object.keys(object)){
        if(!arrayOfProperties.includes(key)){
            delete object[key];
        }
        continue
    }

    return object;
}



const max = (array,property) =>{
    const newArr = [...array];
   
    newArr.sort((a,b) => {
        return b[property] - b[property]
    })

    const max = newArr[0][property]

    return max
}

//min
const min = (array,property) =>{
    const newArr = [...array];
   
    newArr.sort((a,b) => {
        return a[property] - b[property]
    })

    const min = newArr[0][property]

    return min  
}

//iterate
const getAverage = (array,property)=>{
    const length = array.length
    let sum = 0
    for(let counter = 0 ; counter < length ; counter++){
            sum += array[counter][property];  
    }
    return sum / length;
}

module.exports = {
    copy,
    deleteUnwantedProperties,
    max,
    min,
    getAverage,
    isEmpty
}



 // summary.description = response.data.currently.summary
        // summary.temperature = response.data.currently.temperature;
        // summary.windSpeed = response.data.currently.windSpeed
        // summary.precipIntensity =  response.data.currently.precipIntensity
        // summary.precipProbability = response.data.currently.precipProbability
        // summary.humidity = response.data.currently.humidity
