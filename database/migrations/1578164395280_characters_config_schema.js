'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CharactersConfigSchema extends Schema {
  up () {
    this.create('characters_configs', (table) => {
      table.increments()
      table.integer('default_life').defaultTo(300)
      table.integer('default_mana').defaultTo(200)
      table.double('default_gold', 8, 2).defaultTo(50)
      table.integer('default_attributes_value').defaultTo(3)
      table.integer('default_attributes_points_to_spend').defaultTo(3)
      table.integer('default_base_experience_value').defaultTo(50)
      table.integer('default_melee_experience_value').defaultTo(50)
      table.integer('default_ranged_experience_value').defaultTo(50)
      table.integer('default_magic_experience_value').defaultTo(50)
      table.integer('default_miracle_experience_value').defaultTo(50)
      table.integer('adventure_id')
        .unsigned()
        .references('id')
        .inTable('adventures')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('characters_configs')
  }
}

module.exports = CharactersConfigSchema
