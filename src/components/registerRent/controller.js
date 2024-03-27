const response = require("../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");

const getRegisterRent = async (req, res) => {
  try {
    const data = await pool.query(mysql.getAll(model.TABLA));
    response.success(res, data, "Lista de registro de rentas", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const createRegisterRent = async (req, res) => {
  try {
    if (
      req.body &&
      req.body.FECHA_RENTA &&
      req.body.FECHA_ENTREGA &&
      req.body.FECHA_RETORNO &&
      req.body.COSTO_TOTAL &&
      req.body.KILOMETRAJE_INICIAL &&
      req.body.KILOMETRAJE_FINAL &&
      req.body.DESTINO_DE_VIAJE &&
      req.body.ESTATUS
    ) {
      const requestData = {
        ...req.body,
        ID_CLIENTE: req.params.idClient,
        ID_VEHICULO: req.params.idVehicle,
      };
      await pool.query(mysql.insert(model.TABLA), requestData);
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

// const updateRegisterRent = async (req, res) => {
//   try {
//     if (req.body) {
//       await pool.query(mysql.update(model.TABLA), [
//         req.body,
//         { ID: req.params.id },
//       ]);
//       response.success(res, req.body, "Registro de renta actualizado", 200);
//     } else {
//       console.log(error);
//       response.error(res, "Hay datos faltantes", 400);
//     }
//   } catch (error) {
//     console.log(error);
//     response.error(res, "Internal Error", 500, error);
//   }
// };

// const deactivateRegisterRent = async (req, res) => {
//   try {
//     await pool.query(mysql.update(model.TABLA), [
//       { ESTATUS: 0 },
//       { ID: req.params.id },
//     ]);
//     response.success(res, "", "Register Rent Deactivated", 200);
//   } catch (error) {
//     console.log(error);
//     response.error(res, "Internal Error", 500, error);
//   }
// };

// const getRegisterRentById = async (req, res) => {
//   try {
//     const [registerRent] = await pool.query(mysql.getById(model.TABLA), [
//       req.params.id,
//     ]);

//     if (!registerRent) {
//       response.error(res, "Register Rent no encontrado", 404);
//     } else {
//       response.success(res, registerRent, "Register Rent encontrado", 200);
//     }
//   } catch (error) {
//     console.log(error);
//     response.error(res, "Internal Error", 500, error);
//   }
// };

//No se hizo la consulta para encontrar por ID, actualizar o eliminar porque el campo ID no existe en la base de datos

module.exports = {
  getRegisterRent,
  createRegisterRent,
  // updateRegisterRent,
  // deactivateRegisterRent,
  // getRegisterRentById
};
