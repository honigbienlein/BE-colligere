import Collection from '../../models/collectionModel.js'

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

	let responseMessage
	try {
		await Collection.sync()
		const collectionInDB = await Collection.create(collectionToAdd)
		responseMessage = collectionInDB
	} catch ({ errors }) {
		const collectionNameFailed =
			!collectionToAdd.name_collection || collectionToAdd.name_collection > collectionNameCharLength
				? collectionNameCharLengthFailedText
				: emptyString

		if (collectionNameFailed) {
			responseMessage = {
				errorMessages: [collectionNameFailed],
				data: { ...collectionToAdd },
			}
		} else {
			responseMessage = errors
		}
	}
	response.send(responseMessage)
}

export { users_id_collections_post }
