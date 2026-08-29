const connection = require("../config/database");

// =====================================================
// GET ALL SETTINGS
// =====================================================

exports.getSettings = (req, res) => {

    const sql = `
        SELECT
            id,
            setting_key,
            setting_value,
            updated_by,
            updated_at
        FROM settings
        ORDER BY id ASC
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
// GET SETTING BY KEY
// =====================================================

exports.getSetting = (req, res) => {

    const { key } = req.params;

    const sql = `
        SELECT
            id,
            setting_key,
            setting_value,
            updated_by,
            updated_at
        FROM settings
        WHERE setting_key = ?
    `;

    connection.query(sql, [key], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Setting not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: result[0]
        });
    });
};


// =====================================================
// CREATE SETTING
// =====================================================

exports.createSetting = (req, res) => {

    const {
        setting_key,
        setting_value
    } = req.body;

    if (!setting_key) {
        return res.status(400).json({
            success: false,
            message: "setting_key is required"
        });
    }

    const sql = `
        INSERT INTO settings
        (
            setting_key,
            setting_value,
            updated_by
        )
        VALUES (?, ?, ?)
    `;

    connection.query(
        sql,
        [
            setting_key,
            setting_value || null,
            req.user.id
        ],
        (err, result) => {

            if (err) {

                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({
                        success: false,
                        message: "Setting already exists"
                    });
                }

                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            return res.status(201).json({
                success: true,
                message: "Setting created successfully",
                setting_id: result.insertId
            });
        }
    );
};


// =====================================================
// UPDATE SETTING
// =====================================================

exports.updateSetting = (req, res) => {

    const { key } = req.params;
    const { setting_value } = req.body;

    if (setting_value === undefined) {
        return res.status(400).json({
            success: false,
            message: "setting_value is required"
        });
    }

    const sql = `
        UPDATE settings
        SET
            setting_value = ?,
            updated_by = ?
        WHERE setting_key = ?
    `;

    connection.query(
        sql,
        [
            setting_value,
            req.user.id,
            key
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Setting not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Setting updated successfully"
            });
        }
    );
};