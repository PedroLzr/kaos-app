import { DataTypes } from "sequelize";
import db from "../database/connection";
import User from "./user";
import Group from "./group";

const GroupComment = db.define('Group_Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT
    }
});

GroupComment.belongsTo(User);
GroupComment.belongsTo(Group);
User.hasMany(GroupComment);
Group.hasMany(GroupComment);

GroupComment.sync();

export default GroupComment;