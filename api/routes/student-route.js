const express = require("express");
const controller = require('../controllers/student-controller');
const router = express.Router();

router.route('/students')
            .get(controller.getAll)
            .post(controller.addOne);

router.route('/students/:studId')
            .get(controller.getOne)
            .put(controller.updateOne)
            .delete(controller.deleteOne);

module.exports = router;