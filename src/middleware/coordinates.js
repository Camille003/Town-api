const isCoordinates = (req,res,next)=>{
    try {
        const coordinatesHeader = req.get('coordinates')

        if(!coordinatesHeader){
            throw new Error("Invalid Input");
        }
        const [latitude,longitude,...place] = coordinatesHeader.split(",");
    
        const placeName = place.join(",")
        if(!latitude || !longitude || !placeName){
            throw new Error("Invalid Input")
        }
        req.latitude = latitude;
        req.longitude = longitude;
        req.placeName = placeName;

       
        return next()
    } catch (e) {
    
        console.log(e)
    }
}

module.exports = isCoordinates;