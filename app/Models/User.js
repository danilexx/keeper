'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
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

  // Esconde a senha do retorno da api
  static get hidden () {
    return ['password', 'token', 'token_created_At', 'created_at', 'updated_at']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  pendingFriendships () {
    return this.hasMany('App/Models/PendingFriendship', 'id', 'receiver_id')
  }

  pendingAdventures () {
    return this.hasMany('App/Models/PendingAdventure', 'id', 'receiver_id')
  }

  friends () {
    return this.belongsToMany('App/Models/User', 'user1_id', 'user2_id').pivotModel('App/Models/Friendship')
  }

  avatar () {
    return this.belongsTo('App/Models/File', 'avatar_id', 'id')
  }

  masters () {
    return this.hasMany('App/Models/Master')
  }

  master () {
    return this.hasOne('App/Models/Master')
  }

  characters () {
    return this.hasMany('App/Models/Character')
  }

  masteringAdventures () {
    return this.manyThrough('App/Models/Master', 'adventure', 'id', 'user_id')
  }

  lobbies () {
    return this.belongsToMany('App/Models/AdventureLobby', 'user_id', 'id').pivotTable('user_adventure_lobbies')
  }

  static get traits () {
    return [
      '@provider:Adonis/Acl/HasRole',
      '@provider:Adonis/Acl/HasPermission'
    ]
  }
}

module.exports = User
