import { DataTypes } from 'sequelize'
import { connectingToColligereDB } from '../dbConnections.js'

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
		name_attribute: {
			type: DataTypes.STRING,
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
