import jwt from 'jsonwebtoken';

const getToken = (user: any) => {

    const id = user.id;

    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(payload, process.env.JWT_PRIVATE_KEY || 'DefaultPrivateKey', {
            expiresIn: '730d'
        }, (error: any, token: any) => {
            if (error) {
                console.log(error);
                reject('Error al generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
}

export default getToken;