const vehiculos = {
  VIEW: "vehiculo_mas_rentado_ultimos_30_dias",
  VIEW2: "top_10_vehiculos_mas_usados_ultimos_30_dias",
  TABLA: "vehiculos",
  TABLA2: "vehiculos v",
  CAMPOS1: `v.*,
      marca.DESCRIPCION AS MARCA,
      modelo.DESCRIPCION AS MODELO,
      anio.DESCRIPCION AS ANIO`,
  CONDICION1: "ID_CATALOGO = 1",
  CONDICION2: "ESTATUS = 1 AND ID = ?",
  CONDICIONES1: `LEFT JOIN elementos_catalogos marca ON v.ID_MARCA = marca.ID
      LEFT JOIN elementos_catalogos modelo ON v.ID_MODELO = modelo.ID
      LEFT JOIN elementos_catalogos anio ON v.ID_ANIO = anio.ID
      ORDER BY marca.DESCRIPCION ASC`,
  CONDICIONES2: `LEFT JOIN elementos_catalogos marca ON v.ID_MARCA = marca.ID
    LEFT JOIN elementos_catalogos modelo ON v.ID_MODELO = modelo.ID
    LEFT JOIN elementos_catalogos anio ON v.ID_ANIO = anio.ID
    ORDER BY v.ID ASC`,
};

module.exports = vehiculos;
