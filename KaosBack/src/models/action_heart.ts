import { DataTypes } from "sequelize";
import db from "../database/connection";

const Action_Heart = db.define('Action_Heart', {
    userSenderId: {
        type: DataTypes.INTEGER
    },
    userReceiverId: {
        type: DataTypes.INTEGER
    },
    eventId: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    }
});

Action_Heart.sync();

export default Action_Heart;