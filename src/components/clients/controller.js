const response = require("./../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");

const getClients = async (req, res) => {
  try {
    const whereClause = `
      WHERE
      clientes.ID_USUARIO_ALTA = usuarios.ID
      ORDER BY clientes.ID ASC
    `;

    const columns = `
      clientes.*,
      usuarios.NOMBRE as 'NOMBRE_USUARIO_ALTA',
      usuarios.APELLIDOS AS 'APELLIDO_USUARIO_ALTA'
    `;
    const data = await pool.query(
      mysql.getEverything("clientes, usuarios", whereClause, columns)
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
        model.TABLA,
        "WHERE clientes.ESTATUS=1 ORDER BY clientes.APELLIDOS ASC"
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
      await pool.query(mysql.insert(model.TABLA), req.body);
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
      await pool.query(mysql.update(model.TABLA), [
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
    await pool.query(mysql.update(model.TABLA), [
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
    await pool.query(mysql.update(model.TABLA), [
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
      mysql.getEverything(model.TABLA, "WHERE ESTATUS = 1 AND ID = ?"),
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
