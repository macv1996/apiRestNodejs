const express = require('express');
const cors = require('cors')
const routerApi = require('./routes/index');
const {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/error.handler')
const app =  express();
const port=3000;
app.use(express.json())
app.get('/',(req,res)=>{
  res.send('Este es mi server en express')
})
const whitelist =['http://localhost:3000','http://127.0.0.1:5500']
const options={
  origin:(origin,callback)=>{
    if (whitelist.includes(origin)) {
        callback(null,true)
    }else{
        callback(new Error('No permitido')) 
    }
  }
}
app.use(cors())


routerApi(app)
//los middlewares van despues del routin
// en orden en lo que se van a ejecutar
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)



app.listen(port,()=>{
  console.log('mi puerto es' + port);
})
