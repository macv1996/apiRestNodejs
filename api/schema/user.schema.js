const Join = require('joi')

const id = Join.string().uuid()
const name = Join.string().min(3).max(15)
const sex = Join.string().min(3).max(15)
const job = Join.string().min(3).max(20)

const createUserSchema = Join.object({
    name:name.required(),
    sex:sex.required(),
    job:job.required()
})

const updateUserSchema = Join.object({
    name:name,
    sex:sex,
    job:job
})

const getUserSchema = Join.object({
    id:id.required(),
})




module.exports = {createUserSchema,updateUserSchema,getUserSchema}