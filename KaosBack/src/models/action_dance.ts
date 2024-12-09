import { DataTypes } from "sequelize";
import db from "../database/connection";

const Action_Dance = db.define('Action_Dance', {
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

Action_Dance.sync();

export default Action_Dance;