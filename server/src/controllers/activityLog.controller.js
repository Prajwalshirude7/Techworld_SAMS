const connection = require("../config/database");


// =====================================================
// GET ACTIVITY LOGS
// =====================================================

exports.getActivityLogs = (req, res) => {

    const sql = `
        SELECT
            al.id,
            al.user_id,
            u.name AS user_name,
            al.action,
            al.module,
            al.ip_address,
            al.created_at
        FROM activity_logs al
        LEFT JOIN users u
            ON al.user_id = u.id
        ORDER BY al.created_at DESC
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
// GET LOG BY ID
// =====================================================

exports.getActivityLogById = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT
            al.id,
            al.user_id,
            u.name AS user_name,
            al.action,
            al.module,
            al.ip_address,
            al.created_at
        FROM activity_logs al
        LEFT JOIN users u
            ON al.user_id = u.id
        WHERE al.id = ?
    `;

    connection.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Activity log not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: result[0]
        });
    });
};