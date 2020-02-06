'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdventureInviteAsSchema extends Schema {
  up () {
    this.table('pending_adventures', (table) => {
      table.enu('as', ['master', 'character']).notNullable()
      // alter table
    })
  }

  down () {
    this.table('pending_adventures', (table) => {
      table.dropColumn('as')

      // reverse alternations
    })
  }
}

module.exports = AdventureInviteAsSchema
