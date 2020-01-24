'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExpertisesconfigSchema extends Schema {
  up () {
    this.table('characters_configs', (table) => {
      table.renameColumn('default_base_experience_value', 'default_base_expertise')
      table.renameColumn('default_melee_experience_value', 'default_melee_expertise')
      table.renameColumn('default_ranged_experience_value', 'default_ranged_expertise')
      table.renameColumn('default_magic_experience_value', 'default_magic_expertise')
      table.renameColumn('default_miracle_experience_value', 'default_miracle_expertise')
    })
  }

  down () {
    this.table('characters_configs', (table) => {
      table.renameColumn('default_base_expertise', 'default_base_experience_value')
      table.renameColumn('default_melee_expertise', 'default_melee_experience_value')
      table.renameColumn('default_ranged_expertise', 'default_ranged_experience_value')
      table.renameColumn('default_magic_expertise', 'default_magic_experience_value')
      table.renameColumn('default_miracle_expertise', 'default_miracle_experience_value')
    })
  }
}

module.exports = ExpertisesconfigSchema
