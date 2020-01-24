'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LevelSchema extends Schema {
  up () {
    this.table('characters', (table) => {
      table.integer('level').defaultTo(1)
      // alter table
    })
  }

  down () {
    this.table('characters', (table) => {
      table.dropColumn('level')
      // reverse alternations
    })
  }
}

module.exports = LevelSchema
