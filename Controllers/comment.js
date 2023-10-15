const Comment = require("../Models/Comment");
const User = require("../Models/User");
const News = require("../Models/News");

exports.createComment = async(req, res) => {
    try {
        const {newsId, commentText} = req.body;
        const userId = req.user.id;

        // validate data
        if(!newsId || !commentText || !userId) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required"
                }
            );
        }

        const user = await User.findById(userId);

        // User Validation
        if(!user) {
            return res.status(404).json(
                {
                    success: false, 
                    message: "User Not Found",
                }
            );
        }

        // Create the comment
        const comment = await Comment.create({
            user: userId,
            news: newsId,
            commentText: commentText,
        });

        // Insert the comment into the news comment array
        const updatedNews = await News.findByIdAndUpdate(
            {
                _id: newsId,
            },
            {
                $push: {
                    comment: comment._id,
                }
            },
            {
                new: true
            }
        );

        console.log("Updates news after comment addition: ", updatedNews);

        // Send a json response
        res.status(200).json(
            {
                success: true, 
                message: "Comment Created Successful",
                updatedNews: updatedNews
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
                message: "Internal Sever error"
            }
        );
    }
}

exports.editComment = async(req, res) => {
    try {
        const {commentText, commentId} = req.body;
        
        // Validate the data
        if(!commentText || !commentId) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required"
                }
            );
        }

        const comment = await Comment.findById(commentId);

        // validate comment
        if(!comment) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Comment Not Found"
                }
            );
        }

        comment.commentText = commentText;

        await comment.save();

        // send Json Response
        res.status(200).json(
            {
                success: true,
                message: "Comment Edited Successfully",
                comment: comment
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

exports.deleteComment = async(req, res) => {
    try {
        const {commentId} = req.body;

        // Validate Data
        if(!commentId) {
            return res.status(400).json(
                {
                    success: false,
                    message: "All Fields Required"
                }
            );
        }

        const comment = await Comment.findById(commentId);

        if(!comment) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Comment Not Found"
                }
            );
        }

        const newsId = comment.news;

        // Delet the comment from the news
        const news = await News.findByIdAndUpdate(
            {
                _id: newsId,
            },
            {
                $pull: {
                    comment: comment._id,
                }
            },
            {
                new: true
            }
        );

        if(!news) {
            return res.status(404).json(
                {
                    success: false,
                    message: "News Not Found"
                }
            );
        }

        // Delete comment
        await Comment.findByIdAndDelete(commentId);

        res.status(200).json(
            {
                success: true,
                message: "Comment Deleted Successfully",
                upadatedNews: news,
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