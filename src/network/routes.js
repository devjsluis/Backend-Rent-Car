const catalog = require("../components/catalogs/network");
const clientes = require("../components/clients/network");
const elementos = require("../components/elementsCatalogs/network");
const functions = require("../components/functions/network");
const registerRent = require("../components/registerRent/network");
const vehicles = require("../components/vehicles/network");
const roles = require("../components/roles/network");
const users = require("../components/users/network");
const mainRoute = process.env.MAIN_ROUTE + process.env.API_VERSION;

const routes = (app) => {
  app.use(mainRoute + "/catalogo", catalog);
  app.use(mainRoute + "/clientes", clientes);
  app.use(mainRoute + "/elementos", elementos);
  app.use(mainRoute + "/function", functions);
  app.use(mainRoute + "/rent", registerRent);
  app.use(mainRoute + "/vehiculos", vehicles);
  app.use(mainRoute + "/roles", roles);
  app.use(mainRoute + "/users", users);
};

module.exports = routes;
