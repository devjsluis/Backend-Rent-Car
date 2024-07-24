const response = require("../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");

const getElementsCatalog = async (req, res) => {
  try {
    const data = await pool.query(mysql.getEverything(model.TABLA));
    response.success(res, data, "Lista de elementos de catálogo", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getTipos = async (req, res) => {
  try {
    const query = mysql.getEverything(model.TABLA, `WHERE ${model.CONDICION1}`);
    const data = await pool.query(query);
    response.success(res, data, "Lista de tipos de vehículo registrados", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getTipos2 = async (req, res) => {
  try {
    const query = mysql.getEverything(
      model.TABLA,
      `WHERE ${model.CONDICION1} ORDER BY ${model.CAMPO1} ASC`
    );
    const data = await pool.query(query);
    response.success(res, data, "Lista de tipos de vehículo registrados", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getMarcas = async (req, res) => {
  try {
    const query = mysql.getEverything(model.TABLA, `WHERE ${model.CONDICION2}`);
    const data = await pool.query(query);
    response.success(res, data, "Lista de marcas registradas", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getMarcas2 = async (req, res) => {
  try {
    const query = mysql.getEverything(
      model.TABLA,
      `WHERE ${model.CONDICION2} ORDER BY ${model.CAMPO1} ASC`
    );
    const data = await pool.query(query);
    response.success(res, data, "Lista de marcas registradas", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getModelos = async (req, res) => {
  try {
    const query = mysql.getEverything(model.TABLA, `WHERE ${model.CONDICION3}`);
    const data = await pool.query(query);
    response.success(res, data, "Lista de modelos registrados", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getModelos2 = async (req, res) => {
  try {
    const query = mysql.getEverything(
      model.TABLA,
      `WHERE ${model.CONDICION3} ORDER BY ${model.CAMPO1} ASC`
    );
    const data = await pool.query(query);
    response.success(res, data, "Lista de modelos registrados", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getAnios = async (req, res) => {
  try {
    const query = mysql.getEverything(model.TABLA, `WHERE ${model.CONDICION4}`);
    const data = await pool.query(query);
    response.success(res, data, "Lista de años registrados", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getAnios2 = async (req, res) => {
  try {
    const query = mysql.getEverything(
      model.TABLA,
      `WHERE ${model.CONDICION4} ORDER BY ${model.CAMPO1} ASC`
    );
    const data = await pool.query(query);
    response.success(res, data, "Lista de años registrados", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const createElementsCatalog = async (req, res) => {
  try {
    if (req.body && req.body.DESCRIPCION && req.body.ID_CATALOGO) {
      const queryCheck = mysql.getEverything(
        model.TABLA,
        `WHERE ${model.CONDICION5}`
      );
      const exists = await pool.query(queryCheck, [req.body.DESCRIPCION]);

      // Verificar si la descripción existe en el mismo catálogo
      const sameCatalogExists = exists.find(
        (item) => item.ID_CATALOGO === req.body.ID_CATALOGO
      );
      if (sameCatalogExists) {
        response.error(res, "La descripción ya existe para este catálogo", 409); // 409 Conflict
        return;
      }

      const queryInsert = mysql.insert(model.TABLA);
      await pool.query(queryInsert, req.body);
      response.success(res, req.body, "Elementos de catálogo creados", 201);
    } else {
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const updateElementsCatalog = async (req, res) => {
  try {
    if (req.body && req.body.DESCRIPCION) {
      const queryCheck = mysql.getEverything(
        model.TABLA,
        `WHERE ${model.CONDICION5}`
      );
      const exists = await pool.query(queryCheck, [req.body.DESCRIPCION]);

      // Verificar si la descripción existe en otro registro (diferente ID)
      const sameDescriptionExists = exists.find(
        (item) => item.ID !== req.params.id
      );
      if (sameDescriptionExists) {
        response.error(res, "La descripción ya existe en otro elemento", 409); // 409 Conflict
        return;
      }

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
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const deleteElementsCatalog = async (req, res) => {
  try {
    const catalogId = req.params.id; // Asumiendo que el ID del catálogo viene como parámetro en la URL

    // Generar la consulta dinámica utilizando getEverything
    const usageCountQueryVehiculos = mysql.getEverything(
      model.TABLA2,
      `WHERE ${model.CONDICION7}`,
      "COUNT(*) AS count"
    );
    const [usageResultVehiculos] = await pool.query(usageCountQueryVehiculos, [
      catalogId,
      catalogId,
      catalogId,
      catalogId,
    ]);
    const usageCountVehiculos = usageResultVehiculos.count;

    if (usageCountVehiculos > 0) {
      res.status(409).json({
        message: `El catálogo está siendo utilizado por ${usageCountVehiculos} ${
          usageCountVehiculos === 1 ? "vehículo" : "vehículos"
        }  por lo que no puede ser eliminado`,
      });
      return;
    }
    await pool.query(mysql.update(model.TABLA), [
      { ESTATUS: 0 },
      { ID: req.params.id },
    ]);
    response.success(res, "", "Elementos de catálogo eliminados", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const reactivateElementsCatalog = async (req, res) => {
  try {
    await pool.query(mysql.update(model.TABLA), [
      { ESTATUS: 1 },
      { ID: req.params.id },
    ]);
    response.success(res, "", "Element reactivated", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getElementsCatalogById = async (req, res) => {
  try {
    const [elementsCatalog] = await pool.query(
      mysql.getEverything(model.TABLA, `WHERE ${model.CONDICION6}`),
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
  getTipos,
  getMarcas,
  getModelos,
  getAnios,
  reactivateElementsCatalog,
  getTipos2,
  getMarcas2,
  getModelos2,
  getAnios2,
};
