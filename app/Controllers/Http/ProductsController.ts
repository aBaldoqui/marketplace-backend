import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Store from 'App/Models/Store'

export default class ProductsController {

    public async index({request}:HttpContextContract){
        if(request.qs().storeid == "all") return Product.all()
        const store = await Store.findOrFail(request.qs().storeid)

        await store.load('product')
        return store
    }

    public async store({auth,request,response}:HttpContextContract){
        const {id} = await auth.use("api").authenticate()
        const store = await Store.findOrFail(request.input("store_id"))
        if(id!=store.user_id) return response.forbidden()

        const product = await Product.create({
            "name":request.input("name")
        })

        await product.related('store').associate(store)
        
        return product
    }

    public async show({request}:HttpContextContract){        
        const product = await Product.findOrFail(request.param('id'))
        return product
    }

    public async update({auth, request, response}:HttpContextContract){
        const {id} = await auth.use("api").authenticate()
        const product = await Product.findOrFail(request.param('id'))
        if(id!=product.store.user_id) return response.forbidden() 

        const body = request.only(['name'])
        
        await product.merge(body).save()
        return product
    }

    public async destroy({auth,request, response}:HttpContextContract){
        const {id} = await auth.use("api").authenticate()
        const product = await Product.findOrFail(request.param('id'))

        if(product.store.id != id) return response.forbidden()

        await product.delete()

        return product
    }

}
