const moment = require("moment");
const Attendance = require("../models").Attendance;
const GASController = require("./GASController");
const User = require("../models").User;

module.exports = {
    attend: async (req, res, next) => {
        const {hashID, roomID} = req.body;
        const user = await User.findOne({
            where: {hashID},
            attributes: ["id"]
        })
        .catch(err => {
            console.log(err);
        })
        console.log(user)
        if(user !== null){
            const userID = user.dataValues.id;
            const attendance = await Attendance.findAndCountAll({
                where:{
                    leave: null,
                    userID
                }
            })
            
            if(attendance.count === 0){
                const now = moment().format();
                Attendance.create({
                    roomID,
                    arrival: now,
                    userID
                });
                res.render("attendDone");
            }else{
                res.render("leaveYet")
            }
        }else{
            console.log("regisYet")
            console.log(user)
            res.render("registerYet");
        }
        
    },
    leave: async (req, res, next) => {
        const {hashID, riskForLunch, riskForDinner} = req.body;
        const user = await User.findOne({
            where: {hashID},
        });
        if(user !== null){
            const userID = user.dataValues.id;
    
            const attendance = await Attendance.findAndCountAll({
                order: [
                    ["createdAt", "DESC"]
                ],
                where: {userID},
                leave: null
            });
            if(attendance.count == 1){
                //console.log("attendance: ", attendance);
                const now = moment().format();
                attendance.rows[0].leave = now;
                attendance.rows[0].riskForLunch = riskForLunch;
                attendance.rows[0].riskForDinner = riskForDinner;
                attendance.rows[0].save();
        
                console.log("user: ", user);
                const data = {
                    date: moment(now).format("MM-DD"),
                    arrival: moment(attendance.rows[0].arrival).format("HH:mm"),
                    leave: moment(now).format("HH:mm"),
                    academic: user.dataValues.academic,
                    studentID: user.dataValues.studentID,
                    userName: user.dataValues.name,
                    roomID: attendance.rows[0].roomID,
                    riskForLunch,
                    riskForDinner
                }
                
                // <Object> data
                GASController.post(data);
                
                res.render("completeRegister");
            }else{
                res.render("attendYet");
            }
        }else{
            res.render("registerYet");
        }
    }
}