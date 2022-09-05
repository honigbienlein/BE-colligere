import { DataTypes } from 'sequelize'
import { connectingToColligereDB } from '../dbConnections.js'
import Entry from './entryModel.js'
import Attribute from './attributeModel.js'
import AttributeType from './attributeTypeModel.js'

const db = await connectingToColligereDB()

const AttributeValue = db.define(
	'AttributeValue',
	{
		id_attributeValue: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		id_entry: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Entry,
				key: 'id_entry',
			},
		},
		id_attribute: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Attribute,
				key: 'id_attribute',
			},
		},
		id_attributeType: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: AttributeType,
				key: 'id_attributeType',
			},
		},
		attributeValue: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
	},
	{
		tableName: 'AttributeValues',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
)

export default AttributeValue
