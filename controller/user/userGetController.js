import User from '../../models/userModel.js'

/**
 * @TODO
 *  - user check
 *  - there is a Problem, if the username is only numbers, then will the parse a number and its searching for an user id
 */
const user_id = async (request, response) => {
	const id_user = request.params.id_user
	const isId = parseInt(id_user)
	const toSearch = isNaN(isId) ? { username: id_user } : { id_user: isId }

	try {
		const userData = await User.findOne({
			where: toSearch,
			attributes: ['id_user', 'username', 'email', 'created_at', 'visible', 'verified_email'],
		})

		response.send(userData ?? 'No user!')
	} catch (error) {
		console.log(error)
		response.send("Something went wrong, can't get a user.")
	}
}

export { user_id }
