const request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f622e10a20d4e7d341e4e89f1b7de8a6/'+latitude+','+longitude+'?units=si'
    request({url:url, json:true},(error,response) => {
        if(error){
            callback('Unable to connect to service',undefined)
        }else if(response.body.error){
            callback('Unable to find location', undefined)
        }else {
            callback(undefined,response.body.daily.data[0].summary + 'It is currently '+response.body.currently.temperature + ' degree centigrade. There is a '+response.body.currently.precipProbability+' chance of rain.')
        }
    })
}





module.exports =forecast