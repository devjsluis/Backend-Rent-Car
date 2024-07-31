const catalog = require("../components/catalogs/network");
const clientes = require("../components/clients/network");
const elementos = require("../components/elementsCatalogs/network");
const functions = require("../components/functions/network");
const registerRent = require("../components/registerRent/network");
const vehicles = require("../components/vehicles/network");
const roles = require("../components/roles/network");
const users = require("../components/users/network");
const mainRoute = process.env.MAIN_ROUTE + process.env.API_VERSION;
const midAuth = require("../middleware/mid-auth");
const administratorIdRol = Number(process.env.ADMINISTRATOR_ID_ROL);
const managerIdRol = Number(process.env.MANAGER_ID_ROL);
const sellerIdRol = Number(process.env.SELLER_ID_ROL);

const routes = (app) => {
  app.use(
    mainRoute + "/catalogo",
    midAuth.isAuth,
    midAuth.hasRole([administratorIdRol, managerIdRol]),
    catalog
  );
  app.use(
    mainRoute + "/clientes",
    midAuth.isAuth,
    midAuth.hasRole([administratorIdRol, managerIdRol, sellerIdRol]),
    clientes
  );
  app.use(
    mainRoute + "/elementos",
    midAuth.isAuth,
    midAuth.hasRole([administratorIdRol, managerIdRol]),
    elementos
  );
  app.use(
    mainRoute + "/function",
    midAuth.isAuth,
    midAuth.hasRole([administratorIdRol, managerIdRol]),
    functions
  );
  app.use(
    mainRoute + "/rent",
    midAuth.isAuth,
    midAuth.hasRole([administratorIdRol, managerIdRol, sellerIdRol]),
    registerRent
  );
  app.use(
    mainRoute + "/vehiculos",
    midAuth.isAuth,
    midAuth.hasRole([administratorIdRol, managerIdRol]),
    vehicles
  );
  app.use(
    mainRoute + "/roles",
    midAuth.isAuth,
    midAuth.hasRole([administratorIdRol, managerIdRol]),
    roles
  );
  app.use(mainRoute + "/users", users);
};

module.exports = routes;
