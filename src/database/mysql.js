const list = (tableName) => {
    const query = `SELECT * FROM ${tableName}`;
    return query;
};


module.exports = {
    list
};