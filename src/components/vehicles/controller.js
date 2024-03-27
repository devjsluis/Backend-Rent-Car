const response = require("./../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");

const getVehicles = async (req, res) => {
  try {
    const data = await pool.query(mysql.getAll(model.TABLA));
    response.success(res, data, "Lista de vehículos", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const createVehicle = async (req, res) => {
  try {
    if (
      req.body &&
      req.body.FECHA_ALTA &&
      req.body.ESTATUS &&
      req.body.ID_TIPO_VEHICULO &&
      req.body.ID_MARCA &&
      req.body.ID_MODELO &&
      req.body.ID_ANIO &&
      req.body.NOTAS
    ) {
      await pool.query(mysql.insert(model.TABLA), req.body);
      response.success(res, req.body, "Vehículo creado", 201);
    } else {
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const updateVehicle = async (req, res) => {
  try {
    if (req.body) {
      await pool.query(mysql.update(model.TABLA), [
        req.body,
        { ID: req.params.id },
      ]);
      response.success(res, req.body, "Vehículo actualizado", 200);
    } else {
      console.log(error);
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const deactivateVehicle = async (req, res) => {
  try {
    await pool.query(mysql.update(model.TABLA), [
      { ESTATUS: 0 },
      { ID: req.params.id },
    ]);
    response.success(res, "", "Vehicle deactivated", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getVehicleById = async (req, res) => {
  try {
    const [vehiculo] = await pool.query(mysql.getById(model.TABLA), [
      req.params.id,
    ]);

    if (!vehiculo) {
      response.error(res, "Vehículo no encontrado", 404);
    } else {
      response.success(res, vehiculo, "Vehículo encontrado", 200);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

module.exports = {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deactivateVehicle,
};
