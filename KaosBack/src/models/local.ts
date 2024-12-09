import { DataTypes } from "sequelize";
import db from "../database/connection";
import LocalType from "./localtype";
import User from "./user";

const Local = db.define('Local', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    coordinates: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.DATE
    },
    capacity: {
        type: DataTypes.INTEGER
    }
});

Local.belongsTo(LocalType);
LocalType.hasMany(Local);

const LocalModerator = db.define('Local_Moderator', {
    status: {
        type: DataTypes.STRING
    }
})

Local.belongsToMany(User, { through: LocalModerator });
User.belongsToMany(Local, { through: LocalModerator });

Local.sync();

Local.afterSync(() => {
    LocalModerator.sync();
})

export default Local;