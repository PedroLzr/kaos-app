import { DataTypes } from "sequelize";
import db from "../database/connection";
import Local from "./local";
import User from "./user";

const Event = db.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    date: {
        type: DataTypes.DATE
        // type: DataTypes.DATEONLY,
    },
    startsAt: {
        type: DataTypes.TIME
    },
    endsAt: {
        type: DataTypes.TIME
    },
    description: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
    },
    status: {
        type: DataTypes.STRING
    },
    image: {
        type: DataTypes.DATE
    }
});

const EventUsers = db.define('Event_Users', {
    status: DataTypes.STRING
})

Event.belongsTo(Local);
Local.hasMany(Event);

Event.belongsToMany(User, { through: EventUsers });
User.belongsToMany(Event, { through: EventUsers });

Event.sync();

Event.afterSync(() => {
    EventUsers.sync();
});

export default Event;