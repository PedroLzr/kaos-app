import { DataTypes } from "sequelize";
import db from "../database/connection";
import { userGender, userStatus } from "../enums/user";
import Role from "./role";

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    fullName: {
        type: DataTypes.STRING,
        unique: false,
    },
    phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    publicProfile: {
        type: DataTypes.BOOLEAN
    },
    city: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    dateofbirth: {
        type: DataTypes.DATEONLY
    },
    gender: {
        type: DataTypes.STRING
    },
    instagram: {
        type: DataTypes.STRING
    },
    imageProfile: {
        type: DataTypes.DATE
    },
    nationality: {
        type: DataTypes.STRING
    },
    coupleStatus: {
        type: DataTypes.STRING
    },
    sexualOrientation: {
        type: DataTypes.STRING
    }

});

User.belongsTo(Role);
Role.hasMany(User);

User.sync();

User.afterSync(async () => {
    const existUserWeb = await User.findOne({
        where: {
            userName: "RootUser"
        }
    });

    if (!existUserWeb) {
        const user_role = await User.build({
            userName: "RootUser",
            fullName: "Usuario Root",
            phone: "+34000000000",
            status: userStatus.ACTIVE,
            gender: userGender.MALE,
            RoleId: 3
        });
        user_role.save();
    }
});

export default User;