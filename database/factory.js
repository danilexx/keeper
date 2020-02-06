const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password())
  }
})
Factory.blueprint('App/Models/Master', async (faker) => {
  return {
    name: faker.name()
  }
})
Factory.blueprint('App/Models/Adventure', async (faker) => {
  return {
    name: faker.name(),
    description: faker.paragraph()
  }
})
