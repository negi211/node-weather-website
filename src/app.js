const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000




// Define paths for express config 
const publicDirPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views loaction
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'suraj negi'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About section',
        name: 'suraj negi'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help section',
        name: 'suraj negi'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address)
    {
        return res.send({
            error:'you must provide address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {res.send({error})}

        forecast(latitude,longitude,(error,forecastData)=>{
            res.send({
                forecast: forecastData, 
                location,
                address:req.query.address
            })
        })
    })

})

app.get('/404error',(req,res)=>{
    res.send('page not found')
})

app.get('/help/*',(req,res)=>{
    res.render('404error',{
        title:'404 page',
        name:'Suraj Negi',
        errorMessage:'Help page not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404error',{
        title:'404 page',
        name:'Suraj Negi',
        errorMessage:'Page not found'
    })
})



app.listen(port,()=>{
    console.log('server is up on port ' +port)
})