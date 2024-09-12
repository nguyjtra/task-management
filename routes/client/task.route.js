const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/task.controller");

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch('/change-status',controller.changeStatus)

router.post('/create',controller.create)

router.patch('/edit/:id',controller.edit)

router.patch('/delete',controller.delete)
module.exports = router;