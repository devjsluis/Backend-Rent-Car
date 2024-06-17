const response = require("../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");

const getRegisterRent = async (req, res) => {
  try {
    const columns = model.COLUMNAS1;
    const whereClause = model.CONDICIONES1;
    const data = await pool.query(
      mysql.getEverything(model.TABLA2, whereClause, columns)
    );
    response.success(res, data, "Lista de registro de rentas", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getRegisterRent7Days = async (req, res) => {
  try {
    const data = await pool.query(mysql.getEverything(model.VIEW));
    response.success(res, data, "Ventas en los últimos 7 días", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const createRegisterRent = async (req, res) => {
  try {
    if (
      req.body &&
      req.body.ID_CLIENTE &&
      req.body.ID_VEHICULO &&
      req.body.FECHA_RENTA &&
      req.body.FECHA_ENTREGA &&
      req.body.FECHA_RETORNO &&
      req.body.COSTO_TOTAL &&
      req.body.KILOMETRAJE_INICIAL &&
      req.body.KILOMETRAJE_FINAL &&
      req.body.DESTINO_DE_VIAJE &&
      req.body.ESTATUS
    ) {
      await pool.query(mysql.insert(model.TABLA), req.body);
      response.success(res, req.body, "Registro de renta creado", 201);
    } else {
      console.log(res);
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const updateRegisterRent = async (req, res) => {
  try {
    if (req.body) {
      await pool.query(mysql.update(model.TABLA), [
        req.body,
        { ID: req.params.id },
      ]);
      response.success(res, req.body, "Registro de renta actualizado", 200);
    } else {
      console.log(error);
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const reactivateRegisterRent = async (req, res) => {
  try {
    await pool.query(mysql.update(model.TABLA), [
      { ESTATUS: 1 },
      { ID: req.params.id },
    ]);
    response.success(res, "", "Rent register reactivated", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const deactivateRegisterRent = async (req, res) => {
  try {
    await pool.query(mysql.update(model.TABLA), [
      { ESTATUS: 0 },
      { ID: req.params.id },
    ]);
    response.success(res, "", "Register Rent Deactivated", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getRegisterRentById = async (req, res) => {
  try {
    const [registerRent] = await pool.query(
      mysql.getEverything(model.TABLA, model.CONDICION2),
      [req.params.id]
    );

    if (!registerRent) {
      response.error(res, "Register Rent no encontrado", 404);
    } else {
      response.success(res, registerRent, "Register Rent encontrado", 200);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

//No se hizo la consulta para encontrar por ID, actualizar o eliminar porque el campo ID no existe en la base de datos

module.exports = {
  getRegisterRent,
  getRegisterRent7Days,
  createRegisterRent,
  updateRegisterRent,
  reactivateRegisterRent,
  deactivateRegisterRent,
  getRegisterRentById,
};
