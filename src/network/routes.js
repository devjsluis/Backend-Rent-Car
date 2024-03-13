const catalog = require('../components/catalogs/network');
const mainRoute = process.env.MAIN_ROUTE + process.env.API_VERSION;

const routes = (app) => {
    app.use(mainRoute + '/catalogo', catalog);
};

module.exports = routes;