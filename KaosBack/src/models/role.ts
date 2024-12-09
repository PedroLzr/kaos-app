import { DataTypes } from "sequelize";
import db from "../database/connection";

const Role = db.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true
    }
});

Role.sync();

Role.afterSync(async () => {
    const existUserRole = await Role.findOne({
        where: {
            name: "User_Role"
        }
    });

    if (!existUserRole) {
        const user_role = await Role.build({
            name: "User_Role"
        });
        user_role.save();
    }

    const existManagerRole = await Role.findOne({
        where: {
            name: "Manager_Role"
        }
    });

    if (!existManagerRole) {
        const manager_role = await Role.build({
            name: "Manager_Role"
        });
        manager_role.save();
    }

    const existAdminRole = await Role.findOne({
        where: {
            name: "Admin_Role"
        }
    });

    if (!existAdminRole) {
        const admin_role = await Role.build({
            name: "Admin_Role"
        });
        admin_role.save();
    }
});

export default Role;