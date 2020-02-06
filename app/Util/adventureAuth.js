const Adventure = use('App/Models/Adventure')
const Character = use('App/Models/Character')

const adventureAuth = async (adventure_id, user) => {
  const adventure = await Adventure.find(adventure_id)
  // if (!adventure) {
  //   throw Error({
  //     error: 'Adventure not found'
  //   })
  // }
  const adventureLobby = await adventure.lobby().fetch()
  await adventureLobby.load('users.avatar')
  await adventureLobby.load('masters.avatar')
  const masters = await adventureLobby
    .masters()
    .where('user_id', user.id)
    .fetch()
  const master = masters.rows[0]
  let isMaster = false
  // return response.send(adventureLobby.toJSON()[0].masters)
  const isMasterOnAdventure = Boolean(master)
  if (isMasterOnAdventure) {
    isMaster = true
  }
  const users = await adventureLobby.users().fetch()
  const user_on_adventure_instance = users.rows[0]
  const isCharacterOnAdventure = Boolean(user_on_adventure_instance)
  let character
  if (isCharacterOnAdventure) {
    const user_id = user.id
    const characters = await Character.query().where('adventure_id', adventure.id).where('user_id', user_id).fetch()

    character = characters && characters.rows.length > 0 ? characters.rows[0] : undefined
  }
  const isUserOnAdventure = isCharacterOnAdventure || isMaster
  // if (!isUserOnAdventure) {
  //   throw Error({
  //     message: 'you do not own permission to invite people to this adventure'
  //   })
  // }
  return {
    master,
    isMaster,
    character,
    adventure,
    isCharacterOnAdventure,
    isUserOnAdventure
  }
}

module.exports = adventureAuth
