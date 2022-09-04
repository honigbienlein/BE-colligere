import { DataTypes } from 'sequelize'
import { connectingToColligereDB } from '../dbConnections.js'
import Collection from './collectionModel.js'
import AttributeType from './attributeTypeModel.js'

const db = await connectingToColligereDB()

const Attribute = db.define(
	'Attribute',
	{
		id_attribute: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		id_collection: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Collection,
				key: 'id_collection',
			},
		},
		id_attributeType: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: AttributeType,
				key: 'id_attributeType',
			},
		},
		name_attribute: {
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

export default Attribute