const User = require("../models").User;
const moment = require("moment");

module.exports = {
    register: (req, res, next) => {
        const now = moment().format();
        const {userName, grade, studentID, LineHashID} = req.body;
        const hashID = LineHashID[0];
        User.create({
            hashID,
            name: userName,
            academic: grade,
            studentID,
            createdAt: now,
            updatedAt: now
        })
        .catch(err => {
            console.error("something wrong with user create");
            console.error(err)
        })
        res.render("completeRegister");
    }
}