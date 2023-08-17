const httpStatus = require('http-status');
const Item = require('../models/items');

const itemController = {};

itemController.getAllItems = async (req, res) => {
    try {
        const items = await Item.query().withGraphFetched({'category':true})

        return res.status(httpStatus.OK).json({
            succuss: true,
            message: "All Items",
            data: items
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to retrive categories",
        })
    }
}

itemController.addItem = async(req, res) => {
    try {
        const result = await Item.query().insert(req.body)

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Add Item success",
            data: result
        })
    } catch (error) {
        console.log("error", error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to add Item",
        })
    }
}

itemController.updateItem = async(req, res) => {
    try {
        const result = await Item.query().findById(req.params.id).patch(req.body)

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Update Item success",
            data: result
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to update category",
        })
    }
}

itemController.deleteItem = async(req, res) => {
    try {
        const result = await Item.query().deleteById(req.params.id)

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Delete Item success",
            data: result
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to delete category",
        })
    }
}

module.exports = itemController