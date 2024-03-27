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

const routes = (app) => {
  app.use(mainRoute + "/catalogo", midAuth.isAuth, catalog);
  app.use(mainRoute + "/clientes", midAuth.isAuth, clientes);
  app.use(mainRoute + "/elementos", midAuth.isAuth, elementos);
  app.use(mainRoute + "/function", midAuth.isAuth, functions);
  app.use(mainRoute + "/rent", midAuth.isAuth, registerRent);
  app.use(mainRoute + "/vehiculos", midAuth.isAuth, vehicles);
  app.use(mainRoute + "/roles", midAuth.isAuth, roles);
  app.use(mainRoute + "/users", users);
};

module.exports = routes;
