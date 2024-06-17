const response = require("../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");

const getFunctions = async (req, res) => {
  try {
    const data = await pool.query(mysql.getEverything(model.TABLA));
    response.success(res, data, "Lista de funciones", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const createFunction = async (req, res) => {
  try {
    if (req.body && req.body.NOMBRE_FUNCION && req.body.ID_ROL) {
      await pool.query(mysql.insert(model.TABLA), req.body);
      response.success(res, req.body, "Función creada", 201);
    } else {
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const updateFunction = async (req, res) => {
  try {
    if (req.body) {
      await pool.query(mysql.update(model.TABLA), [
        req.body,
        { ID: req.params.id },
      ]);
      response.success(res, req.body, "Función actualizada", 200);
    } else {
      console.log(error);
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

//Delete definitivo
const deleteFunction = async (req, res) => {
  try {
    await pool.query(mysql.deleteQuery(model.TABLA), [{ ID: req.params.id }]);
    response.success(res, "", "Función eliminada", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getFunctionById = async (req, res) => {
  try {
    const [elementsCatalog] = await pool.query(
      mysql.getEverything(model.TABLA, "WHERE ID = ?"),
      [req.params.id]
    );

    if (!elementsCatalog) {
      response.error(res, "Función no encontrada", 404);
    } else {
      response.success(res, elementsCatalog, "Función encontrada", 200);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

module.exports = {
  getFunctions,
  createFunction,
  updateFunction,
  deleteFunction,
  getFunctionById,
};
