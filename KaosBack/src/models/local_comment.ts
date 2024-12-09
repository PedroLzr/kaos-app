import { DataTypes } from "sequelize";
import db from "../database/connection";
import User from "./user";
import Local from "./local";

const LocalComment = db.define('Local_Comment', {
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

LocalComment.belongsTo(User);
LocalComment.belongsTo(Local);
User.hasMany(LocalComment);
Local.hasMany(LocalComment);

LocalComment.sync();

export default LocalComment;