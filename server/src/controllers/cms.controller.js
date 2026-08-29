const connection = require("../config/database");

// =====================================================
// GET ALL CMS SECTIONS
// =====================================================

exports.getSections = (req, res) => {

    const sql = `
        SELECT
            id,
            section,
            title,
            content,
            image,
            updated_by,
            updated_at
        FROM website_cms
        ORDER BY id DESC
    `;

    connection.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        return res.status(200).json({
            success: true,
            total: result.length,
            data: result
        });
    });
};


// =====================================================
// GET CMS SECTION BY SECTION NAME
// =====================================================

exports.getSection = (req, res) => {

    const { section } = req.params;

    const sql = `
        SELECT *
        FROM website_cms
        WHERE section = ?
    `;

    connection.query(sql, [section], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "CMS section not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: result[0]
        });
    });
};


// =====================================================
// CREATE CMS SECTION
// =====================================================

exports.createSection = (req, res) => {

    const {
        section,
        title,
        content,
        image
    } = req.body;

    if (!section) {
        return res.status(400).json({
            success: false,
            message: "Section is required"
        });
    }

    const sql = `
        INSERT INTO website_cms
        (
            section,
            title,
            content,
            image,
            updated_by
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        section,
        title || null,
        content || null,
        image || null,
        req.user.id
    ];

    connection.query(sql, values, (err, result) => {

        if (err) {

            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({
                    success: false,
                    message: "CMS section already exists"
                });
            }

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        return res.status(201).json({
            success: true,
            message: "CMS section created successfully",
            cms_id: result.insertId
        });
    });
};


// =====================================================
// UPDATE CMS SECTION
// =====================================================

exports.updateSection = (req, res) => {

    const { section } = req.params;

    const {
        title,
        content,
        image
    } = req.body;

    const sql = `
        UPDATE website_cms
        SET
            title = ?,
            content = ?,
            image = ?,
            updated_by = ?
        WHERE section = ?
    `;

    const values = [
        title || null,
        content || null,
        image || null,
        req.user.id,
        section
    ];

    connection.query(sql, values, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "CMS section not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "CMS section updated successfully"
        });
    });
};


// =====================================================
// DELETE CMS SECTION
// =====================================================

exports.deleteSection = (req, res) => {

    const { section } = req.params;

    const sql = `
        DELETE FROM website_cms
        WHERE section = ?
    `;

    connection.query(sql, [section], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "CMS section not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "CMS section deleted successfully"
        });
    });
};