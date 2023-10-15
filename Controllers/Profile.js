const User = require("../Models/User");
const Profile = require("../Models/Profile");
const News = require("../Models/News")
const Comment = require("../Models/Comment");
const {uploadToCloudimary} = require("../Utils/imageUpload");
require("dotenv").config();

exports.editProfile = async(req, res) => {
    try {
        const {gender, about, dateOfBirth} = req.body;
        const userId = req.user.id;

        // Fetch user
        const user = await User.findById(userId);

        // if no user found
        if(!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User Not Found"
                }
            );
        }

        // fetch profile id of the user
        const profileId = user.profileInformation;

        // Fetch profie of the user
        const profile = await Profile.findById(profileId);

        // if no profile found
        if(!profile) {
            return res.status(404).json(
                {
                    success: false, 
                    message: "Profile Not Found"
                }
            );
        }

        if(gender) {
            profile.gender = gender;
        }
        if(about) {
            profile.about = about;
        }
        if(dateOfBirth) {
            profile.dateOfBirth = dateOfBirth;
        }

        // save the updated details in the DB
        await profile.save();

        const updatedUser = await User.findById(userId).populate("profileInformation");

        // Send a json response
        res.status(200).json(
            {
                success: true, 
                message: "User Details Updated", 
                userDetails: updatedUser,
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send a json reponse
        res.status(500).json(
            {
                success: false, 
                message: "Internal Server error"
            }
        );
    }
}

exports.deleteAccount = async(req, res) => {
    try {
        const userId = req.user.id;

        // Fetch user
        const user = await User.findById(userId);

        // Check if user found
        if(!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User Not Found"
                }
            );
        }

        // Delete the profile related to the user
        const profile = await Profile.findByIdAndDelete(user.profileInformation);

        // Fetch the news related to the user
        const news = user.news;

        // Traverse over the news array
        for(let i=0;i<news.length;i++)
        {
            const newsDetails = await News.findById(news[i]);
            const comment = newsDetails.comment;
            for(let j=0;j<comment.length;j++)
            {
                // Fetch the comment related to the news and delete it
                const commentDetails = await Comment.findByIdAndDelete(comment[i]);
            }
            // Delet the news related to the user
            await News.findByIdAndDelete(news[i]);
        }

        // Delete the user
        await User.findByIdAndDelete(userId);

        res.status(200).json(
            {
                success: false, 
                message: "User Deleted Successfully"
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

exports.getAllUserDetails = async(req, res) => {
    try {
        const userId= req.user.id;

        // fetch user Details
        const user = await User.findById(userId).populate("profileInformation").populate(
            {
                path: "news",
                populate: {
                    path: "comment",
                }
            }
        );

        // if userNot found
        if(!user) {
            return res.status(404).json(
                {
                    success: false,
                    message: "User Not Found"
                }
            );
        }

        return res.status(200).json(
            {
                success: true,
                message: "User Details fetched",
                userDetails: user
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

exports.updateDisplayPicture = async(req, res) => {
    try {
        const userId = req.user.id;
        const displayPicture = req.files.displayPicture;

        // Vslidate data
        if(!displayPicture) {
            return res.status(400).json(
                {
                    success: false, 
                    message: "All Fields Required"
                }
            );
        }

        const image = await uploadToCloudimary(displayPicture, process.env.FOLDER_NAME, 1000, 1000);

        console.log("New Picture: ", image);

        // Update the user display picture
        const updatedUser = await User.findByIdAndUpdate(
            {
                _id: userId,
            },
            {
                image: image.secure_url,
            },
            {
                new: true,
            }
        )

        // Send json reponse
        res.status(200).json(
            {
                success: true, 
                message: "Image updated successfully"
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send a json reponse
        res.status(500).json(
            {
                success: false,
                message: "Internal Server Error"
            }
        );
    }
}

exports.reporterDashboard = async(req, res) => {
    try {
        const userId = req.user.id;

        // console.log(userId);

        // Fetch all the news related to the user
        const news = await News.find({reporter: userId}).populate("comment");

        // Validate news
        if(!news) {
            return res.status(404).json(
                {
                    success: false,
                    message: "Reporter not found"
                }
            );
        }

        // send json response
        res.status(200).json(
            {
                success: true,
                message: "all details fatched",
                news: news
            }
        );
    }
    catch(err) {
        console.error(err);
        console.log(err.message);

        // Send a json reponse
        res.status(500).json(
            {
                success: false, 
                message: "Internal Server Error"
            }
        );
    }
}

