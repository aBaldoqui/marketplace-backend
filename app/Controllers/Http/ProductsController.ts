import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import Store from 'App/Models/Store'

export default class ProductsController {

    public async index({request}:HttpContextContract){
        const products = await Product.all()

        return products
    }

    public async store({auth,request}:HttpContextContract){

        const user = await auth.use("api").authenticate()

        const store = await Store.findOrFail(request.input("store_id"))
        
        const product = await Product.create({
            "name":request.input("name")
        })

        await product.related('store').associate(store)
    }

    public async show({request}:HttpContextContract){        
        const product = await Product.findOrFail(request.param('id'))
        return product
    }

    public async update({request}:HttpContextContract){
        const product = await Product.findOrFail(request.param('id'))
        
        const body = request.only(['name'])
        
        await product.merge(body).save()
        return product
    }

    public async destroy({auth,request}:HttpContextContract){
        const product = await Product.findOrFail(request.param('id'))
        if(product.store.id !=auth.user?.id){
            return "Não autorizado"
        }else{
            await product.delete()
        }

        return product
    }

}
