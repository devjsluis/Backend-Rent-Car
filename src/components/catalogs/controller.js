const response = require("../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");

const getCatalogs = async (req, res) => {
  try {
    const data = await pool.query(mysql.getEverything(model.TABLA));
    response.success(res, data, "Lista de catálogos", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const createCatalog = async (req, res) => {
  try {
    if (req.body && req.body.NOMBRE_CATALOGO && req.body.ID_CATALOGO_PADRE) {
      await pool.query(mysql.insert(model.TABLA), req.body);
      response.success(res, req.body, "Catálogo creado", 201);
    } else {
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const updateCatalog = async (req, res) => {
  try {
    if (req.body) {
      await pool.query(mysql.update(model.TABLA), [
        req.body,
        { ID: req.params.id },
      ]);
      response.success(res, req.body, "Catálogo actualizado", 200);
    } else {
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

//Delete definitivo
const deleteCatalog = async (req, res) => {
  try {
    await pool.query(mysql.deleteQuery(model.TABLA), [{ ID: req.params.id }]);
    response.success(res, "", "Catálogo eliminado", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getCatalogById = async (req, res) => {
  try {
    const [catalog] = await pool.query(
      mysql.getEverything(model.TABLA, `WHERE ${model.CAMPO1} = ?`),
      [req.params.id]
    );

    if (!catalog) {
      response.error(res, "Catálogo no encontrado", 404);
    } else {
      response.success(res, catalog, "Catálogo encontrado", 200);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

module.exports = {
  getCatalogs,
  createCatalog,
  updateCatalog,
  deleteCatalog,
  getCatalogById,
};
