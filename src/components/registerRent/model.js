const registerRent = {
  TABLA: "registro_rentas",
  TABLA2: "registro_rentas r",
  VIEW: "vista_ventas_7_dias",
  VIEW2: "vista_ingresos_anuales",
  COLUMNAS1: `r.*, 
    c.NOMBRE AS NOMBRE_CLIENTE, 
    c.APELLIDOS AS APELLIDOS_CLIENTE, 
    v.ID_MARCA, 
    v.ID_MODELO, 
    v.ID_ANIO, 
    m.DESCRIPCION AS MARCA, 
    mo.DESCRIPCION AS MODELO, 
    a.DESCRIPCION AS ANIO`,
  CONDICIONES1: `INNER JOIN clientes c ON r.ID_CLIENTE = c.ID
    INNER JOIN vehiculos v ON r.ID_VEHICULO = v.ID
    INNER JOIN elementos_catalogos m ON v.ID_MARCA = m.ID
    INNER JOIN elementos_catalogos mo ON v.ID_MODELO = mo.ID
    INNER JOIN elementos_catalogos a ON v.ID_ANIO = a.ID 
    ORDER BY r.ID ASC`,
  CONDICION2: "ESTATUS = 1 AND ID = ?",
};

module.exports = registerRent;
