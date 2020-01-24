'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdventureDescriptionSchema extends Schema {
  up () {
    this.table('adventures', (table) => {
      // alter table
      table.string('description').defaultTo('')
    })
  }

  down () {
    this.table('adventures', (table) => {
      // reverse alternations
      table.dropColumn('description')
    })
  }
}

module.exports = AdventureDescriptionSchema
