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

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

// User
Route.post('/users', 'UserController.store')

// Auth
Route.post('/auth/login', 'AuthController.login')
Route.get('/auth/me', 'AuthController.me').middleware(['getUser'])

//High-score
Route.get('/my-scores', 'HighScoreController.showMine').middleware(['getUser'])
Route.get('/high-scores', 'HighScoreController.show')
Route.post('/high-scores', 'HighScoreController.store').middleware(['getUser'])