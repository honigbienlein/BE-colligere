import Attribute from '../../models/attributeModel.js'
import AttributeValue from '../../models/attributeValueModel.js'
import Collection from '../../models/collectionModel.js'
import Entry from '../../models/entryModel.js'

const users_id_collections_id_items = async (request, response) => {
	const collectionID = parseInt(request.params.id_collection)
	Collection.hasMany(Entry, {
		foreignKey: 'id_collection',
	})
	Entry.belongsTo(Collection, {
		foreignKey: 'id_collection',
	})
	Entry.hasOne(AttributeValue, {
		foreignKey: 'id_entry',
	})
	AttributeValue.belongsTo(Entry, {
		foreignKey: 'id_entry',
	})
	Attribute.hasOne(AttributeValue, {
		foreignKey: 'id_attribute',
	})
	AttributeValue.belongsTo(Attribute, {
		foreignKey: 'id_attribute',
	})
	//Attribute.belongsTo(AttributeValue)

	const [getAllItems] = await Collection.findAll({
		where: { id_collection: collectionID },
		attribute: ['id_collection', 'id_user', 'name_collection'],
		include: {
			model: Entry,
			attribute: ['id_entry'],
			include: {
				model: AttributeValue,
				attribute: ['attributeValue'],
				include: {
					model: Attribute,
					where: { name_attribute: 'title' },
					attribute: ['name_attribute'],
				},
			},
		},
	})
	response.send(getAllItems)
}

const users_id_collections_id_items_id = async (request, response) => {
	const itemId = parseInt(request.params.id_entry)

	Attribute.hasMany(AttributeValue, {
		foreignKey: 'id_attribute',
	})
	AttributeValue.belongsTo(Attribute, {
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

	const entries = allDataOfItem.map(attribute => [
		attribute.Attribute.name_attribute,
		attribute.attributeValue,
	])

	const data = Object.fromEntries(entries)

	response.send(data)
}

export { users_id_collections_id_items, users_id_collections_id_items_id }
