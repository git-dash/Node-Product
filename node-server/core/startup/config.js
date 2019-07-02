var configExport = {

    response: {
        statusCode: {
            OK: 200,
            BAD_REQUEST: 400,
        },
        status: {
            success: `Success`,
            failure: `Failure`
        },
        messages: {
            ADD_PRODUCT_OK: `Product data added successfully`,
            ADD_PRODUCT_BAD_REQUEST: `Input data mismatch`,
            ADD_PRODUCT_ALREADY_EXISTS: `Same product already exists `,
            GET_ALL_PRODUCT_OK: `All product data`,
            GET_ALL_PRODUCT_BAD_REQUEST: `No record found`,
            SEARCH_OK: `Product data found`,
            SEARCH_BAD_QUERST: `The product doesn’t exist`,
            DELETE_OK: `Product data removed successfully`,
            UPDATE_OK: `Product data updated successfully`

        },

    },
    endpoints: {
        default: '/',
        all: '/all',
        add: '/add',
        search: '/search',
        delete: '/delete',
        update: '/update',
    }

}

module.exports = configExport