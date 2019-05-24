const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlraGlsMjQiLCJhIjoiY2p2ejE2MXU1MGp6cjQ0bXE1ZWMwOGpjcCJ9.g2U7zXEI2o9hb9bV2GC3Ew'

    request({url:url, json: true}, (error, response)=>{
      if(error){
        callback('unable to connect to the server!', undefined)
      }else if(response.body.features.length===0){
        callback('Unable to find location. Try another search',undefined)

      }else{
        callback(undefined,{
          latitude: response.body.features[0].center[1],
           longitude: response.body.features[0].center[0],
           location: response.body.features[0].place_name
        })
      }
    })
}


module.exports= geocode 