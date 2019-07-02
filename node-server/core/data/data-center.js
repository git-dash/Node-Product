
var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const config = require('../startup/config');
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://yorbit-node.firebaseio.com/"
});

var db = firebase.database();
var ref = db.ref("product");

var dataCenter = {

    getAllData: async function () {
        var getDataFromServer = await ref.once('value');
        var productList = getDataFromServer.val();

        const response = Object.assign({}, productList);

        if (Object.keys(productList).length !== 0) {
            return {
                statusCode: config.response.statusCode.OK,
                status: config.response.status.success,
                message: config.response.messages.GET_ALL_PRODUCT_OK,
                data: [response]
            }

        } else {
            return {
                statusCode: config.response.statusCode.BAD_REQUEST,
                status: config.response.status.failure,
                message: config.response.messages.GET_ALL_PRODUCT_BAD_REQUEST,
                data: []
            }

        }
        //return response;

    },
    insertData: async function (sample) {

        if (!this.IsvalidateData(sample)) {
            return {
                statusCode: config.response.statusCode.BAD_REQUEST,
                status: config.response.status.failure,
                message: `${config.response.messages.ADD_PRODUCT_BAD_REQUEST}`,
                data: []

            };
        }
        var isExist = await this.searchProductByProductId(sample.productId);
        if (Object.keys(isExist).length !== 0) {
            return {
                statusCode: config.response.statusCode.BAD_REQUEST,
                status: config.response.status.failure,
                message: `${config.response.messages.ADD_PRODUCT_ALREADY_EXISTS}`,
                data: []

            };
        }

        //all ok
        var newData = sample;
        var newPostKey = ref.push().key;
        newData.id = newPostKey;



        var resp = await db.ref(`product/${newPostKey}`).set(newData);
        uri = `/product/${newPostKey}`;
        // var recordAdded = await ref.child(newPostKey).once('value');
        // var t = recordAdded.val();
        console.log(`after push id: ${newPostKey} `);
        var insertedData = await this.searchProductByProductId(newData.productId);

        return {
            statusCode: config.response.statusCode.OK,
            status: config.response.status.success,
            message: `${config.response.messages.GET_ALL_PRODUCT_OK}`,
            data: [insertedData]
        };

    },
    searchProduct: async function (id) {

        var search = await this.searchProductByProductId(id);

        if (Object.keys(search).length !== 0) {
            return {

                statusCode: config.response.statusCode.OK,
                status: config.response.status.success,
                message: `${config.response.messages.SEARCH_OK}`,
                data: [search]
            }
        }
        else {
            return {
                statusCode: config.response.statusCode.BAD_REQUEST,
                status: config.response.status.failure,
                message: `${config.response.messages.SEARCH_BAD_QUERST}`,
                data: []
            }
        }

    },
    deleteData: async function (id) {

        var search = await this.searchProductByProductId(id);

        var deleteId = '';
        Object.keys(search)
            .map(x => {
                console.log(x)
                deleteId = x;
            });

        if (Object.keys(search).length !== 0 && deleteId != '') {

            var dt = await db.ref(`product/${deleteId}`).remove();


            return {

                statusCode: config.response.statusCode.OK,
                status: config.response.status.success,
                message: `${config.response.messages.DELETE_OK}`,
                data: [search]
            }
        }
        else {
            return {
                statusCode: config.response.statusCode.BAD_REQUEST,
                status: config.response.status.failure,
                message: `${config.response.messages.SEARCH_BAD_QUERST}`,
                data: []
            }
        }
    },

    updateData: async function (id, newData) {

        var search = await this.searchProductByProductId(id);
        var searchedId = '';
        Object.keys(search)
            .map(x => {
                searchedId = x;
            });
        if (Object.keys(search).length !== 0) {
            newData.productId = Number.parseInt(id);
            newData.id = searchedId;

            var response = await db.ref(`product/${searchedId}`).update(newData);
            var updatedRecord = await this.searchProductByProductId(id)
            // ref.set()
            return {
                statusCode: config.response.statusCode.OK,
                status: config.response.status.success,
                message: `${config.response.messages.UPDATE_OK}`,
                data: [updatedRecord]
            };
        } else {
            return {
                statusCode: config.response.statusCode.BAD_REQUEST,
                status: config.response.status.failure,
                message: `${config.response.messages.SEARCH_BAD_QUERST}`,
                data: []
            }
        }
    },


    searchProductByProductId: async function (id) {

        var response = {};
        id = Number.parseInt(id) || '';
        if (id !== '') {

            var uri = `/product`;
            console.log(`search for${id}`);

            var searchProduct = await

                db.ref(`${uri}`).orderByChild('productId')
                    .equalTo(id)
                    .once('value')
                ;
            // .once('value');
            var element = searchProduct.val();
            console.log(`element found: ${JSON.stringify(element)}`);
            response = Object.assign({}, element);

            return response;
        } else {
            return response;
        }
    },
    IsvalidateData: function (data) {

        if (!isNaN(Number.parseInt(data.productId)))
            return true;
        else
            return false;
    }

}
module.exports = dataCenter;