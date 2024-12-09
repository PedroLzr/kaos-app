import { DataTypes } from "sequelize";
import db from "../database/connection";

const Friend = db.define('Friend', {
    userSenderId: {
        type: DataTypes.INTEGER
    },
    userReceiverId: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    }
});

Friend.sync();

export default Friend;