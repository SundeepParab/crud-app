const pool = require("../config/db");

exports.createUser = async (req, res) => {

    const {
        name,
        mobile,
        email,
        address
    } = req.body;

    await pool.query(
        `INSERT INTO usermaster
        (name,mobile,email,address)
        VALUES (?,?,?,?)`,
        [name, mobile, email, address]
    );

    res.json({
        message: "User Added"
    });
};

exports.getUsers = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const search = req.query.search || "";

    const offset = (page - 1) * limit;

    const [rows] = await pool.query(
        `
 SELECT *
 FROM usermaster
 WHERE name LIKE ?
 OR email LIKE ?
 ORDER BY id DESC
 LIMIT ? OFFSET ?
 `,
        [
            `%${search}%`,
            `%${search}%`,
            limit,
            offset
        ]);

    const [count] = await pool.query(
        `
 SELECT COUNT(*) total
 FROM usermaster
 WHERE name LIKE ?
 OR email LIKE ?
 `,
        [
            `%${search}%`,
            `%${search}%`
        ]);

    res.json({
        data: rows,
        total: count[0].total
    });
};

exports.getUserById = async (req, res) => {

    const [rows] = await pool.query(
        "SELECT * FROM usermaster WHERE id=?",
        [req.params.id]
    );

    res.json(rows[0]);
};

exports.updateUser = async (req, res) => {

    const {
        name,
        mobile,
        email,
        address
    } = req.body;

    await pool.query(
        `
 UPDATE usermaster
 SET name=?,
 mobile=?,
 email=?,
 address=?
 WHERE id=?
 `,
        [
            name,
            mobile,
            email,
            address,
            req.params.id
        ]);

    res.json({
        message: "Updated Successfully"
    });
};

exports.deleteUser = async (req, res) => {

    await pool.query(
        "DELETE FROM usermaster WHERE id=?",
        [req.params.id]
    );

    res.json({
        message: "Deleted Successfully"
    });
};