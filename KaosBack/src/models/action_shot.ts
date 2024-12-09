import { DataTypes } from "sequelize";
import db from "../database/connection";

const Action_Shot = db.define('Action_Shot', {
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

Action_Shot.sync();

export default Action_Shot;