const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST");
const USER = mongoose.model("user");

router.get("/user/:id", (req, res) => {
    USER.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            POST.find({ postedBy: req.params.id })
                .populate("postedBy", "_id")
                .then((posts) => {
                    res.status(200).json({ user, posts });
                })
                .catch((err) => {
                    res.status(422).json({ error: err });
                });
        })
        .catch(err => {
            return res.status(404).json({ error: "User not found" });
        });
})

router.put("/follow", requireLogin, async (req, res) => {
    try {
        const result = await USER.findByIdAndUpdate(
            req.body.followId,
            { $push: { followers: req.user._id } },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ error: "User to follow not found" });
        }
        await USER.findByIdAndUpdate(
            req.user._id,
            { $push: { following: req.body.followId } },
            { new: true }
        );

        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

router.put("/unfollow", requireLogin, async (req, res) => {
    try {
        const result = await USER.findByIdAndUpdate(
            req.body.followId,
            { $pull: { followers: req.user._id } },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ error: "User to unfollow not found" });
        }

        await USER.findByIdAndUpdate(
            req.user._id,
            { $pull: { following: req.body.followId } },
            { new: true }
        );

        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

router.put("/uploadProfilePic", requireLogin, (req, res) => {
    USER.findByIdAndUpdate(
        req.user._id,
        { $set: { Photo: req.body.pic } }, 
        { new: true }
    )
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            return res.status(422).json({ error: "Pic can't be uploaded: " + err.message });
        });
});



module.exports = router;