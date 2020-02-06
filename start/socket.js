'use strict'

/*
|--------------------------------------------------------------------------
| Websocket
|--------------------------------------------------------------------------
|
| This file is used to register websocket channels and start the Ws server.
| Learn more about same in the official documentation.
| https://adonisjs.com/docs/websocket
|
| For middleware, do check `wsKernel.js` file.
|
*/

const Ws = use('Ws')

Ws.channel('social:*', (data) => {
})
Ws.channel('pendingFriends:*', (data) => {
})
Ws.channel('pendingAdventures:*', (data) => {
})
Ws.channel('friendship:*', (data) => {
})
