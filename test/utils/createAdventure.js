const Factory = use('Factory')
const exampleAdventure = {
  name: 'Harry Potter 1',
  maxPlayers: 1,
  password: '1234',
  options: {
    default_mana: 200,
    default_life: 300,
    default_gold: 50,
    default_attributes_points_to_spend: 3,
    default_base_expertise: 50,
    default_melee_expertise: 50,
    default_ranged_expertise: 50,
    default_magic_expertise: 50,
    default_miracle_expertise: 50
  }
}
const createAdventure = (client) => async (adventure = exampleAdventure) => {
  const user = await Factory.model('App/Models/User').create()
  const master = await Factory.model('App/Models/Master').make()
  await user.masters().save(master)
  const response = await client.post(`/masters/${master.id}/adventures`).loginVia(user).send(adventure).end()
  return { response, user, master }
}

module.exports = createAdventure
