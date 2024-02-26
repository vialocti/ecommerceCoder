import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import handlebars from 'express-handlebars'
import mongoose from 'mongoose';
import sessionsRoutes from './routes/sesions.routes.js';
import viewsRoutes from './routes/views.routes.js';

import passport from 'passport';
import initializePassport from './config/passport.config.js';


const PORT=8080;
const app = express()


app.use(session({
    secret:'P6puGom4z',
    //store:new fileStore({path:'./sessions', ttl:30, retries:0}),
    store:MongoStore.create({
        mongoUrl:'mongodb+srv://api-directo:FTtayuVRLQw3y70i@cluster0.7tefz.mongodb.net/ecommerce?retryWrites=true&w=majority',
        ttl:60 //un minuto
    }),
    resave:true,
    saveUninitialized:true
}));

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



//handlerbar-mongo
const hbs=handlebars.create({
    runtimeOptions:{
        allowProtoPropertiesByDefault:true
    }
})
//motor
app.engine('handlebars', hbs.engine);
app.set('views', 'src/views');
app.set('view engine', 'handlebars')


//routes

app.use('/api/sessions', sessionsRoutes);
app.use('/views', viewsRoutes)




//coneccion a mongo atlas

mongoose.connect('mongodb+srv://api-directo:FTtayuVRLQw3y70i@cluster0.7tefz.mongodb.net/ecommerce?retryWrites=true&w=majority')
.then(()=>{console.log('Connect to MongoAtlas')})
.catch(error=>{console.log(error)})

app.listen(PORT, ()=>{
    console.log(`server runing in port ${PORT}`);
});
