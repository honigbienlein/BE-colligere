import { DataTypes } from "sequelize"
import { db } from "../dbConnection"

const User = db.define('User', {
  // Model attributes are defined here
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.CITEXT,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    visible: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    verified_email: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    tableName:'Users',
    createdAt:'created_at',
    updatedAt:'updated_at'
});

// `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

export default User