const response = require("./../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");

const getRol = async (req, res) => {
  try {
    const data = await pool.query(mysql.getEverything(model.TABLA));
    response.success(res, data, "Lista de roles", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const createRol = async (req, res) => {
  try {
    if (req.body && req.body.NOMBRE_ROL) {
      await pool.query(mysql.insert(model.TABLA), req.body);
      response.success(res, req.body, "Rol creado", 201);
    } else {
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const updateRol = async (req, res) => {
  try {
    if (req.body) {
      await pool.query(mysql.update(model.TABLA), [
        req.body,
        { ID: req.params.id },
      ]);
      response.success(res, req.body, "Rol actualizado", 200);
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
const deleteRol = async (req, res) => {
  try {
    await pool.query(mysql.deleteQuery(model.TABLA), [{ ID: req.params.id }]);
    response.success(res, "", "Rol eliminado", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getRolById = async (req, res) => {
  try {
    const [rol] = await pool.query(
      mysql.getEverything(model.TABLA, `WHERE ${model.CONDICION1}`),
      [req.params.id]
    );

    if (!rol) {
      response.error(res, "Rol no encontrado", 404);
    } else {
      response.success(res, rol, "Rol encontrado", 200);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

module.exports = {
  getRol,
  getRolById,
  createRol,
  updateRol,
  deleteRol,
};
