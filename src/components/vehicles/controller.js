const response = require("./../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");

const getVehicles = async (req, res) => {
  try {
    const query = mysql.getEverything(model.TABLA, "WHERE ID_CATALOGO = 1");
    const data = await pool.query(query);
    response.success(res, data, "Lista de vehículos", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getVehiclesMarca = async (req, res) => {
  try {
    const whereClause = `
      LEFT JOIN elementos_catalogos marca ON v.ID_MARCA = marca.ID
      LEFT JOIN elementos_catalogos modelo ON v.ID_MODELO = modelo.ID
      LEFT JOIN elementos_catalogos anio ON v.ID_ANIO = anio.ID
      ORDER BY marca.DESCRIPCION ASC
    `;

    const columns = `
      v.*,
      marca.DESCRIPCION AS MARCA,
      modelo.DESCRIPCION AS MODELO,
      anio.DESCRIPCION AS ANIO
    `;
    const data = await pool.query(
      mysql.getEverything("vehiculos v", whereClause, columns)
    );
    response.success(res, data, "Lista de vehículos", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getVehiclesAll = async (req, res) => {
  try {
    const whereClause = `
    LEFT JOIN elementos_catalogos marca ON v.ID_MARCA = marca.ID
    LEFT JOIN elementos_catalogos modelo ON v.ID_MODELO = modelo.ID
    LEFT JOIN elementos_catalogos anio ON v.ID_ANIO = anio.ID
    ORDER BY v.ID ASC`;
    const columns = `
    v.*,
    marca.DESCRIPCION AS MARCA,
    modelo.DESCRIPCION AS MODELO,
    anio.DESCRIPCION AS ANIO`;

    const data = await pool.query(
      mysql.getEverything("vehiculos v", whereClause, columns)
    );
    response.success(res, data, "Lista de vehículos", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const createVehicle = async (req, res) => {
  try {
    const {
      FECHA_ALTA,
      ESTATUS,
      ID_TIPO_VEHICULO,
      ID_MARCA,
      ID_MODELO,
      ID_ANIO,
      NOTAS,
    } = req.body;

    // Verificar que todos los campos requeridos están presentes (excepto NOTAS que puede ser "")
    if (
      FECHA_ALTA &&
      ESTATUS &&
      ID_TIPO_VEHICULO &&
      ID_MARCA &&
      ID_MODELO &&
      ID_ANIO &&
      NOTAS !== undefined
    ) {
      // Asegurarse de que NOTAS tiene un valor, aunque sea una cadena vacía
      const vehicleData = {
        FECHA_ALTA,
        ESTATUS,
        ID_TIPO_VEHICULO,
        ID_MARCA,
        ID_MODELO,
        ID_ANIO,
        NOTAS: NOTAS || "",
      };

      // Ejecutar la consulta de inserción
      await pool.query(mysql.insert(model.TABLA), vehicleData);

      // Enviar respuesta de éxito
      response.success(res, vehicleData, "Vehículo creado", 201);
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

const reactivateVehicle = async (req, res) => {
  try {
    await pool.query(mysql.update(model.TABLA), [
      { ESTATUS: 1 },
      { ID: req.params.id },
    ]);
    response.success(res, "", "Vehicle reactivated", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getVehicleById = async (req, res) => {
  try {
    const [vehiculo] = await pool.query(
      mysql.getEverything(model.TABLA, "WHERE ESTATUS = 1 AND ID = ?"),
      [req.params.id]
    );

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
  getVehiclesMarca,
  createVehicle,
  updateVehicle,
  deactivateVehicle,
  reactivateVehicle,
  getVehiclesAll,
};
