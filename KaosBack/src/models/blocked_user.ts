import { DataTypes } from "sequelize";
import db from "../database/connection";

const BlockedUser = db.define('Blocked_User', {
    userSenderId: {
        type: DataTypes.INTEGER
    },
    userBlockedId: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    }
});

BlockedUser.sync();

export default BlockedUser;