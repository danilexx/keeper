'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AvatarUserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      // alter table
      table.integer('avatar_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.alter('users', (table) => {
      // reverse alternations
      table.dropColumn('avatar_id')
    })
  }
}

module.exports = AvatarUserSchema
