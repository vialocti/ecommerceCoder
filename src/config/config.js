import dotenv from 'dotenv'

export const getVaribles=(options)=>{
    //console.log(options.opts().mode)    
    const environmet = options.opts().mode
        dotenv.config({
            path:environmet==='production' ? './.env.production' : './.env.development'
        })
        return {
            PORT : process.env.PORT,
            mongoURL : process.env.mongoURL,
            tokenSecret : process.env.tokenSecret

        }
}
