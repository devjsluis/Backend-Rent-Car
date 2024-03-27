//Con el exports creamos una respuesta success y una de error
//Es para estandarizar respuestas fijas
exports.success = (res, data, message, status) => {
  res.status(status || 200).send({
    error: false, //
    status: status || 200, //Si no viene status trae 200 que es todo bien
    body: data,
    message: message || "",
  });
};

exports.error = (res, message, status) => {
  res.status(status || 500).send({
    error: true, //
    status: status || 500, //Si no viene status trae 200 que es todo bien
    body: [],
    message: message || "Internal server error",
  });
};
