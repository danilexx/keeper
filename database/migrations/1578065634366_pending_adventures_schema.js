'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PendingAdventuresSchema extends Schema {
  up () {
    this.table('pending_adventures', (table) => {
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
    this.table('pending_adventures', (table) => {
      // reverse alternations
      table.dropColumn('adventure_id')
    })
  }
}

module.exports = PendingAdventuresSchema
