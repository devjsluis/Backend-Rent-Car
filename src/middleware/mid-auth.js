const jwt = require("jwt-simple");
const moment = require("moment");
const response = require("../network/response");

exports.isAuth = (req, res, next) => {
  //comprombar si existe el header de autorizacion
  if (!req.headers.authorization) {
    return response.error(res, "No tienes autorización", 401);
  }
  let payload = {};
  try {
    //Decodificar el token
    payload = jwt.decode(req.headers.authorization, process.env.SECRET_KEY);
    //Comprobar si el token ha expirado
    if (payload.exp <= moment().unix()) {
      return response.error(res, "El token ha expirado", 401);
    }
  } catch (error) {
    console.log(error);
    return response.error(res, "Error interno", 401);
  }
  req.user = payload;
  next();
};

exports.hasRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      return response.error(
        res,
        "No tienes permisos para acceder a esta ruta",
        403
      );
    }
    next();
  };
};
