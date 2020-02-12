'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  skills () {
    return this.belongsToMany('App/Models/Skill').pivotTable('item_skill')
  }

  icon() {
    return this.hasOne('App/Models/File', 'icon_id', 'id')
  }
}

module.exports = Item
