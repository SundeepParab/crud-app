require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server Running');
});

app.use(
    "/api/auth",
    require("./routes/authRoutes")
);

app.use(
    "/api/users",
    require("./routes/userRoutes")
);

app.get('/test', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(
    process.env.PORT,
    () => console.log("Server Started")
);

const pool = require("./config/db");

(async () => {
    try {
        const conn = await pool.getConnection();
        console.log("MySQL Connected");
        conn.release();
    } catch (err) {
        console.error("DB Error:", err.message);
    }
})();