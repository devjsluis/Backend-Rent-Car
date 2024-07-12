const elementos = {
  TABLA: "elementos_catalogos",
  TABLA2: "vehiculos",
  CONDICION1: "ID_CATALOGO = 1",
  CONDICION2: "ID_CATALOGO = 2",
  CONDICION3: "ID_CATALOGO = 3",
  CONDICION4: "ID_CATALOGO = 4",
  CONDICION5: "DESCRIPCION = ?",
  CONDICION6: "ID = ?",
  CONDICION7:
    "ESTATUS = 1 AND (ID_TIPO_VEHICULO = ? OR ID_MARCA = ? OR ID_MODELO = ? OR ID_ANIO = ?)",
  CAMPO1: "elementos_catalogos.DESCRIPCION",
};

module.exports = elementos;
