'use strict'
const Antl = use('Antl')
class User {
  get messages () {
    const locale = this.ctx.antl._locale
    return Antl.forLocale(locale).list('validation')
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      // validation rules
      username: 'required|unique:users',
      email: 'email|required|confirmed|unique:users',
      password: 'required|confirmed'
    }
  }
}

module.exports = User
