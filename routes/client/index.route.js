const taskRoute = require("./task.route");
const userRoute=require('./user.route')
const auth=require('../../middlewares/client/auth.middleware')

module.exports = (app) => {
  app.use("/tasks",auth.requireAuth, taskRoute);
  app.use('/users',userRoute)
}

