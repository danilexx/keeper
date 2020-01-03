'use strict'
const Antl = use('Antl')
class User {
  get messages () {
    console.log(Antl.currentLocale())
    return Antl.list('validation')
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      username: 'required|unique:users',
      password: 'required|confirmed'
    }
  }
}

module.exports = User
