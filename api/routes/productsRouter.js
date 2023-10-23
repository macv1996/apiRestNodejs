const express = require('express');
const ProductServices= require('../services/product.service')
const router =  express.Router();
const service = new ProductServices()
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema,updateProductSchema,getProductSchema}=require('../schema/product.schema')

router.get('/',
  async (req,res)=>{
  const products = await service.find()
  res.status(200).json(products)
  });

router.get("/:id",
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
  try {
    const id = req.params.id
    const product = await service.findOne(id)
    res.status(200).json(product)
  } catch (error) {
    next(error)
  }
  }); 

router.post('/',
  validatorHandler(createProductSchema,'body'),
  async (req,res)=>{
    const body = req.body;
    const product = await service.create(body);
    res.status(201).json(product)
  })

router.put('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(createProductSchema,'body'),
  async (req,res,next)=>{
    try {
      const id = req.params.id
      const body = req.body
      const product = await service.update(id,body)
      res.status(200).json({product})
    } catch (error) {
      next(error)
    }
  })

router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async (req,res,next)=>{
  try {
    const body = req.body;
    const id = req.params.id || null
    const product= await service.updatePatch(id,body)
    res.status(200).json({product})
  } catch (error) {
    next(error)
  }
  })

router.delete('/:id',
  validatorHandler(getProductSchema,'params'),
  async (req,res,next)=>{
    try {
      const id = req.params.id
      const product = await service.delete(id)
      res.status(200).json({product})
    } catch (error) {
      next(error)
    }
  })

module.exports =router;

