const catalog = require('../components/catalogs/network');

const routes = (app) => {
    app.use('/catalogo', catalog);
};

module.exports = routes;