'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpertisesSchema extends Schema {
  up () {
    this.rename('experiences', 'expertises')
    this.alter('expertises', (table) => {
      table.renameColumn('base_experience', 'base_expertise')
      table.renameColumn('melee_experience', 'melee_expertise')
      table.renameColumn('ranged_experience', 'ranged_expertise')
      table.renameColumn('magic_experience', 'magic_expertise')
      table.renameColumn('miracle_experience', 'miracle_expertise')
    })
  }

  down () {
    this.rename('expertises', 'experiences')
    this.alter('experiences', (table) => {
      table.renameColumn('base_expertise', 'base_experience')
      table.renameColumn('melee_expertise', 'melee_experience')
      table.renameColumn('ranged_expertise', 'ranged_experience')
      table.renameColumn('magic_expertise', 'magic_experience')
      table.renameColumn('miracle_expertise', 'miracle_experience')
    })
  }
}

module.exports = ExpertisesSchema
