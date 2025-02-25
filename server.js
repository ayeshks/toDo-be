const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const taskRoutes = require("./src/routes/taskRoutes"); // Import routes

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use /api prefix for all routes defined in taskRoutes
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
