const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')
class AnimalServices{
    constructor(){
        this.animals=[],
        this.generator()
    }
    generator(){
        const limit = 100
        for (let i = 0; i < limit; i++) {
            this.animals.push({
                id:faker.datatype.uuid(),
                animal:faker.animal.type(),
                name:faker.person.firstName()
            })
            
        }
    }
    find(){
       return new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve(this.animals)
        },2000)
       })
    }
   async findOne(id){
        const animal = this.animals.find(item=>item.id === id)
        if (!animal) {
            throw boom.notFound('Animal Not Found')
        }

        return animal 

    }
    async create(body){
        const newAnimal = {
            id:faker.datatype.uuid(),
            ...body
        }
        this.animals.push(newAnimal)
        return newAnimal

    }
    async updatePatch(id,body){
        const index = this.animals.findIndex(item=>item.id===id)

        if (index === -1) {
            throw boom.notFound('Animal Not Found')
        }
        const animal = this.animals[index]
        const newAnimal ={
            ...animal,
            ...body
        }

        return newAnimal

    }
    async update(id,body){
        const index = this.animals.findIndex(item=>item.id===id)

        if (index === -1) {
            throw boom.notFound('Animal Not Found')
        }
        const animal = this.animals[index]
        const newAnimal ={
            id:animal.id,
            ...body
        }

        return newAnimal

    }
    async delete(id){
        const index = this.animals.findIndex(item=>item.id===id)

        if (index === -1) {
            throw boom.notFound('Animal Not Found')
        }
        const animal = this.animals.splice(index,1)
        return animal
        
    }


}

module.exports = AnimalServices