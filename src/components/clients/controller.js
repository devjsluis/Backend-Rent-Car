const response = require("./../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");

const getClients = async (req, res) => {
  try {
    const whereClause = `
      WHERE
      ${model.CAMPO1} = ${model.CAMPO2}
      ORDER BY ${model.CAMPO3} ASC
    `;

    const columns = `
      ${model.CAMPO4},
      ${model.CAMPO5},
      ${model.CAMPO6}
    `;
    const data = await pool.query(
      mysql.getEverything(
        `${model.TABLA1}, ${model.TABLA2}`,
        whereClause,
        columns
      )
    );
    response.success(res, data, "Lista de clientes", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getClientsByName = async (req, res) => {
  try {
    const data = await pool.query(
      mysql.getEverything(
        model.TABLA1,
        `WHERE ${model.CONDICION1} ORDER BY ${model.CAMPO7} ASC`
      )
    );
    response.success(res, data, "Lista de clientes", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getNewClients = async (req, res) => {
  try {
    const data = await pool.query(mysql.getEverything(model.VIEW));
    response.success(res, data, "Lista de clientes", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getClients15Days = async (req, res) => {
  try {
    const data = await pool.query(mysql.getEverything(model.VIEW2));
    response.success(res, data, "Clientes en los últimos 15 días", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const createClient = async (req, res) => {
  try {
    if (
      req.body &&
      req.body.NOMBRE &&
      req.body.APELLIDOS &&
      req.body.FECHA_NACIMIENTO &&
      req.body.TELEFONO &&
      req.body.CORREO &&
      req.body.ESTATUS &&
      req.body.ID_USUARIO_ALTA
    ) {
      await pool.query(mysql.insert(model.TABLA1), req.body);
      response.success(res, req.body, "Cliente creado", 201);
    } else {
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const updateClient = async (req, res) => {
  try {
    if (req.body) {
      await pool.query(mysql.update(model.TABLA1), [
        req.body,
        { ID: req.params.id },
      ]);
      response.success(res, req.body, "Cliente actualizado", 200);
    } else {
      console.log(error);
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const deactivateClient = async (req, res) => {
  try {
    await pool.query(mysql.update(model.TABLA1), [
      { ESTATUS: 0 },
      { ID: req.params.id },
    ]);
    response.success(res, "", "Client deactivated", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const reactivateClient = async (req, res) => {
  try {
    await pool.query(mysql.update(model.TABLA1), [
      { ESTATUS: 1 },
      { ID: req.params.id },
    ]);
    response.success(res, "", "Client reactivated", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getClientById = async (req, res) => {
  try {
    const [client] = await pool.query(
      mysql.getEverything(model.TABLA1, `WHERE ${model.CONDICION2}`),
      [req.params.id]
    );

    if (!client) {
      response.error(res, "Cliente no encontrado", 404);
    } else {
      response.success(res, client, "Cliente encontrado", 200);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

module.exports = {
  getClients,
  getClientById,
  getClientsByName,
  getClients15Days,
  getNewClients,
  createClient,
  updateClient,
  deactivateClient,
  reactivateClient,
};
