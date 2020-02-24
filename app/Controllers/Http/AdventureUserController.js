'use strict'

const Adventure = use('App/Models/Adventure')
const Master = use('App/Models/Master')
class AdventureUserController {
  async index ({ params, request, response }) {
    const { id } = params
    const adventure = await Adventure.find(id)
    const adventureLobby = await adventure.lobby().fetch()
    if (!adventureLobby) {
      return response.status(404).send({
        error: {
          message: 'Adventure not found'
        }
      })
    }
    const owner = await adventure.owner().fetch()
    const rawCharacters = await adventure.characters().fetch()
    const characters = rawCharacters.toJSON()
    const users = await adventureLobby.users().with('avatar').fetch()
    const masters = await Master.query().where('adventure_id', id).with('user.avatar').fetch()
    const userMasters = masters.toJSON().map(master => ({ ...master.user, master, ...(master.user.id === owner.id ? { isOwner: true } : { isOwner: false }) }))
    const restUsers = users.toJSON().map(user => ({ ...user, master: null, isOwner: false, character: characters.find(character => character.user_id === user.id) }))
    return [...restUsers, ...userMasters]
  }

  async destroy ({ request, response, params }) {
    const { id } = params
    const { adventureLobby } = request
    const toDeleteMaster = await Master.findBy('user_id', id)
    if (toDeleteMaster) {
      await toDeleteMaster.delete()
    }
    await adventureLobby.users().detach([id])
    return {
      ok: true
    }
  }

  async update ({ params, request }) {
    const { id } = params
    // const { master, user, adventure, adventureLobby } = request
    const toDeleteMaster = await Master.findBy('user_id', id)
    if (toDeleteMaster) {
      await toDeleteMaster.delete()
    }
    return {
      ok: true
    }
  }
}

module.exports = AdventureUserController
