const express = require('express');
const routes = express.Router();
var config = require('../startup/config')
const dataCenter = require('../data/data-center')

routes.get(`${config.endpoints.default}`, async (req, res, next) => {
    const getAllData = await dataCenter.getAllData();
    res.status(getAllData.statusCode)
        .json(getAllData);
});
routes.get(`${config.endpoints.all}`, async (req, res) => {
    const getAllData = await dataCenter.getAllData();

    res.status(getAllData.statusCode)
        .json(getAllData);

})
routes.post(`${config.endpoints.add}`, async (req, res) => {

    var formData = req.body || {};
    var dt = await dataCenter.insertData(formData)
    res.status(dt.statusCode)
        .json(dt);

})
routes.get(`${config.endpoints.search}/:searchId`, async (req, res) => {
    var id = req.params.searchId || '';
    console.log(`search Me:${id}`);

    var dt = await dataCenter.searchProduct(id)
    res.status(dt.statusCode)
        .json(dt);



});

routes.delete(`${config.endpoints.delete}/:productId`, async (req, res) => {
    var id = req.params.productId || '';

    var dt = await dataCenter.deleteData(id)
    res.status(dt.statusCode)
        .json(dt);



})
routes.put(`${config.endpoints.update}/:productId`, async (req, res) => {
    var id = req.params.productId || '';
    var formData = req.body || {};

    console.log(`${id} ${formData.name}`);
    var updateData = await dataCenter.updateData(id, formData);
    res.status(updateData.statusCode)
        .json(updateData)

})

// deleteData
// routes.get('/add', async (req, res) => {


// })
module.exports = routes;