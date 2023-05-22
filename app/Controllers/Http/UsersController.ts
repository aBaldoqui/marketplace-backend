import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'


export default class AuthController {
    public async index({}:HttpContextContract){
        const user = await User.all()
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

    public async update({request}:HttpContextContract){
        const user = await User.findOrFail(request.param('id'))
        const body = request.only(['name', 'email', 'password'])
        
        await user.merge(body).save()
        return user
        
    }

    public async destroy({request}:HttpContextContract){
        const user = await User.findOrFail(request.param('id'))
        
        await user.delete()
        return user
    }
}

