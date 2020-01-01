'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PendingFriendshipsSchema extends Schema {
  up () {
    this.create('pending_friendships', (table) => {
      table.integer('sender_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('receiver_id')
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
    this.drop('pending_friendships')
  }
}

module.exports = PendingFriendshipsSchema
