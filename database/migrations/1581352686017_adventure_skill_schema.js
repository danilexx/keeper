'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdventureSkillSchema extends Schema {
  up () {
    this.table('skills', (table) => {
      // alter table
      table.integer('adventure_id')
        .unsigned()
        .references('id')
        .inTable('adventures')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.table('skills', (table) => {
      // reverse alternations
      table.dropColumn('adventure_id')
    })
  }
}

module.exports = AdventureSkillSchema
