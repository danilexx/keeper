'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdventureSchema extends Schema {
  up () {
    this.create('adventures', (table) => {
      table.increments()
      table.uuid('key')
      table.string('name')
      table.string('password')
      table.timestamps()
      table.integer('avatar_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.drop('adventures')
  }
}

module.exports = AdventureSchema
