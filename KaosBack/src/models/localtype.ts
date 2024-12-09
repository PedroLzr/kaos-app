import { DataTypes } from "sequelize";
import db from "../database/connection";

const LocalType = db.define('LocalType', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    }
});

LocalType.sync();

LocalType.afterSync(async () => {
    const existDiscotecaType = await LocalType.findOne({
        where: {
            name: "Discoteca"
        }
    });

    if (!existDiscotecaType) {
        const disco_type = await LocalType.build({
            name: "Discoteca",
            description: "Local más o menos de tamaño considerable para salir únicamente de fiesta"
        });
        disco_type.save();
    }

    const existPubType = await LocalType.findOne({
        where: {
            name: "Pub"
        }
    });

    if (!existPubType) {
        const disco_type = await LocalType.build({
            name: "Pub",
            description: "Local más pequeño para tomar algo y salir de fiesta"
        });
        disco_type.save();
    }
});

export default LocalType;