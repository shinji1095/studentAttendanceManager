const moment = require("moment");
const Attendance = require("../models").Attendance;
const GASController = require("./GASController");
const User = require("../models").User;

module.exports = {
    attend: async (req, res, next) => {
        const {hashID, roomID, leave} = req.body;
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
                    userID,
                    leave
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
    
            const attendances = await Attendance.findAll({
                where: {
                    userID,
                    [Op.and]:{
                        createdAt:{
                            [Op.gte]: moment().startOf()
                        },
                        createdAt:{
                            [Op.lte]: moment().endOf()
                        }
                    }
                }
            });
            console.log("-----------------start of ", moment().startOf());
            console.log("-------------------end of ", moment().endOf());
            console.log("--------------------------------attendance----------------------------/n", attendances)
            const now = moment().format();
            attendances.map(attendance => {
                attendance.leave = now;
                attendance.riskForLunch = riskForLunch;
                attendance.riskForDinner = riskForDinner;
                attendance.save();

            })
            
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
            res.render("registerYet");
        }
    }
}