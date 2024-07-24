const getEverything = (tableName, whereClause = "", columns = "*") => {
  let query = `SELECT ${columns} FROM ${tableName}`;
  if (whereClause) {
    query += ` ${whereClause}`;
  }
  return query;
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

module.exports = {
  getEverything,
  insert,
  update,
  deleteQuery,
};
