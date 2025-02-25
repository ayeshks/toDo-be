const pool = require("../../db"); 

exports.createTask = async (req, res) => {
    try {
        const { title, description, importflag } = req.body;

        const newTask = await pool.query(
            "INSERT INTO task (title, description, importflag) VALUES ($1, $2, $3) RETURNING *",
            [title, description, importflag]
        );
        res.json(newTask.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await pool.query("SELECT * FROM task"); 
        res.json(tasks.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

exports.getVisibleTasks = async (req, res) => {
    try {
        // Query to fetch tasks with importflag = 0
        const tasks = await pool.query("SELECT * FROM task WHERE importflag = 0");

        // Send the filtered tasks as the response
        res.json(tasks.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

exports.putInvisible = async (req, res) => {
    const { id } = req.params;  

    if (!id) {
        return res.status(400).send("Task ID is required");
    }

    try {
        const result = await pool.query(
            "UPDATE task SET importflag = $1 WHERE id = $2 RETURNING *",
            [1, id]  
        );

        if (result.rows.length === 0) {
            return res.status(404).send("Task not found");
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

