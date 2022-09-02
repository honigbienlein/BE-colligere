import Collection from '../../models/collectionModel.js'

/**
 *
 * @param {*} request from frontend
 * @param {*} response to frontend
 */
const users_id_collections_post = async (request, response) => {
	const userId = request.params.id_user
	const collectionNameCharLength = 31
	const collectionNameCharLengthFailedText = `Your name for the collection is longer than ${collectionNameCharLength} chars.`
	const emptyString = ''

	const collectionToAdd = {
		id_user: userId,
		id_template: request?.body?.templateId,
		name_collection: request?.body?.collectionName,
	}

	try {
		const collectionInDB = await Collection.create(collectionToAdd)
		await response.send(collectionInDB)
	} catch ({ errors }) {
		const collectionNameFailed =
			!collectionToAdd.name_collection || collectionToAdd.name_collection > collectionNameCharLength
				? collectionNameCharLengthFailedText
				: emptyString

		if (collectionNameFailed) {
			await response.send({
				errorMessages: [collectionNameFailed],
				data: { ...collectionToAdd },
			})
		} else {
			response.send(errors)
		}
	}
}

export { users_id_collections_post }
