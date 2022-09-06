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
		attributes: ['id_collection', 'id_user', 'name_collection'],
		where: {
			id_collection: collectionID,
		},
		include: {
			model: Entry,
			attributes: ['id_entry', 'id_collection'],
			include: {
				model: AttributeValue,
				attributes: ['attributeValue'],
				include: {
					model: Attribute,
					attributes: ['id_attribute', 'name_attribute'],
				},
			},
		},
	})
	const [values] = Object.values(getAllItems)
	response.send(values)
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
	console.log(allDataOfItem)
	const data = allDataOfItem.map(attribute => ({
		[attribute.Attribute.name_attribute]: attribute.attributeValue,
	}))
	response.send(data)
}

export { users_id_collections_id_items, users_id_collections_id_items_id }
