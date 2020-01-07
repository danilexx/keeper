'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialMessagesSchema extends Schema {
  up () {
    this.create('social_messages', (table) => {
      table.increments()
      table.integer('character_id')
        .unsigned()
        .references('id')
        .inTable('characters')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('master_id').unsigned()
        .references('id')
        .inTable('masters')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('adventure_lobby_id')
        .unsigned()
        .references('id')
        .inTable('adventure_lobbies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.string('message').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('social_messages')
  }
}

module.exports = SocialMessagesSchema
