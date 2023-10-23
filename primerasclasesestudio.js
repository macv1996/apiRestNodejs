// const express = require('express');
// const {faker} =require('@faker-js/faker')
// const app =  express();
// const port=3000;

app.get('/',(req,res)=>{
  res.send('Hola mi server en express')
})

app.get('/nueva-ruta',(req,res)=>{
  res.send('Hola soy una nueva ruta')
})


app.get('/products',(req,res)=>{
  const products =[];
  for (let i = 0; i < 100; i++) {
    products.push({
      name:faker.commerce.productName(),
      price:parseInt(faker.commerce.price(),10),
      image:faker.image.url()
    })

  }
  res.json(products)
})
//todo lo que es especifico debe ir antes de lo dinamico para que
//no se tenga el problema del filter con el id
app.get('/products/filter',(req,res)=>{
  res.send('soy un filter')
})

// se pone : porque significa que va ser un parametro
app.get("/products/:id",(req,res)=>{
  const id = req.params.id
  // es otra manera utilizando destructuracion
  // const  {id} = req.params;
  res.json(
    {
      id,
      name:'producto2',
      price:2000

    }
  )
})

app.get('/productos',(req,res)=>{
  const productos=[]
  const {size}=req.query;
  const limit = size || 10;

  for (let i = 0; i < limit; i++) {

    productos.push({
      name:faker.commerce.product()
    })
  }
  if (limit) {
    res.json(productos)
  }

})




app.get('/categories',(req,res)=>{
  res.json({
    categories:['ufc,liga bbva']
  })

})

app.get('/categories/:categoryid/products/:id',(req,res)=>{
  const  {categoryid,id} = req.params;
  res.json(
    {
      categoryid,
      id,
      name:'producto2',
      price:2000

    }
  )
})
//como se veria el url con los parametros
//http://localhost:3000/users?limit=10&offset=200

app.get('/users',(req,res)=>{
const {limit,offset}=req.query;
if (limit && offset) {
  res.json({
    limit,
    offset
  })
} else{
  res.json('no hay parametros')
}


})


app.listen(port,()=>{
  console.log('mi puerto es' + port);
})
