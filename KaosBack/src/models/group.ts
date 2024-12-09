import { DataTypes } from "sequelize";
import db from "../database/connection";
import User from "./user";

const Group = db.define('Group', {
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
    description: {
        type: DataTypes.STRING
    },
    public: {
        type: DataTypes.BOOLEAN
    }
    // image: {
    //    type: DataTypes.DATE
    // }
});

const GroupUsers = db.define('Group_Users', {
    status: DataTypes.STRING
})

Group.belongsToMany(User, { through: GroupUsers });
User.belongsToMany(Group, { through: GroupUsers });

Group.sync();

Group.afterSync(() => {
    GroupUsers.sync();
});

export default Group;