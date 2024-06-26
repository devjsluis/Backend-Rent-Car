const clientes = {
  TABLA1: "clientes",
  TABLA2: "usuarios",
  VIEW: "nuevos_clientes",
  VIEW2: "vista_clientes_15_dias",
  CAMPO1: "clientes.ID_USUARIO_ALTA",
  CAMPO2: "usuarios.ID",
  CAMPO3: "clientes.ID",
  CAMPO4: "clientes.*",
  CAMPO5: "usuarios.NOMBRE as 'NOMBRE_USUARIO_ALTA'",
  CAMPO6: "usuarios.APELLIDOS AS 'APELLIDO_USUARIO_ALTA'",
  CAMPO7: "clientes.APELLIDOS",
  CONDICION1: "clientes.ESTATUS=1",
  CONDICION2: "ESTATUS = 1 AND ID = ?",
};

module.exports = clientes;
