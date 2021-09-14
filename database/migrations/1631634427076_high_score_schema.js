'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HighScoreSchema extends Schema {
  up () {
    this.create('high_scores', (table) => {
      table.increments()

      table.integer('user_id').unsigned().references('users.id')

      table.integer('score')

      table.timestamps()
    })
  }

  down () {
    this.drop('high_scores')
  }
}

module.exports = HighScoreSchema
