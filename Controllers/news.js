const User = require("../Models/User");
const News = require("../Models/News");
const Comment = require("../Models/Comment");
const {uploadToCloudimary} = require("../Utils/imageUpload");
const Category = require("../Models/Category");
require("dotenv").config();

exports.createNews = async(req, res) => {
    try {
        const {title, content, category, status} = req.body;
        const thumbnail = req.files.thumbailImage;

        const userId = req.user.id;

        console.log(title);
        console.log(content);
        console.log(category);
        console.log(thumbnail);

        // validate data
        if(!title || !content || !category || !thumbnail) {
            return res.status(400).json(
                {
                    success: false, 
                    message: "All Fields Required"
                }
            );
        }

        if(!status) {
            status = "Draft";
        }

        const image = await uploadToCloudimary(thumbnail, process.env.FOLDER_NAME);

        // validate image
        if(!image) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Upload to cloudinary failed",
                }
            );
        }
        
        console.log("Thumbanil uploaded: ", image);

        const news = await News.create(
            {
                title: title,
                content: content,
                reporter: req.user.id,
                category: category,
                status: status,
                thumbnail: image.secure_url,
            }
        );

        if(!news) {
            return res.status(400).json(
                {
                    success: false,
                    message: "News Create Failed"
                }
            );
        }

        const updatedUser = await User.findByIdAndUpdate(
            {
                _id: userId,
            },
            {
                $push: {
                    news: news._id,
                }
            },
            {
                new: true,
            }
        );

        const updatedCategory = await Category.findByIdAndUpdate(
            {
                _id: category,
            },
            {
                $push: {
                    news: news_id,
                }
            },
            {
                new: true,
            }
        );

        res.status(200).json(
            {
                success: true,
                message: "News Created Successfully",
                data: news
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send json response
        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error"
            }
        );
    }
}

exports.deleteNews = async(req, res) => {
    try {
        const {newsId} = req.body;
        const userId = req.user.id;

        if(!newsId) {
            return res.status(400).json(
                {
                    success: false, 
                    message: "All Fields Required"
                }
            );
        }

        // Updating the user by removing the news from the user
        const updatedUser = await User.findByIdAndUpdate(
            {
                _id: userId,
            },
            {
                $pull: {
                    news: newsId,
                }
            },
            {
                new: true,
            }
        );

        if(!updatedUser) {
            return res.status(404).json(
                {
                    success: false, 
                    message: "User Not Found"
                }
            );
        }

        // Delete all the comments from the particular news
        const news = await News.findById(newsId);

        if(!news) {
            return res.status(404).json(
                {
                    success: false,
                    message: "News Not Found"
                }
            );
        }
        

        const updatedCategory = await Category.findByIdAndUpdate(
            {
                _id: news.category,
            },
            {
                $pull: {
                    news: news._id,
                }
            },
            {
                new: true,
            }
        );

        const comments = news.comment;
        for(let i=0;i<comments.length;i++)
        {
            const commentDetails = await Comment.findByIdAndDelete(comments[i]);
        }

        // Delete news
        await News.findByIdAndDelete(newsId);

        return res.status(200).json(
            {
                success: true,
                message: "News Deleted Successfully",
                updatedUser: updatedUser,
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send json response
        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error"
            }
        );
    }
}

exports.editNews = async(req, res) => {
    try {
        const {title, content, status, newsId} = req.body;

        if(!newsId) {
            return res.status(400).json(
                {
                    success: flase, 
                    message: "All Fields Required"
                }
            );
        }
        
        const news = await News.findById(newsId);

        if(!news) {
            res.status(404).json(
                {
                    success: false, 
                    message: "News Not Found"
                }
            );
        }

        if(title) {
            news.title = title;
        }

        if(content) {
            news.content = content;
        }

        if(status) {
            news.status = status;
        }

        if(req.files && req.files.thumbailImage) {
            const image = await uploadToCloudimary(req.files.thumbailImage, process.env.FOLDER_NAME);

            if(!image) {
                res.status(400).json(
                    {
                        success: false, 
                        message: "Upload to Cloudinary Failed"
                    }
                );
            }

            news.thumbnail = image.secure_url;
        }

        await news.save();

        res.status(200).json(
            {
                success: true,
                message: "News Edited Successfully",
                updatedNews: news
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

exports.getFullNewsDetails = async(req, res) => {
    try {
        const {newsId} = req.body;

        if(!newsId) { 
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required"
                }
            );
        }

        const newsDetails = await News.findById(newsId).populate(
            {
                path: "reporter",
                populate: {
                    path: "news"
                },
                populate: {
                    path: "profileInformation"
                }
            }
        ).populate("comment");

        if(!newsDetails) {
            return res.status(404).json(
                {
                    success: false,
                    message: "News not found",
                }
            );
        }

        return res.status(200).json(
            {
                success: true,
                message: "News Details Found Successfully",
                data: newsDetails,
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send Json Reponse
        res.status(500).json(
            {
                success: false, 
                message: "Internal Server Error"
            }
        );
    }
}

exports.reportersNewsDetails = async(req, res) => {
    try {
        const userId = req.user.id;

        const newsDetails = await News.find(
            {
                reporter: userId
            }
        ).sort({createdAt: -1}).populate("comment");

        return res.status(200).json(
            {
                success: true,
                data: newsDetails,
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
                message: "Internal Server Error",
            }
        );
    }
}

exports.getAllNews = async(req, res) => {
    try {
        const allNews = await News.find(
            {
                status: "Published"
            },
            {
                title: true,
                content: true,
                reporter: true,
                category: true,
                thumbnail: true,
            }
        ).populate("comment").populate(
            {
                path: "reporter", 
                populate: {
                    path: "profileInformation"
                }
            }
        );

        return res.status(200).json(
            {
                success: true, 
                message: "All News Fetched",
                data: allNews
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
                message: "Internal Server Error"
            }
        );
    }
}