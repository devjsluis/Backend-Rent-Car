const response = require("../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");

const getElementsCatalog = async (req, res) => {
  try {
    const data = await pool.query(mysql.getWithoutStatus(model.TABLA));
    response.success(res, data, "Lista de elementos de catálogo", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const createElementsCatalog = async (req, res) => {
  try {
    if (req.body && req.body.DESCRIPCION && req.body.ID_CATALOGO) {
      await pool.query(mysql.insert(model.TABLA), req.body);
      response.success(res, req.body, "Elementos de catálogo creados", 201);
    } else {
      console.log(res);
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const updateElementsCatalog = async (req, res) => {
  try {
    if (req.body) {
      await pool.query(mysql.update(model.TABLA), [
        req.body,
        { ID: req.params.id },
      ]);
      response.success(
        res,
        req.body,
        "Elementos de catálogo actualizados",
        200
      );
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
const deleteElementsCatalog = async (req, res) => {
  try {
    await pool.query(mysql.deleteQuery(model.TABLA), [{ ID: req.params.id }]);
    response.success(res, "", "Elementos de catálogo eliminados", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getElementsCatalogById = async (req, res) => {
  try {
    const [elementsCatalog] = await pool.query(
      mysql.getByIdWithoutStatus(model.TABLA),
      [req.params.id]
    );

    if (!elementsCatalog) {
      response.error(res, "Elementos de catálogo no encontrados", 404);
    } else {
      response.success(
        res,
        elementsCatalog,
        "Elementos de catálogo encontrados",
        200
      );
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

module.exports = {
  getElementsCatalog,
  createElementsCatalog,
  updateElementsCatalog,
  deleteElementsCatalog,
  getElementsCatalogById,
};
