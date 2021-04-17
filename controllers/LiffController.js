const moment = require("moment");
const Attendance = require("../models").Attendance;
const User = require("../models").User;
const {Op} = require("sequelize");

module.exports = {
    attend: (req, res, next) => {
        res.render("attend");
    },

    leave: (req, res, next) => {
        res.render("leave")
    },

    register: (req, res, next) => {
        res.render("register");
    },

    check: (req, res, next) => {
        const today = moment().startOf("day").format();
        const now = moment().format();
        Attendance.findAll({
            where:{
                [Op.and]:{
                    arrival: {
                        [Op.gte]:today
                    },
                    leave: {
                        [Op.lte]: now
                    }
                }
            },
            include:[
                {model: User}
            ]
        })
        .then(attendances => {
            const output = Object.values(attendances).map(attendance => {
                var userName = attendance.User.dataValues.name
                var roomID = attendance.roomID;
                return [
                    roomID, userName
                ]
            })
            res.render("check", {attendances: output});
        })
    },

    alterConfirm: (req, res, next) => {
        res.render("alter");
    },

    alter: async (req, res, next) => {
        const {h} = req.query;
        console.log(req.query);
        const user = await User.findOne({
            where: {
                hashID: h
            }
        })
        const userID = user.dataValues.id;
        Attendance.findAll({
            where:{
                userID
            }
        })
        
    }
}