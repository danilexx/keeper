'use strict'

/*
|--------------------------------------------------------------------------
| MasterSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Database = use('Database')

class MasterSeeder {
  async run () {
    const masters = await Database.table('masters')
  }
}

module.exports = MasterSeeder
