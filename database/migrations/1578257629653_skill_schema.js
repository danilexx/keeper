'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SkillSchema extends Schema {
  up () {
    this.create('skills', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('description').notNullable()
      table.string('value').notNullable()
      table.enu('type', [
        'thrust',
        'strike',
        'slash',
        'regular',
        'magic',
        'miracle'])
      table.integer('icon_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('master_id')
        .unsigned()
        .references('id')
        .inTable('masters')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('skills')
  }
}

module.exports = SkillSchema
