const moment = require("moment");
const Attendance = require("../models").Attendance;
const GASController = require("./GASController");
const User = require("../models").User;
const {Op} = require("sequelize");

module.exports = {
    attend: async (req, res, next) => {
        let {hashID, roomID, arrival, leave} = req.body;
        const now = moment().format();
        (arrival == "now") ?arrival = now :arrival = moment(new Date().setHours(arrival)).format();
        (leave == "now") ?leave = now :leave = moment(new Date().setHours(leave)).format();

        const user = await User.findOne({
            where: {hashID},
        })
        .catch(err => {
            console.log(err);
        })
        console.log(user)
        console.log("-----------------start of ", moment().startOf("day").format());
        console.log("-------------------end of ", moment().endOf("day").format());
        if(user !== null){
            const userID = user.dataValues.id;
            const attendance = await Attendance.findAndCountAll({
                where:{
                    userID,
                    createdAt:{
                        [Op.gte]: moment().startOf("day").format()
                    }
                }
            })

            const {count, rows} = attendance;
            console.log("-------------attendance--------------",attendance)
            rows.map(d => console.log(d.dataValues.id))
            if(count == 0){
                Attendance.create({
                    roomID,
                    arrival,
                    leave,
                    userID
                });
    
                GASController.post({
                    date: moment(now).format("MM-DD"),
                    arrival: moment(arrival).format("HH:mm"),
                    leave: moment(leave).format("HH:mm"),
                    academic: user.dataValues.academic,
                    studentID: user.dataValues.studentID,
                    userName: user.dataValues.name,
                    roomID,
                    riskForLunch: null,
                    riskForDinner: null
                });
    
                res.render("attendDone");
            }else{
                res.render("leaveYet");
            }
            
            
        }else{
            console.log(user)
            res.render("registerYet");
        }

    },
    leave: async (req, res, next) => {
        let {hashID, riskForLunch, riskForDinner, leave} = req.body;
        const now = moment().format();
        (leave == "now")? leave = now: leave = moment(new Date().setHours(leave)).format();

        const user = await User.findOne({
            where: {hashID},
        });
        if(user !== null){
            const userID = user.dataValues.id;
    
            const attendances = await Attendance.findAndCountAll({
                where: {
                    userID,
                    createdAt:{
                        [Op.gte]: moment().startOf("day").format()
                    }
                }
            });
            console.log("-----------------start of ", moment().startOf("day"));
            console.log("-------------------end of ", moment().endOf("day"));
            console.log("--------------------------------attendance----------------------------/n", attendances)
            const {count, rows} = attendances;
            if(count == 1){
                rows.map(attendance => {
                    attendance.leave = leave;
                    attendance.riskForLunch = riskForLunch;
                    attendance.riskForDinner = riskForDinner;
                    attendance.save();
    
                    // <Object> data
                    GASController.post({
                        date: moment(now).format("MM-DD"),
                        arrival: moment(attendance.arrival).format("HH:mm"),
                        leave: moment(leave).format("HH:mm"),
                        academic: user.dataValues.academic,
                        studentID: user.dataValues.studentID,
                        userName: user.dataValues.name,
                        roomID: attendance.roomID,
                        riskForLunch,
                        riskForDinner
                    });
                })
                res.render("completeRegister");
            }else{
                res.render("attendYet")
            }
                        
        }else{
            res.render("registerYet");
        }
    }
}