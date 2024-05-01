const getAll = (tableName) => {
  return `SELECT * FROM ${tableName} WHERE ESTATUS = 1`;
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

module.exports = {
  getAll,
  getWithoutStatus,
  getById,
  getByIdWithoutStatus,
  insert,
  update,
  deleteQuery,
  getByEmail,
};
