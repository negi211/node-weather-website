
const request = require('request');

const forecast = (longitude,latitude,callback)=>{
    const url ='http://api.weatherstack.com/current?access_key=ae1ea3603152811e711ce82a2c557d00&query='+longitude+','+latitude+'&units=m';

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect with serivices!',undefined)
        }else if(body.error){
            callback('No location found. Try again',undefined)    
        }else{
            callback(undefined, body.current.weather_descriptions[0] + '. Its currently '+ body.current.temperature+' c ' + '*'+ body.current.weather_icons)
        }
        

    })

}

module.exports = forecast