const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        const [existing] = await pool.query(
            "SELECT id FROM users WHERE username = ?",
            [username]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            `INSERT INTO users (username, password)
             VALUES (?, ?)`,
            [username, hashedPassword]
        );

        res.status(201).json({
            message: "User registered successfully",
            userId: result.insertId
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            message: err.message
        });
    }
};

exports.login = async (req, res) => {

    const { username, password } = req.body;

    const [rows] = await pool.query(
        "SELECT * FROM users WHERE username=?",
        [username]
    );

    if (!rows.length)
        return res.status(400).json({
            message: "Invalid Credentials"
        });

    const user = rows[0];

    const valid = await bcrypt.compare(
        password,
        user.password
    );

    if (!valid)
        return res.status(400).json({
            message: "Invalid Credentials"
        });

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token });
};