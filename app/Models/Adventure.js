'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class Adventure extends Model {
  static get hidden () {
    return ['password']
  }

  static get computed () {
    return ['hasPassword']
  }

  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  getHasPassword ({ password }) {
    if (password) {
      return true
    } else {
      return false
    }
  }

  masters () {
    return this.hasMany('App/Models/Master')
  }

  character () {
    return this.belongsTo('App/Models/Character')
  }

  characters () {
    return this.hasMany('App/Models/Character')
  }

  avatar() {
    return this.hasOne('App/Models/File', 'avatar_id', 'id')
  }

  lobby() {
    return this.hasOne('App/Models/AdventureLobby')
  }

  owner() {
    return this.hasOne('App/Models/User', 'owner_id', 'id')
  }

  charactersConfig () {
    return this.hasOne('App/Models/CharactersConfig')
  }

  skills () {
    return this.hasMany('App/Models/Skill')
  }

  async verifyPassword (password) {
    if (this.password) {
      const response = await Hash.verify(password, this.password)
      return response
    } else {
      return true
    }
  }
}

module.exports = Adventure
