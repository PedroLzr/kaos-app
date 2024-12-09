import { DataTypes } from "sequelize";
import db from "../database/connection";
import User from "./user";
import Event from "./event";

const EventComment = db.define('Event_Comment', {
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

EventComment.belongsTo(User);
EventComment.belongsTo(Event);
User.hasMany(EventComment);
Event.hasMany(EventComment);

EventComment.sync();

export default EventComment;