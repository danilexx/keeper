'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MastersRelationWithAdventureSchema extends Schema {
  up () {
    this.alter('masters', (table) => {
      // alter table
      table.integer('adventure_id')
        .unsigned()
        .references('id')
        .inTable('adventures')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.alter('masters', (table) => {
      // reverse alternations
      table.dropColumn('adventure_id')
    })
  }
}

module.exports = MastersRelationWithAdventureSchema
