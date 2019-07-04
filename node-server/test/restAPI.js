
// Dependent Libraries

const
    chai = require('chai'), chaiHttp = require('chai-http'),
    expect = chai.expect;
chai.use(chaiHttp);

describe('Testing Node Rest API', function () {

    var server;
    before(function () {

        server = require('../core/startup/server');

    });
    after(function () {
        require('../core/startup/server').stop();
    });
    var applicationUrl = 'http://localhost:3000';
    var requester = chai.request.agent(applicationUrl);//to keep the same session; without requester agent the get or post will act as opening a new window


    it('should get all product details', async () => {
        var response = await requester
            .get('/');

        expect(response).to.have.status(200);
        expect(response.body.status).to.be.eq(`Success`)
    })


    it('should get add new  product details', async () => {

        var response = await requester
            .post('/add')
            .send({
                "productId": 922,
                "name": "testfrom post"
            });

        console.log(`${JSON.stringify(response.body)}`);
    })

    it(`should search for id:1`, async () => {
        var searchId = '1';
        var response = await requester
            .get(`/search/${searchId}`);

        expect(response).to.have.status(200);
        expect(response.body.status).to.be.eq(`Success`);
        expect(response.body.data.length).to.be.eq(1);


    })
    it(`should failed to search for invalid id`, async () => {
        var searchId = '2321';
        var response = await requester
            .get(`/search/${searchId}`);

        expect(response).to.have.status(400);
        expect(response.body.status).to.be.eq(`Failure`);
        expect(response.body.message).to.be.eq(`The product doesn’t exist`);
        expect(response.body.data.length).to.be.eq(0);


    })

    it(`should update product of 922 `, async () => {
        var searchId = '922';
        var item = "new test name from unit test";
        var response = await requester
            .put(`/update/${searchId}`)
            .send({
                "name": item
            });

        expect(response).to.have.status(200);
        expect(response.body.status).to.be.eq(`Success`);
        expect(response.body.message).to.be.eq(`Product data updated successfully`);
        expect(response.body.data.length).to.be.eq(1);
        // expect(response.body.data).includes(`new test name from unit test`);
        expect(response.text).to.contain(item);


    })

    it(`should delete product of id: 922 `, async () => {
        var searchId = '922';
        var item = "new test name from unit test";
        var response = await requester
            .delete(`/delete/${searchId}`);

        expect(response).to.have.status(200);
        expect(response.body.status).to.be.eq(`Success`);
        expect(response.body.message).to.be.eq(`Product data removed successfully`);
        expect(response.body.data.length).to.be.eq(1);
        // expect(response.body.data).includes(`new test name from unit test`);
        expect(response.text).to.contain(item);
    })

    it(`should fail to delete product of id: 23sa `, async () => {
        var searchId = '23sa';
        var item = "new test name from unit test";
        var response = await requester
            .delete(`/delete/${searchId}`);

        expect(response).to.have.status(400);
        expect(response.body.status).to.be.eq(`Failure`);
        expect(response.body.message).to.be.eq(`The product doesn’t exist`);
        expect(response.body.data.length).to.be.eq(0);

    })
});