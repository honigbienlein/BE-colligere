import { DataTypes } from 'sequelize'
import { connectingToColligereDB } from '../dbConnections.js'

const db = await connectingToColligereDB()

const Entry = db.define(
	'Entry',
	{
		id_entry: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
	},
	{
		tableName: 'Entries',
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
)

export default Entry
