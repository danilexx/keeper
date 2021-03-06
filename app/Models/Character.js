'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Character extends Model {
  attributes () {
    return this.hasOne('App/Models/Attribute')
  }

  experiences () {
    return this.hasOne('App/Models/Experience')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  inventory () {
    return this.belongsToMany('App/Models/Item').pivotTable('inventories', 'character_id', 'id').withPivot(['quantity'])
  }
}

module.exports = Character
