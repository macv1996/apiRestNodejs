const Joi = require('joi')

const id = Joi.string().uuid()
const animal = Joi.string()
const name = Joi.string().min(2)

const getAnimalSchema = Joi.object({
    id:id.required()
})

const createAnimalSchema = Joi.object({
    animal:animal.required(),
    name:name.required()
})

const updateAnimalSchema = Joi.object({
    animal:animal,
    name:name
})

module.exports ={ getAnimalSchema,createAnimalSchema,updateAnimalSchema}