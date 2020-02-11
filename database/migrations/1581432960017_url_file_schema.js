'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UrlFileSchema extends Schema {
  up () {
    this.table('files', (table) => {
      // alter table
      table.string('url').notNull()
    })
  }

  down () {
    this.table('files', (table) => {
      table.dropColumn('url')
      // reverse alternations
    })
  }
}

module.exports = UrlFileSchema
