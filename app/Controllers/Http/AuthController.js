'use strict'
const { validate, sanitize } = use('Validator')
const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
    async login({request, response, auth}) {
        const all_params = request.post()

        const validation = await validate(all_params, {
            login: 'required|string',
            password: 'required|string'
        })

        if (validation.fails()) {
            return response.badRequest(validation.messages())
        }

        const user = await User
            .query()
            .where(q => q
                .where('email', all_params.login)
                .orWhere('username', all_params.login))
            .firstOrFail()

        const is_password_same = await Hash.verify(all_params.password, user.password)

        if (is_password_same) {
            const token = await auth.generate(user)

            return response.ok({ token })
        }

        return response.notFound()
    }

    async me({ request, response, user }) {
        return response.ok(user)
    }
}

module.exports = AuthController
