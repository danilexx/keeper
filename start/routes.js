'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store')
Route.put('users/:id', 'UserController.update').middleware('auth')
Route.group(() => {
  Route.get('users', 'UserController.index')
  Route.get('users/:id', 'UserController.show')
}).middleware(['auth', 'is:keeper_of_items'])
Route.post('sessions', 'SessionController.store')

Route.resource('permissions', 'PermissionController')
  .apiOnly()
  .middleware('auth')

Route.resource('roles', 'RoleController')
  .apiOnly()
  .middleware('auth')

Route.resource('items', 'ItemController')
  .apiOnly().middleware('auth', 'is:keeper_of_items').except(['index', 'show'])

Route.get('/items/:id', 'ItemController.show')
Route.get('/items', 'ItemController.index')

Route.resource('files', 'FileController').apiOnly()
Route.resource('pending_friendships', 'PendingFriendshipController').apiOnly().middleware('auth')
Route.resource('friendships', 'FriendshipController').apiOnly().middleware('auth')
