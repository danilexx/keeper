'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PendingAdventureSchema extends Schema {
  up () {
    this.create('pending_adventures', (table) => {
      table.increments()
      table.timestamps()
      table.integer('receiver_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('sender_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.drop('pending_adventures')
  }
}

module.exports = PendingAdventureSchema
