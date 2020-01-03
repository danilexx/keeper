'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAdventureLobbySchema extends Schema {
  up () {
    this.create('user_adventure_lobbies', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('adventure_lobby_id')
        .unsigned()
        .references('id')
        .inTable('adventure_lobbies')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_adventure_lobbies')
  }
}

module.exports = UserAdventureLobbySchema
