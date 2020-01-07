'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NpcSchema extends Schema {
  up () {
    this.create('npcs', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('race').notNullable()
      table.string('appearance').notNullable()
      table.string('lore').notNullable()
      table.string('personality').notNullable()
      table.integer('life').notNullable()
      table.integer('max_life').notNullable()
      table.integer('mana').notNullable()
      table.integer('max_mana').notNullable()
      table.integer('age').notNullable()
      table.double('height', 4, 2).notNullable().defaultTo(2)
      table.double('gold', 8, 2).notNullable().defaultTo(0)
      table.enu('gender', ['f', 'm', 'other']).notNullable()
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
      table.integer('master_id')
        .unsigned()
        .references('id')
        .inTable('masters')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.timestamps()
    })
  }

  down () {
    this.drop('npcs')
  }
}

module.exports = NpcSchema
