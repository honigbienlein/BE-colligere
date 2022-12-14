import { Op } from 'sequelize'
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
	Entry.belongsTo(Collection, {
		foreignKey: 'id_collection',
	})
	Entry.hasMany(AttributeValue, {
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
		//attribute: ['id_collection', 'id_user', 'name_collection'],
		include: {
			model: Entry,
			//attribute: ['id_entry'],
			include: {
				model: AttributeValue,
				//attribute: ['attributeValue'],
				include: {
					model: Attribute,
					where: {
						name_attribute: ['title', 'cover'],
					},
					//attribute: ['name_attribute'],
				},
			},
		},
	})
	const collectedResponse = {
		id_collection: getAllItems?.id_collection,
		id_user: getAllItems?.id_user,
		name_collection: getAllItems?.name_collection,
		Entries: getAllItems?.Entries.map(entry => ({
			entryId: entry?.id_entry,
			title: entry?.AttributeValues.find(obj => obj.id_attribute === 3)?.attributeValue,
			cover: entry?.AttributeValues.find(obj => obj.id_attribute === 1)?.attributeValue,
		})),
	}
	response.send(collectedResponse)
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

const users_id_items = async (request, response) => {
	const userID = parseInt(request.params.id_user)
	const searchFor = request.params.search

	Collection.hasMany(Entry, {
		foreignKey: 'id_collection',
	})
	Entry.belongsTo(Collection, {
		foreignKey: 'id_collection',
	})
	Entry.hasMany(AttributeValue, {
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
		where: { id_user: userID },
		include: {
			model: Entry,
			include: {
				model: AttributeValue,
			},
		},
	})

	const collectedItem = getAllItems?.Entries.filter(entry =>
		entry.AttributeValues.some(obj => obj.attributeValue.includes(searchFor)),
	)
	const responseData = {
		userId: userID,
		entries: collectedItem.map(entry => ({
			collectionId: entry.id_collection,
			entryId: entry.id_entry,
			title: entry?.AttributeValues.find(obj => obj.id_attribute === 3)?.attributeValue,
			cover: entry?.AttributeValues.find(obj => obj.id_attribute === 1)?.attributeValue,
		})),
	}
	response.send(responseData)
}

export { users_id_collections_id_items, users_id_collections_id_items_id, users_id_items }
