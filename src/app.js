import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport';
import initializePassport from './config/passport.config.js'

import cartsRoutes from './routes/carts.routes.js'
import productsRoutes from './routes/productos.routes.js'
import viewsRoutes from './routes/views.routes.js'
import sessionsRoutes from './routes/sessions.routes.js'

//set
const PORT=8080
const app=express() //inicializamos app de tipo express

//session

app.use(session({
    secret:'P6puGom4z',
    //store:new fileStore({path:'./sessions', ttl:30, retries:0}),
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://api-directo:FTtayuVRLQw3y70i@cluster0.7tefz.mongodb.net/ecommerce?retryWrites=true&w=majority',
        ttl:60 * 60 //una hora
    }),
    resave:true,
    saveUninitialized:true

}))

//
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//
app.use(express.static('public')) //los archivos estaticos estan en public
app.use(express.json()) //
app.use(express.urlencoded({extended:true}))//




//handlerbar-mongo
const hbs=handlebars.create({
    runtimeOptions:{
        allowProtoPropertiesByDefault:true
    }
})

//configuracion del motor de plantilla handlebars
app.engine('handlebars', hbs.engine)
app.set('views', 'src/views')
app.set('view engine', 'handlebars')



//routes
app.use('/api/carts',cartsRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/sessions', sessionsRoutes)
app.use('/views',viewsRoutes)




//
mongoose.connect('mongodb+srv://api-directo:FTtayuVRLQw3y70i@cluster0.7tefz.mongodb.net/ecommerce?retryWrites=true&w=majority')
.then(()=>{console.log('Connect to MongoAtlas')})
.catch(error=>{console.log(error)})


//ponemos el servidor a escuchar por el puerto 8080
app.listen(PORT, ()=>{
    console.log(`Server runnig in port ${PORT}`)
})

//https://github.com/vialocti/ecommerceCoder.git