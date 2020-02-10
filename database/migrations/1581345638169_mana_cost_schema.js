'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ManaCostSchema extends Schema {
  up () {
    this.table('skills', (table) => {
      // alter table
      table.float('mana_cost').notNullable().defaultTo(0.00)
    })
  }

  down () {
    this.table('skills', (table) => {
      // reverse alternations
      table.dropColumn('mana_cost')
    })
  }
}

module.exports = ManaCostSchema
