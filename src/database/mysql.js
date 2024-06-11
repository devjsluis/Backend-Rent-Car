const getAll = (tableName) => {
  return `SELECT * FROM ${tableName} WHERE ESTATUS = 1`;
};

const getVehiclesMarcas = (tableName) => {
  return `SELECT
    v.*,
    marca.DESCRIPCION AS MARCA,
    modelo.DESCRIPCION AS MODELO,
    anio.DESCRIPCION AS ANIO
FROM
    vehiculos v
LEFT JOIN
    elementos_catalogos marca ON v.ID_MARCA = marca.ID
LEFT JOIN
    elementos_catalogos modelo ON v.ID_MODELO = modelo.ID
LEFT JOIN
    elementos_catalogos anio ON v.ID_ANIO = anio.ID
ORDER BY
    marca.DESCRIPCION ASC;
`;
};

const getAll7Days = (tableName) => {
  return `SELECT * FROM ${tableName}`;
};

const getEverything = (tableName, whereClause = "") => {
  let query = `SELECT * FROM ${tableName}`;
  if (whereClause) {
    query += ` ${whereClause}`;
  }
  return query;
};

const getAllClients = (tableName) => {
  return `SELECT clientes.*, usuarios.NOMBRE as 'NOMBRE_USUARIO_ALTA', usuarios.APELLIDOS AS 'APELLIDO_USUARIO_ALTA' FROM clientes , usuarios WHERE clientes.ID_USUARIO_ALTA = usuarios.ID ORDER BY clientes.ID ASC;`;
};

const getClientsByNames = (tableName) => {
  return `SELECT * FROM clientes WHERE clientes.ESTATUS=1 ORDER BY clientes.APELLIDOS ASC;`;
};

const getAllRegister = () => {
  return `SELECT r.*, c.NOMBRE AS NOMBRE_CLIENTE, c.APELLIDOS AS APELLIDOS_CLIENTE, v.ID_MARCA, v.ID_MODELO, v.ID_ANIO, m.DESCRIPCION AS MARCA, mo.DESCRIPCION AS MODELO, a.DESCRIPCION AS ANIO
FROM registro_rentas r
INNER JOIN clientes c ON r.ID_CLIENTE = c.ID
INNER JOIN vehiculos v ON r.ID_VEHICULO = v.ID
INNER JOIN elementos_catalogos m ON v.ID_MARCA = m.ID
INNER JOIN elementos_catalogos mo ON v.ID_MODELO = mo.ID
INNER JOIN elementos_catalogos a ON v.ID_ANIO = a.ID ORDER BY r.ID ASC;
`;
};

const getNewClients = (tableName) => {
  return `SELECT * FROM ${tableName};`;
};

const getWithoutStatus = (tableName) => {
  return `SELECT * FROM ${tableName}`;
};

const getById = (tableName) => {
  return `SELECT * FROM ${tableName} WHERE ESTATUS = 1 AND ID = ?`;
};

const getByIdWithoutStatus = (tableName) => {
  return `SELECT * FROM ${tableName} WHERE ID = ?`;
};

const insert = (tableName) => {
  return `Insert into ${tableName} set ?`;
};

const update = (tableName) => {
  return `Update ${tableName} set ? where ?`;
};

const deleteQuery = (tableName) => {
  return `Delete from ${tableName} where ?`;
};

const getByEmail = (tableName) => {
  return `SELECT * FROM ${tableName} WHERE CORREO = ?`;
};

const checkIfDescriptionExists = (tableName) => {
  return `SELECT * FROM ${tableName} WHERE DESCRIPCION = ?`;
};

module.exports = {
  checkIfDescriptionExists,
  getAll,
  getAll7Days,
  getEverything,
  getAllClients,
  getAllRegister,
  getClientsByNames,
  getNewClients,
  getWithoutStatus,
  getById,
  getByIdWithoutStatus,
  insert,
  update,
  deleteQuery,
  getByEmail,
  getVehiclesMarcas,
};
