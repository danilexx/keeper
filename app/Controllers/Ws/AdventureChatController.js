'use strict'

class AdventureChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
    console.log(socket, request)
  }
}

module.exports = AdventureChatController
