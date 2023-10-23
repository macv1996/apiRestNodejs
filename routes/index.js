const express = require('express');

const productsRouter = require('./productsRouter');
const usersRouter= require('./usersRouter');
const animalsRouter = require('./animalsRouter')


function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1',router)
    router.use('/products',productsRouter);
    router.use('/users',usersRouter);
    router.use('/animals',animalsRouter)
}

module.exports = routerApi
