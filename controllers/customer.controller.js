const httpStatus = require('http-status');
const Customer = require('../models/customers');

const customerController = {};

customerController.getAllCustomer = async (req, res) => {
    try {
        let filterParams = {
            page:1,
            size:10,
            sortQuery:{},
            searchQuery: {}
        }
        
        if(req.params.page){
            filterParams={...filterParams, page: req.params.page}
        }
        if(req.params.size){
            filterParams={...filterParams, size: req.params.size}
        }
        // if(req.params.sortQuery){
        //     filterParams={...filterParams, sortQuery: req.params.sortQuery}
        // }
        // if(req.params.searchQuery){
        //     filterParams={...filterParams, page: req.params.searchQuery}
        // }

        const customer = await Customer.query().where({}).orderBy("id", "ASC")

        return res.status(httpStatus.OK).json({
            success: true,
            message: "All Customers",
            data: customer
        })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to retrive customers",
        })
    }
}

customerController.updateCustomer = async (req, res) => {
    try {
        const updateData = req.body
        const result = await Customer.query().findById(req.params.id).update(updateData)

        if(!result){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to update customers"
            })
        }

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Information Updated",
            data: updateData
        })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to update customers",
        })
    }
}

customerController.deleteCustomer = async (req, res) => {
    try {
        const result = await Customer.query().deleteById(req.params.id)
        
        if(!result){
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to delete customers"
            })
        }

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Customer deleted",
        })

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to delete customers",
        })
    }
}

module.exports = customerController;