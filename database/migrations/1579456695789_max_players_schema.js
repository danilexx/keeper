'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MaxPlayersSchema extends Schema {
  up () {
    this.table('adventure_lobbies', (table) => {
      // alter table
      table.integer('maxPlayers').defaultTo(1)
    })
  }

  down () {
    this.table('adventure_lobbies', (table) => {
      // reverse alternations
      table.dropColumn('maxPlayers')
    })
  }
}

module.exports = MaxPlayersSchema
