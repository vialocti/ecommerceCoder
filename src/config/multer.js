import multer from 'multer'


//configuracion de multer uoload de archivos

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/imgs')//donde se almacenan las imagenes
    },
    filename:(req,file,cb)=>{
        const fileName=Date.now() + file.originalname
        cb(null, fileName)
    }
});

export const uploader = multer({storage})