const {faker} = require('@faker-js/faker')
const boom = require('@hapi/boom')
class UseServices{
    constructor(){
        this.users=[];
        this.generator()
    }

    generator(){
        const limit = 100
        for (let i = 0; i < limit; i++) {
            this.users.push({
                id:faker.datatype.uuid(),
                name:faker.person.fullName(),
                sex:faker.person.sex(),
                job:faker.person.jobArea()
            })   
        }
    }
    find(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.users)
            }, 1000);
        })   
    }
    async create(body){
        const newUser = {
            id:faker.datatype.uuid(),
            ... body
        }
        this.users.push(newUser)
        return newUser
    }
    async findOne(id){
        const product = this.users.find(item=>item.id==id)
        if (!product) {
            throw boom.notFound('User Not Found')
        }
        return product
    }
    async update(id,body){
        const index = this.users.findIndex(item=>item.id===id)
        if (index === -1) {
            throw boom.notFound('User Not Found')
        }
        const product = this.users[index]
        const newProduct={
            id:product.id,
            ...body
        }
        return newProduct
    }
    async updatePatch(id,body){
        const index = this.users.findIndex(item=>item.id === id)
        if (index === -1) {
            throw boom.notFound('User Not Found')
        }
        const product= this.user[index]
        const newProduct= {
            ...product,
            ...body
        }
        return newProduct
    }
    async delete(id){
        const index = this.users.findIndex(item=>item.id===id)
        if (index === -1) {
            throw boom.notFound('User Not Found')
        }
        const product = this.users.splice(index,1)
        return product
    }
}

module.exports = UseServices
