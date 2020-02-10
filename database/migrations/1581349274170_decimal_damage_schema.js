'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DecilamDamageSchema extends Schema {
  up () {
    this.alter('skills', (table) => {
      // alter table
      table.float('value').notNullable().defaultTo(0.00).alter()
    })
  }

  down () {
    this.alter('skills', (table) => {
      // reverse alternations
      table.string('value').notNullable().alter()
    })
  }
}

module.exports = DecilamDamageSchema
