import { DataTypes } from 'sequelize'
import { connectingToColligereDB } from '../dbConnections.js'
import Entry from './entryModel.js'
import Attribute from './attributeModel.js'

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
		id_attribute: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Attribute,
				key: 'id_attribute',
			},
		},
		id_entry: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Entry,
				key: 'id_entry',
			},
		},
		value: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
	},
	{
		tableName: 'Attributes',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
)

export default AttributeValue
