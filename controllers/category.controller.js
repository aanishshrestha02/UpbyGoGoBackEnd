const httpStatus = require('http-status');
const Category = require('../models/categories');

const categoryController = {};

// categoryController.getAllCategories = async (req, res) => {
//     try {
//         const categories = await Category.query().where({})

//         return res.status(httpStatus.OK).json({
//             succuss: true,
//             message: "All Categories",
//             data: categories
//         })
//     } catch (error) {
//         return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
//             success: false,
//             message: "Failed to retrive categories",
//         })
//     }
// }

categoryController.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.query().withGraphFetched({'parentCategory':true})

        return res.status(httpStatus.OK).json({
            succuss: true,
            message: "All Categories",
            data: categories
        })
    } catch (error) {
        console.log("error", error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to retrive categories",
        })
    }
}

categoryController.addCategory = async(req, res) => {
    try {
        const result = await Category.query().insert(req.body)

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Add Category success",
            data: result
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to add categories",
        })
    }
}

categoryController.updateCategory = async(req, res) => {
    try {
        const result = await Category.query().findById(req.params.id).patch(req.body)

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Update Category success",
        })
    } catch (error) {
        console.log("error", error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to update category",
        })
    }
}

categoryController.deleteCategory = async(req, res) => {
    try {
        const result = await Category.query().deleteById(req.params.id)

        return res.status(httpStatus.OK).json({
            success: true,
            message: "Delete Category success",
            data: result
        })
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Failed to delete category",
        })
    }
}

module.exports = categoryController