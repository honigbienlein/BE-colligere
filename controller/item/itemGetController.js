import Attribute from '../../models/attributeModel.js'
import AttributeValue from '../../models/attributeValueModel.js'
import Collection from '../../models/collectionModel.js'
import Entry from '../../models/entryModel.js'
import User from '../../models/userModel.js'

const users_id_collections_id_items = async (request, response) => {
	const collectionID = parseInt(request.params.id_collection)
	Collection.hasMany(Entry, {
		foreignKey: 'id_collection',
	})
	Entry.hasMany(AttributeValue, {
		foreignKey: 'id_entry',
	})
	AttributeValue.hasOne(Attribute, {
		foreignKey: 'id_attribute',
	})

	const getAllItems = await Collection.findAll({
		where: {
			id_collection: collectionID,
		},
		include: {
			model: Entry,
			include: {
				model: AttributeValue,
				include: {
					model: Attribute,
					where: {
						name_attribute:"title",
					}
				},
			},
		},
	})
	response.send(getAllItems)
}

const users_id_collections_id_items_id = async (request, response) => {
	const itemId = parseInt(request.params.id_entry)

	AttributeValue.hasOne(Attribute, {
		foreignKey: 'id_attribute',
	})

	const allDataOfItem = await AttributeValue.findAll({
		where: {
			id_entry: itemId,
		},
		include: {
			model: Attribute,
		},
	})

	const data = allDataOfItem.map(attribute => ({
		[attribute.Attribute.name_attribute]: attribute.attributeValue,
	}))
	response.send(data)
}

export { users_id_collections_id_items, users_id_collections_id_items_id }
