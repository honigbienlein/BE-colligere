import Attribute from "../../models/attributeModel.js"
import AttributeType from "../../models/attributeTypeModel.js"
import AttributeValue from "../../models/attributeValueModel.js"
import Entry from "../../models/entryModel.js"


const users_id_collections_id_items_post = async (request, response) => {
	const userId = request.params.id_user
	const collectionId = request.params.id_collection

	// await AttributeValue.create({ id_entry: id_entry })
	try {
		console.log('----------  1  --------------')
		await Entry.sync()
		const entryInDB = await Entry.create({
			id_collection: collectionId,
		})
		console.log('----------  1.1  --------------')
		console.table(entryInDB)
		console.log('----------  2  --------------')
		await Attribute.sync()
		console.log('----------  3  --------------')
		await AttributeType.sync()
		console.log('----------  4  --------------')
		await AttributeValue.sync()
		console.log('----------  5  --------------')
		const id_entry = await entryInDB.id_entry
		console.log(id_entry)
		for (const attribute in request.body) {
			const { dataValues } = await Attribute.findOne({
				where: { name_attribute: attribute },
				attributes: ['id_attribute'],
			})
			console.log('----1----')
			let id_attribute = dataValues.id_attribute
			console.log(id_attribute)
			console.log('----2----')

			if (isNaN(id_attribute)) {
				const newAttribute = await Attribute.create({ name_attribute: attribute })
				id_attribute = await newAttribute.dataValues.id_attribute
			}
			console.log('attribute: ' + attribute + ' DB_ID: ' + id_attribute + ' attributeValue: '+ request.body[attribute])
		}

		await response.send('dawdadadad')
	} catch ({ errors }) {
		response.send(errors)
	}

	// response.send('users_id_collections_id_items_post')
}

export { users_id_collections_id_items_post }
