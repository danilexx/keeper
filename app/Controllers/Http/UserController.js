'use strict'

const User = use('App/Models/User')

const permitedFields = ['username', 'password', 'permissions', 'roles', 'avatar_id']

class UserController {
  async index () {
    const user = await User.all()
    return user
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)
    await user.loadMany(['avatar', 'masters'])
    return user
  }

  async store ({ request }) {
    const { permissions, roles, ...data } = request.only(permitedFields)

    const user = await User.create(data)

    if (roles) {
      await user.roles().attach(roles)
    }

    if (permissions) {
      await user.permissions().attach(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    return user
  }

  async update ({ request, params, auth, response }) {
    const { permissions, roles, ...data } = request.only(permitedFields)
    const user = await User.findOrFail(params.id)
    const { user: user_authenticated } = auth
    if (user.id !== user_authenticated.id) {
      return response.status(401).json({
        error: {
          message: 'you cant update someone else profile'
        }
      })
    }
    user.merge(data)

    if (roles) {
      await user.roles().sync(roles)
    }

    if (permissions) {
      await user.permissions().sync(permissions)
    }

    await user.loadMany(['roles', 'permissions'])
    await user.save()
    return user
  }
}

module.exports = UserController
