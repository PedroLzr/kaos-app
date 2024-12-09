import express, { Application } from 'express';
import base64ImageUserProfileRoutes from '../routes/base64_image_user_profile';
import base64ImageLocal from '../routes/base64_image_local';
import base64ImageEvent from '../routes/base64_image_event';
import cors from 'cors';
import validateJWT from '../middlewares/validate-jwt';
import dbConnection from '../database/config';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        base64_image_user_profile: 'api/base64_image_user_profile',
        base64_image_local: 'api/base64_image_local',
        base64_image_event: 'api/base64_image_event'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '9000';

        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use('*', validateJWT);
    }

    routes() {
        this.app.use(this.apiPaths.base64_image_user_profile, base64ImageUserProfileRoutes);
        this.app.use(this.apiPaths.base64_image_local, base64ImageLocal);
        this.app.use(this.apiPaths.base64_image_event, base64ImageEvent);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Service corriendo en el puerto ' + this.port);
        });
    }
}

export default Server;