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

    public async destroy({auth,request}:HttpContextContract){
        const user = await User.findOrFail(request.param('id'))
        if(user.id !== auth.user?.id){
            return 'you cannot delete someone else\'s profile'
        }
        await user.delete()
        return user
    }
}

