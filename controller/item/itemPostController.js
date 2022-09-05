import Attribute from '../../models/attributeModel.js'
import AttributeType from '../../models/attributeTypeModel.js'
import AttributeValue from '../../models/attributeValueModel.js'
import Entry from '../../models/entryModel.js'

const users_id_collections_id_items_post = async (request, response) => {
	const userId = request.params.id_user
	const collectionId = request.params.id_collection

	let responseMessage
	try {
		await Entry.sync()
		const entryInDB = await Entry.create({
			id_collection: collectionId,
		})
		await Attribute.sync()
		await AttributeType.sync()
		await AttributeValue.sync()
		const id_entry = await entryInDB.id_entry

		for (const attribute in request.body) {
			const { dataValues } = await Attribute.findOne({
				where: { name_attribute: attribute },
				attributes: ['id_attribute'],
			})
			let id_attribute = dataValues.id_attribute

			if (isNaN(id_attribute)) {
				const newAttribute = await Attribute.create({ name_attribute: attribute })
				id_attribute = await newAttribute.dataValues.id_attribute
				console.log(`new Attribute in DB id: ${id_attribute} name: ${attribute}`)
			}
			console.log(
				'attribute: ' +
					attribute +
					' DB_ID: ' +
					id_attribute +
					' attributeValue: ' +
					request.body[attribute],
			)
		}

		responseMessage = 'dawdadadad'
	} catch ({ errors }) {
		responseMessage = errors
	}

	response.send(responseMessage)
}

export { users_id_collections_id_items_post }
