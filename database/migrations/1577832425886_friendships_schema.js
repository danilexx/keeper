'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FriendshipsSchema extends Schema {
  up () {
    this.create('friendships', (table) => {
      table.integer('user1_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('user2_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('friendships')
  }
}

module.exports = FriendshipsSchema
