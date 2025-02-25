const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController"); 


router.post("/createTask", taskController.createTask); 

router.get("/getAll", taskController.getAllTasks);

router.get("/visibleTask", taskController.getVisibleTasks);

router.put("/invisibleTask/:id", taskController.putInvisible);

module.exports = router;
