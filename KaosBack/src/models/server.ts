import express, { Application } from 'express';
import cors from 'cors';
import db from '../database/connection';
import validateJWT from '../middlewares/validate-jwt';

import authRoutes from '../routes/auth';
import userRoutes from '../routes/users';
import localRoutes from '../routes/locals';
import localTypeRoutes from '../routes/localtypes';
import eventRoutes from '../routes/events';
import groupRoutes from '../routes/groups';
import heartRoutes from '../routes/action_hearts';
import shotRoutes from '../routes/action_shots';
import danceRoutes from '../routes/action_dances';
import { login } from '../controllers/auth';
import { postUser } from '../controllers/users';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth',
        users: '/api/users',
        locals: '/api/locals',
        localTypes: '/api/localtypes/',
        events: '/api/events',
        groups: '/api/groups',
        hearts: '/api/hearts',
        shots: '/api/shots',
        dances: '/api/dances',
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto ' + this.port);
        });
    }

    routes() {
        this.app.use(this.apiPaths.auth, authRoutes)
        this.app.use(this.apiPaths.users, userRoutes)
        this.app.use(this.apiPaths.locals, localRoutes)
        this.app.use(this.apiPaths.localTypes, localTypeRoutes)
        this.app.use(this.apiPaths.events, eventRoutes)
        this.app.use(this.apiPaths.groups, groupRoutes)
        this.app.use(this.apiPaths.hearts, heartRoutes)
        this.app.use(this.apiPaths.shots, shotRoutes)
        this.app.use(this.apiPaths.dances, danceRoutes)
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.post('/api/auth/login', login);
        this.app.post('/api/users', postUser);
        this.app.use('*', validateJWT);
    }

    async dbConnection() {
        try {
            await db.authenticate();
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }
}

export default Server;