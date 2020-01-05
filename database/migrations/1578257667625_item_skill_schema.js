'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemSkillSchema extends Schema {
  up () {
    this.create('item_skill', (table) => {
      table.increments()
      table.integer('item_id')
        .unsigned()
        .references('id')
        .inTable('items')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('skill_id')
        .unsigned()
        .references('id')
        .inTable('skills')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('item_skill')
  }
}

module.exports = ItemSkillSchema
