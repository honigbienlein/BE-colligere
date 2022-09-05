import Collection from '../../models/collectionModel.js'

const users_id_collections = async (request, response) => {
	const id_user = request.params.id_user
	let dataResponse
	try {
		const userCollections = await Collection.findAll({
			where: { id_user: id_user },
			attributes: ['id_collection', 'id_user', 'id_template', 'name_collection'],
		})

		dataResponse = userCollections ?? 'No collections!'
	} catch (error) {
		console.log(error)
		dataResponse = "Something went wrong, can't get an user."
	}

	response.send(dataResponse)
}
const users_id_collections_id = (request, response) => {
	response.send('users_id_collections_id')
}

export { users_id_collections, users_id_collections_id }
