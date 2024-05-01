const jwt = require('jwt-simple');
const moment = require('moment');

exports.createToken = (user) => {

    const payload = {
        id: user.ID,
        nombre: user.NOMBRE,
        email: user.CORREO,
        rol: user.ID_ROL,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
    }

    return jwt.encode(payload, process.env.SECRET_KEY);
}