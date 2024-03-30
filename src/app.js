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
import { Command } from 'commander'
import { getVaribles } from './config/config.js'


//options de linea de comando
const program = new Command()

program.option('--mode <mode>','modo de trabajo', 'production')
const options = program.parse()
const { PORT, mongoURL, tokenSecret }= getVaribles(options)

//set
const port=PORT || 8081
const app=express() //inicializamos app de tipo express

//session

app.use(session({
    secret:tokenSecret,
    //store:new fileStore({path:'./sessions', ttl:30, retries:0}),
    store:MongoStore.create({
        mongoUrl:mongoURL,
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




//handlerbars-mongo
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

//coneccion de db mongo
mongoose.connect(mongoURL)
.then(()=>{console.log('Connect to MongoAtlas')})
.catch(error=>{console.log(error)})


//ponemos el servidor a escuchar por el puerto 8080
app.listen(PORT, ()=>{
    console.log(`Server runnig in port ${port}`)
})

