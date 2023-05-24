import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Models/Store'
import User from 'App/Models/User'

export default class StoresController {
    public async index({request}:HttpContextContract){
        const store = await Store.all()

        return store
    }

    public async store({auth,request}:HttpContextContract){

        const user = await auth.use("api").authenticate()
        
        const store = await Store.create({
            "name":request.input("name")
        })

        await store.related('user').associate(user)
    }

    public async show({request}:HttpContextContract){        
        const store = await Store.findOrFail(request.param('id'))
        return store
    }

    public async update({request}:HttpContextContract){
        const store = await Store.findOrFail(request.param('id'))
        
        const body = request.only(['name'])
        
        await store.merge(body).save()
        return store
    }

    public async destroy({auth,request}:HttpContextContract){
        const store = await Store.findOrFail(request.param('id'))
        if(store.user.id !=auth.user?.id){
            return "Não autorizado"
        }else{
            await store.delete()
        }

        return store
    }
}
