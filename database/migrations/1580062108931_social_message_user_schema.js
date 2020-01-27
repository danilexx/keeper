'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialMessageUserSchema extends Schema {
  up () {
    this.table('social_messages', (table) => {
      // alter table
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.table('social_messages', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = SocialMessageUserSchema
