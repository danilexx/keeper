'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SceneSchema extends Schema {
  up () {
    this.create('scenes', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('scenes')
  }
}

module.exports = SceneSchema
