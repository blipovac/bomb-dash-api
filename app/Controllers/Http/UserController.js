'use strict'
const User = use('App/Models/User')
const { validate, sanitize } = use('Validator')

class UserController {
    async store({ request, response }) {
        const all_params = request.post()

        console.log(all_params)

        const validation = await validate(all_params, {
            email: 'required|email|confirmed',
            password: 'required|string|confirmed',
            username: 'required|string'
        })

        if (validation.fails()) {
            return response.badRequest(validation.messages())
        }

        const { password_confirmation, email_confirmation, ...user_payload } = sanitize(all_params, {
            email: 'normalize_email',
            password: 'escape',
            username: 'escape'
        })

        const created_user = await User
            .create(user_payload)

        return response.ok(created_user)
    }
}

module.exports = UserController
