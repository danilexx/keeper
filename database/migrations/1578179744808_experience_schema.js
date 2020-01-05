'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExperienceSchema extends Schema {
  up () {
    this.create('experiences', (table) => {
      table.increments()
      table.integer('character_id')
        .unsigned()
        .references('id')
        .inTable('characters')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('base_experience').notNullable()
      table.integer('melee_experience').notNullable()
      table.integer('ranged_experience').notNullable()
      table.integer('magic_experience').notNullable()
      table.integer('miracle_experience').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('experiences')
  }
}

module.exports = ExperienceSchema
