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

Route.get('masters/adventures', 'AdventureController.index').middleware('auth')
Route.get('users/adventures', 'AdventureController.private').middleware('auth')
Route.post('users', 'UserController.store').validator('User')
Route.put('users/:id', 'UserController.update').middleware('auth')
Route.group(() => {
  Route.get('users', 'UserController.index')
  Route.get('users/:id', 'UserController.show')
}).middleware('auth')
Route.post('sessions', 'SessionController.store')
Route.put('sessions', 'SessionController.update')

Route.resource('files', 'FileController').apiOnly()
Route.group(() => {
  Route.resource('roles', 'RoleController').apiOnly()
  Route.resource('permissions', 'PermissionController').apiOnly()
  Route.resource('pending_friendships', 'PendingFriendshipController').apiOnly()
  Route.resource('friendships', 'FriendshipController').apiOnly()
  Route.resource('masters', 'MasterController').apiOnly()
  Route.resource('masters.adventures', 'AdventureController').apiOnly().middleware('master_auth').except(['index', 'show'])
  Route.resource('pending_adventures', 'PendingAdventureController').apiOnly()
  Route.resource('adventures.characters', 'CharacterController').apiOnly().middleware('adventure_auth')
  Route.resource('adventure_lobbies', 'AdventureLobbyController').apiOnly()
  Route.resource('masters.items', 'ItemController').apiOnly().middleware('master_auth')
  Route.resource('masters.skills', 'SkillController').apiOnly().middleware('master_auth')
  Route.resource('adventures.npcs', 'NpcController').apiOnly().middleware(['adventure_auth', 'is_master'])
  Route.resource('adventures.social_messages', 'SocialMessageController').middleware('adventure_auth')
}).middleware('auth')

Route.get('adventures', 'AdventureController.all')
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')
Route.get('adventures/:adventures_id', 'AdventureController.show').middleware(['auth', 'adventure_auth'])
Route.get('/locale', ({ locale }) => {
  return {
    message: `User language is ${locale}`
  }
})
