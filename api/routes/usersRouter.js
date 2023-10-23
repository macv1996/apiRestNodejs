const express = require('express')
const router = express.Router()
const UseServices = require('../services/user.service')
const validatorHandler = require('../middlewares/validator.handler');
const {createUserSchema,updateUserSchema,getUserSchema}=require('../schema/user.schema')
const service= new UseServices()

router.get('/', async (req,res)=>{
    try {
        const users = await service.find()
        res.status(200).json(users)
    } catch (error) {
        
    }
})
router.get('/:id',async (req,res)=>{
   try {
        const id = req.params.id;
        const user = await service.findOne(id)
        res.status(200).json(user)
   } catch (error) {
    
   }
})
router.post('/',async (req,res)=>{
    try {
        const body = req.body;
        const product = await service.create(body)
        res.status(201).json({product})
    } catch (error) {
        
    }
})
router.put('/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const body = req.body;
        const product = await service.update(id,boyd)
        res.status(200).json(product)
    } catch (error) {
        
    }
})
router.patch('/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        const body = req.boyd;
        const product = await service.updatePatch(id,body);
        res.status(200).json(product)
    } catch (error) {
        
    }
})
router.delete('/:id',async (req,res)=>{
    try {
        const id = req.params.id
        const product = await service.delete(id)
        res.status(200).json(product)
    } catch (error) {
        
    }
})




module.exports = router