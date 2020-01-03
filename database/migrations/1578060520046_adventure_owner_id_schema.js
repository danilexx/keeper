'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdventureOwnerIdSchema extends Schema {
  up () {
    this.table('adventures', (table) => {
      // alter table
      table.integer('owner_id')
        .unsigned()
        .references('id')
        .inTable('masters')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.table('adventures', (table) => {
      // reverse alternations
      table.dropColumn('owner_id')
    })
  }
}

module.exports = AdventureOwnerIdSchema
