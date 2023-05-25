import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'


export default class AuthController {
    public async index({auth}:HttpContextContract){
        const user = auth.use("api").authenticate()
        
        return user
    }

    public async store({request}:HttpContextContract){
        
        const user = await User.create({
            name: request.input('name'),
            email: request.input('email'),
            password: request.input('password')
        })

        return user
    }

    public async show({request}:HttpContextContract){        
        const user = await User.findOrFail(request.param('id'))
        return user
    }

    public async update({auth,request, response}:HttpContextContract){
        const {id} = await auth.use("api").authenticate()
        if(id!= request.param("id")) return response.forbidden("")

        const user = await User.findOrFail(request.param('id'))
        
        const body = request.only(['name', 'email', 'password'])
        
        await user.merge(body).save()
        return user
        
    }

    public async destroy({auth,request, response}:HttpContextContract){
        const user = await User.findOrFail(request.param('id'))
        const {id} = await auth.use("api").authenticate()
        if(id != request.param('id')) return response.forbidden()
        await user.delete()
        return user
    }
}

