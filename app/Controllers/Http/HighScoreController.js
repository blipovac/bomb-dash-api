'use strict'
const { validate, sanitize } = use('Validator')
const HighScore = use('App/Models/HighScore')

class HighScoreController {
    async store({ request, response, user }) {
            const all_params = sanitize(request.post(), {
                score: 'to_int'
            })

            const validation = await validate(all_params, {
                score: 'required|number'
            })

            if (validation.fails()) {
                return response.badRequest(validation.messages())
            }

            const high_score = await HighScore
                .create({
                    score: all_params.score,
                    user_id: user.id
                })

            return response.ok(high_score)
    }

    async show({ response }) {
        const high_scores = await HighScore
            .query()
            .orderBy('score', 'desc')
            .limit(25)
            .fetch()

        return response.ok(high_scores)
    }

    async showMine({ user, response }) {
        const high_scores = await HighScore
        .query()
        .where({ user_id: user.id })
        .orderBy('score', 'desc')
        .limit(25)
        .fetch()

        return response.ok(high_scores)
    }
}

module.exports = HighScoreController
