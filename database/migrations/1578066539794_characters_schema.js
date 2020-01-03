'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CharactersSchema extends Schema {
  up () {
    this.create('characters', (table) => {
      table.increments()
      table.string('name')
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('adventure_id')
        .unsigned()
        .references('id')
        .inTable('adventures')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.integer('icon_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('characters')
  }
}

module.exports = CharactersSchema
