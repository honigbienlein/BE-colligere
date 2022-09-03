import Collection from '../../models/collectionModel.js'

/**
 *
 * @param {*} request from frontend
 * @param {*} response to frontend
 */
const users_id_collections_post = async (request, response) => {
	const userId = request.params.id_user
	const collectionNameCharLength = 30
	const collectionNameCharLengthFailedText = `Your name for the collection is shorter then 3 or longer than ${collectionNameCharLength} chars.`
	const emptyString = ''

	let toSend

	const collectionToAdd = {
		id_user: userId,
		id_template: request?.body?.templateId,
		name_collection: request?.body?.collectionName,
	}

	try {
		await Collection.sync()
		toSend = await Collection.create(collectionToAdd)
	} catch ({ errors }) {
		const errorMessage = Object.values(errors)
		console.log(errorMessage)
		const collectionNameFailed =
			!collectionToAdd.name_collection || collectionToAdd.name_collection > collectionNameCharLength
				? collectionNameCharLengthFailedText
				: emptyString

		if (collectionNameFailed) {
			toSend = {
				errorMessages: [collectionNameFailed],
				data: { ...collectionToAdd },
			}
		} else {
			toSend = { ...errors }
		}
	}

	response.send(toSend)
}

export { users_id_collections_post }
