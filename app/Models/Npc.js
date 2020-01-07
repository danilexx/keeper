'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Npc extends Model {
  attributes () {
    return this.hasOne('App/Models/Attribute')
  }

  experiences () {
    return this.hasOne('App/Models/Experience')
  }

  inventory () {
    return this.belongsToMany('App/Models/Item').pivotTable('inventories', 'character_id', 'id').withPivot(['quantity'])
  }
}

module.exports = Npc
