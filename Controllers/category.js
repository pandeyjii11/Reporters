const Category = require("../Models/Category");

exports.createCategory = async(req, res) => {
    try {
        // Fetch Data
        const {name} = req.body;

        // Validate data
        if(!name) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fiels Required"
                }
            );
        }

        // Create the category
        const category = await Category.create(
            {
                name: name,
            }
        );

        // Send json response
        res.status(200).json(
            {
                success: true,
                message: "Category Created Successful"
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send json reponse
        res.status(500).json(
            {
                success: false, 
                message: "Interna Server Error"
            }
        );
    }
}

exports.getAllCategories = async(req, res) => {
    try {
        const allCategories = await Category.find({});

        // Send json response
        res.status(200).json(
            {
                success: true,
                message: "All Categories fetched",
                data: allCategories
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send a json response
        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error"
            }
        );
    }
}

exports.categoryPageDetails = async(req, res) => {
    try {
        const {categoryId} = req.body;

        // Fetch Category from DB
        const selectedCategory = await Category.findById(categoryId).populate(
            {
                path: "news",
                populate: {
                    path: "reporter"
                }
            }
        );

        // Validate the data fetched
        if(!selectedCategory) {
            return res.status(404).json(
                {
                    success: false,
                    message: "No News found for the selected found"
                }
            );
        }

        // Fetch different category data
        const differentCategory = await Category.find({
            _id: {$ne: categoryId}
        }).populate(
            {
                path: "news",
                populate: {
                    path: "reporter"
                }
            }
        );

        // send json reponse
        res.status(200).json(
            {
                success: true,
                Date: {
                    selectedCategory:  selectedCategory,
                    differentCategory: differentCategory,
                }
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send a json response
        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error"
            }
        );
    }
}