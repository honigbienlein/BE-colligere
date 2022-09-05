import Entry from '../../models/entryModel.js'
import Attribute from '../../models/attributeModel.js'
import AttributeType from '../../models/attributeTypeModel.js'
import AttributeValue from '../../models/attributeValueModel.js'

const users_id_collections_id_items_post = async (request, response) => {
	const collectionId = request.params.id_collection
	let responseMessage
	//try {
	await Entry.sync()
	await Attribute.sync()
	await AttributeType.sync() // for now ignore type of attribute
	await AttributeValue.sync()

	const newEntryInDB = await Entry.create({
		id_collection: collectionId,
	})
	const entryID = await newEntryInDB.id_entry
	let bulkData = []
	for (const attribute in request.body) {
		/* const data = await Attribute.findOne({
			where: { name_attribute: attribute },
			attributes: ['id_attribute'],
		})

		let id_attribute = data?.dataValues?.id_attribute
		if (isNaN(id_attribute)) {
			const newAttribute = await Attribute.create({ name_attribute: attribute })
			id_attribute = await newAttribute.id_attribute
			console.log(`new Attribute in DB id: ${id_attribute} name: ${attribute}`)
		} */

		const [attributeData, created] = await Attribute.findOrCreate({
			where: { name_attribute: attribute }
		})
		console.log(`created: ${created}`)
		bulkData.push({
			id_entry: entryID,
			id_attribute: attributeData.id_attribute,
			id_attributeType: null, // for now its ignored
			attributeValue: request.body[attribute],
		})
	}
	responseMessage = await AttributeValue.bulkCreate(bulkData)
	/* } catch ({ errors }) {
		responseMessage = errors
	}
 */
	response.send(responseMessage)
}

export { users_id_collections_id_items_post }
