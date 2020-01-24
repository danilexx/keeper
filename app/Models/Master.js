'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Master extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  items () {
    return this.hasMany('App/Models/Item')
  }

  adventure () {
    return this.belongsTo('App/Models/Adventure')
  }

  skills () {
    return this.hasMany('App/Models/Skill')
  }
}

module.exports = Master
