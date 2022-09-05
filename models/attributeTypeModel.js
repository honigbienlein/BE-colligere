import { DataTypes } from 'sequelize'
import { connectingToColligereDB } from '../dbConnections.js'

const db = await connectingToColligereDB()

const AttributeType = db.define(
	'AttributeType',
	{
		id_attributeType: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		dataType: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
	},
	{
		tableName: 'AttributeTypes',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
)

export default AttributeType
