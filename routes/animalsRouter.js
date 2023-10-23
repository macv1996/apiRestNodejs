const express = require('express')
const router = express.Router()
const AnimalServices = require('../services/animal.service')
const service = new AnimalServices ()
const validatorHandler = require('../middlewares/validator.handler')
const { getAnimalSchema,createAnimalSchema,updateAnimalSchema} = require('../schema/animal.schema')

router.get('/',async (req,res)=>{
    const animals =  await service.find()
    res.json(animals)
})

router.get('/:id',
validatorHandler(getAnimalSchema,'params'),async (req,res,next)=>{
    try {
        const id = req.params.id
        const animal = await service.findOne(id)
        res.json(animal)
    } catch (error) {
        next(error)
    }
})


router.post('/',
validatorHandler(createAnimalSchema,'body'),
async (req,res,next)=>{
  try {
    const id = req.params.id
    const body = req.body
    const animal = await service.create(body)
    res.json({animal})
  } catch (error) {
    next(error)
  }
})

router.patch('/:id',validatorHandler(getAnimalSchema,'params'),validatorHandler(updateAnimalSchema,'body'),async (req,res,next)=>{
    try {
        const id = req.params.id
        const body = req.body
        const animal = await service.updatePatch(id,body)
        res.json({animal})
    } catch (error) {
        next(error)
    }
})

router.put('/:id',validatorHandler(getAnimalSchema,'params'),validatorHandler(createAnimalSchema,'body'),async(req,res,next)=>{
    try {
        const id = req.params.id
        const body = req.body
        const animal = await service.update(id,body)
        res.json({animal})
    } catch (error) {
        next(error)
    }
})


router.delete('/:id',validatorHandler(getAnimalSchema,'params'),async (req,res,next)=>{
    const id = req.params.id
    const animal = await service.delete(id)
    res.json({animal})
})


module.exports=router