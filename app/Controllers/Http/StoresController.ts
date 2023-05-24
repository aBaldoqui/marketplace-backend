import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Models/Store'


export default class StoresController {
    public async index({}:HttpContextContract){
        const store = await Store.all()

        return store
    }

    public async store({auth,request}:HttpContextContract){

        const user = await auth.use("api").authenticate()
        
        const store = await Store.create({
            "name":request.input("name")
        })

        await store.related('user').associate(user)

        return store
    }

    public async show({request}:HttpContextContract){        
        const store = await Store.findOrFail(request.param('id'))
        return store
    }

    public async update({auth,request, response}:HttpContextContract){
        const {id} = await auth.use('api').authenticate()

        if(id!=request.param("id")) return response.forbidden()

        const store = await Store.findOrFail(request.param('id'))
        const body = request.only(['name'])
        
        await store.merge(body).save()
        return store
    }

    public async destroy({auth,request, response}:HttpContextContract){
        const store = await Store.findOrFail(request.param('id'))
        const {id} = await auth.use('api').authenticate()
        if(id !=request.param('id')) return response.forbidden()
        await store.delete()
        return store
    }
}
