'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttributesSchema extends Schema {
  up () {
    this.create('attributes', (table) => {
      table.increments()
      table.integer('character_id')
        .unsigned()
        .references('id')
        .inTable('characters')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('npc_id')
        .unsigned()
        .references('id')
        .inTable('npcs')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('strength').notNullable()
      table.integer('intelligence').notNullable()
      table.integer('agility').notNullable()
      table.integer('faith').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('attributes')
  }
}

module.exports = AttributesSchema
