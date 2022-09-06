import User from '../../models/userModel.js'

/**
 * @TODO
 *  - password
 *    - check length
 *      - change error message
 *    - crypt
 */
const user_post = async (request, response) => {
	let userToAdd
	const usernameCharLength = 3
	const usernameCharLengthFailedText = `Your username is shorter than ${usernameCharLength} chars.`
	const errorMessageUniqueUsernameFailed = 'Your username is already used.'
	const emailLengthFailedText = 'Your email is missing.'
	const errorMessageUniqueEmailFailed = 'Your email is already used.'
	const passwordLengthFailedText = 'Your password is missing.'
	const emptyString = ''

	userToAdd = {
		username: request?.data?.username,
		email: request?.data?.email,
		password: request?.data?.password,
	}
	console.log(request)
	try {
		// if table not exist sync creates a table
		await User.sync()
		// add new user to db
		const userInDB = await User.create(userToAdd)
		delete userInDB.dataValues.password
		await response.send(userInDB)
	} catch ({ errors }) {
		const usernameFailed =
			!userToAdd.username || userToAdd.username.length < usernameCharLength
				? usernameCharLengthFailedText
				: emptyString
		const emailFailed = !userToAdd.email ? emailLengthFailedText : emptyString
		const passwordFailed = !userToAdd.password ? passwordLengthFailedText : emptyString
		const uniqueEmailFailed =
			errors[0].message === 'email must be unique' ? errorMessageUniqueEmailFailed : emptyString
		const uniqueUsernameFailed =
			errors[0].message === 'username must be unique' ? errorMessageUniqueUsernameFailed : emptyString

		if (usernameFailed || uniqueUsernameFailed || emailFailed || passwordFailed || uniqueEmailFailed) {
			delete userToAdd.password
			await response.send({
				errorMessages: [
					usernameFailed,
					uniqueUsernameFailed,
					emailFailed,
					passwordFailed,
					errorMessageUniqueEmailFailed,
				],
				data: { ...userToAdd },
			})
		} else {
			response.send(errors)
		}
	}
}

export { user_post }
