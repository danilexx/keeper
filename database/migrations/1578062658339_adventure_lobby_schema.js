'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdventureLobbySchema extends Schema {
  up () {
    this.create('adventure_lobbies', (table) => {
      table.increments()
      table.integer('adventure_id')
        .unsigned()
        .references('id')
        .inTable('adventures')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('adventure_lobbies')
  }
}

module.exports = AdventureLobbySchema
