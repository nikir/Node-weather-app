const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT ||3000  //to fetch the port from the environment var

//Define Path for Expess config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//setup for handlebars engine and views location
app.set('view engine', 'hbs')//to set the handlebars in express
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
//it is used to customise your server
app.use(express.static(publicDirectoryPath))

// app.get('',(req, res)=>{
//     res.send('<h1>weather</h1>')
// })

// app.get('/help',(req, res)=>{
//     res.send({
//         name:'nikhil',
//         city:'pune'
//     })
// })


// app.get('/about',(req, res)=>{
//     res.send('<h1>about page</h1>')
// })

app.get('',(req, res)=>{
    res.render('index',{
        title:'weather App',
        name:'nikhil'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About me',
        name:'nikhill'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'we are going to moon, once again'
    })
})

app.get('/weather',(req, res)=>{
    if (!req.query.address){
        return res.send({
            error:'You must provide a address'
        })
    }

    geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            //console.log(longitude)
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })


    // res.send({
    //     forecast:'it is very hot here',
    //     location:'delhi',
    //     address:req.query.address
    // })
})

app.get('/products',(req, res)=>{
    if (!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'nikhil',
        errorMessage:'Help article not found'
    })

})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'nikhil',
        errorMessage:'Page not found'
    })
})

app.listen(port, ()=>{
    console.log('server is running at port '+ port)
})