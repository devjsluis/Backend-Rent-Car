const response = require("./../../network/response");
const pool = require("../../database/conexion");
const mysql = require("../../database/mysql");
const model = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("../../services/jwt");
const administratorIdRol = Number(process.env.ADMINISTRATOR_ID_ROL);
const managerIdRol = Number(process.env.MANAGER_ID_ROL);

const getUsers = async (req, res) => {
  try {
    const data = await pool.query(mysql.getEverything(model.TABLA));
    response.success(res, data, "Lista de Usuarios", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const createUser = async (req, res) => {
  try {
    if (
      req.body &&
      req.body.NOMBRE &&
      req.body.APELLIDOS &&
      req.body.FECHA_NACIMIENTO &&
      req.body.CORREO &&
      req.body.CONTRASENA &&
      req.body.ESTATUS &&
      req.body.ID_ROL
    ) {
      // Verificamos si el correo ya existe
      const existingUser = await pool.query(
        mysql.getEverything(model.TABLA, `WHERE ${model.CONDICION2}`),
        [req.body.CORREO]
      );
      if (existingUser.length > 0) {
        return response.error(res, "El correo ya está en uso", 409);
      }

      if (
        req.user.rol === managerIdRol &&
        (req.body.ID_ROL === process.env.ADMINISTRATOR_ID_ROL ||
          req.body.ID_ROL === process.env.MANAGER_ID_ROL)
      ) {
        return response.error(
          res,
          "No tienes permisos para crear este tipo de usuario",
          403
        );
      }
      const hashedPassword = await bcrypt.hash(req.body.CONTRASENA, 10);

      const user = {
        NOMBRE: req.body.NOMBRE,
        APELLIDOS: req.body.APELLIDOS,
        FECHA_NACIMIENTO: req.body.FECHA_NACIMIENTO,
        CORREO: req.body.CORREO,
        CONTRASENA: hashedPassword,
        ESTATUS: req.body.ESTATUS,
        ID_ROL: req.body.ID_ROL,
      };
      await pool.query(mysql.insert(model.TABLA), user);
      response.success(res, user, "Usuario creado", 201);
    } else {
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const updateUser = async (req, res) => {
  try {
    const [targetUser] = await pool.query(
      mysql.getEverything(model.TABLA, model.CONDICION4),
      [req.params.id]
    );
    if (!targetUser) {
      return response.error(res, "Usuario no encontrado", 404);
    }

    if (
      req.user.rol === managerIdRol &&
      (targetUser.ID_ROL === administratorIdRol ||
        targetUser.ID_ROL === managerIdRol)
    ) {
      return response.error(
        res,
        "No tienes permisos para actualizar este tipo de usuario",
        403
      );
    }
    if (req.body) {
      if (req.body.CORREO && req.body.CORREO !== targetUser.CORREO) {
        try {
          const results = await pool.query(
            mysql.getEverything(model.TABLA, `WHERE ${model.CONDICION2}`),
            [req.body.CORREO]
          );

          if (results.length > 0) {
            return response.error(res, "El correo ya está en uso", 409);
          }
        } catch (error) {
          console.error("Error en la consulta SQL:", error);
          return response.error(res, "Error del servidor", 500);
        }
      }

      if (req.body.CONTRASENA) {
        const hashedPassword = await bcrypt.hash(req.body.CONTRASENA, 10);
        req.body.CONTRASENA = hashedPassword;
      }

      await pool.query(mysql.update(model.TABLA), [
        req.body,
        { ID: req.params.id },
      ]);
      response.success(res, req.body, "Usuario actualizado", 200);
    } else {
      response.error(res, "Hay datos faltantes", 400);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const reactivateUser = async (req, res) => {
  try {
    const [targetUser] = await pool.query(
      mysql.getEverything(model.TABLA, model.CONDICION4, model.CAMPO1),
      [req.params.id]
    );
    if (!targetUser) {
      return response.error(res, "Usuario no encontrado", 404);
    }

    if (
      req.user.rol === managerIdRol &&
      (targetUser.ID_ROL === administratorIdRol ||
        targetUser.ID_ROL === managerIdRol)
    ) {
      return response.error(
        res,
        "No tienes permisos para reactivar este tipo de usuario",
        403
      );
    }
    await pool.query(mysql.update(model.TABLA), [
      { ESTATUS: 1 },
      { ID: req.params.id },
    ]);
    response.success(res, "", "User reactivated", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const deactivateUser = async (req, res) => {
  try {
    const [targetUser] = await pool.query(
      mysql.getEverything(model.TABLA, model.CONDICION4, model.CAMPO1),
      [req.params.id]
    );
    if (!targetUser) {
      return response.error(res, "Usuario no encontrado", 404);
    }
    if (
      req.user.rol === managerIdRol &&
      (targetUser.ID_ROL === administratorIdRol ||
        targetUser.ID_ROL === managerIdRol)
    ) {
      return response.error(
        res,
        "No tienes permisos para desactivar este tipo de usuario",
        403
      );
    }
    await pool.query(mysql.update(model.TABLA), [
      { ESTATUS: 0 },
      { ID: req.params.id },
    ]);
    response.success(res, "", "User deactivated", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const getUserById = async (req, res) => {
  try {
    const [user] = await pool.query(
      mysql.getEverything(model.TABLA, `WHERE ${model.CONDICION1}`),
      [req.params.id]
    );

    if (!user) {
      response.error(res, "Usuario no encontrado", 404);
    } else {
      response.success(res, user, "Usuario encontrado", 200);
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { CORREO, CONTRASENA } = req.body;
    if (!CORREO || !CONTRASENA) {
      return response.error(res, "Correo y contraseña son requeridos", 400);
    }

    const [user] = await pool.query(
      mysql.getEverything(
        model.TABLA,
        `WHERE ${model.CONDICION2} AND ${model.CONDICION3}`
      ),
      CORREO
    );
    if (!user) {
      return response.error(res, "Usuario no encontrado", 404);
    }
    const passwordMatch = await bcrypt.compare(CONTRASENA, user.CONTRASENA);
    if (!passwordMatch) {
      return response.error(res, "Contraseña incorrecta", 401);
    }

    const token = jwt.createToken(user);
    response.success(res, { token }, "Inicio de sesión exitoso", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Internal Error", 500, error);
  }
};

const saveProfileImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const userId = req.user.id; // Asume que tienes la identificación del usuario autenticado

    await pool.query(mysql.update(model.TABLA), [
      { profile_image_url: imageUrl },
      { ID: userId },
    ]);
    response.success(res, { imageUrl }, "Imagen guardada correctamente", 200);
  } catch (error) {
    console.log(error);
    response.error(res, "Error al guardar la imagen", 500, error);
  }
};

const getProfileImage = async (req, res) => {
  try {
    const userId = req.user.id; // Asume que tienes la identificación del usuario autenticado
    const [user] = await pool.query(
      mysql.getEverything(model.TABLA, `WHERE ${model.CONDICION1}`),
      [userId]
    );

    if (!user) {
      response.error(res, "Usuario no encontrado", 404);
    } else {
      response.success(
        res,
        { imageUrl: user.profile_image_url },
        "Imagen obtenida correctamente",
        200
      );
    }
  } catch (error) {
    console.log(error);
    response.error(res, "Error al obtener la imagen", 500, error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  reactivateUser,
  updateUser,
  deactivateUser,
  loginUser,
  saveProfileImage,
  getProfileImage,
};
