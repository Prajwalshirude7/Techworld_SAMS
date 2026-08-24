const connection = require("../config/database");
const bcrypt = require("bcrypt");

// =====================================================
// CREATE BRANCH ADMIN
// =====================================================

exports.createBranchAdmin = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      branch_id
    } = req.body;

    if (!name || !email || !phone || !password || !branch_id) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone, password and branch_id are required"
      });
    }

    // Check branch
    connection.query(
      "SELECT id FROM branches WHERE id = ? AND status = 'ACTIVE'",
      [branch_id],
      async (err, branchResult) => {

        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }

        if (branchResult.length === 0) {
          return res.status(404).json({
            success: false,
            message: "Branch not found or inactive"
          });
        }

        // Check email
        connection.query(
          "SELECT id FROM users WHERE email = ?",
          [email],
          async (err, existingUser) => {

            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message
              });
            }

            if (existingUser.length > 0) {
              return res.status(400).json({
                success: false,
                message: "Email already exists"
              });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = `
              INSERT INTO users
              (
                name,
                email,
                phone,
                password,
                role_id,
                branch_id,
                status
              )
              VALUES (?, ?, ?, ?, 2, ?, 'ACTIVE')
            `;

            connection.query(
              sql,
              [
                name,
                email,
                phone,
                hashedPassword,
                branch_id
              ],
              (err, result) => {

                if (err) {
                  return res.status(500).json({
                    success: false,
                    message: err.message
                  });
                }

                return res.status(201).json({
                  success: true,
                  message: "Branch Admin created successfully",
                  data: {
                    id: result.insertId,
                    name,
                    email,
                    phone,
                    branch_id
                  }
                });
              }
            );
          }
        );
      }
    );

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =====================================================
// GET ALL BRANCH ADMINS
// =====================================================

exports.getBranchAdmins = (req, res) => {

  const sql = `
    SELECT
      u.id,
      u.name,
      u.email,
      u.phone,
      u.branch_id,
      b.branch_name,
      u.status,
      u.created_at
    FROM users u
    LEFT JOIN branches b
      ON u.branch_id = b.id
    WHERE u.role_id = 2
    ORDER BY u.id DESC
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
      data: result
    });
  });
};


// =====================================================
// GET SINGLE BRANCH ADMIN
// =====================================================

exports.getBranchAdminById = (req, res) => {

  const { id } = req.params;

  const sql = `
    SELECT
      u.id,
      u.name,
      u.email,
      u.phone,
      u.branch_id,
      b.branch_name,
      b.branch_code,
      u.status,
      u.created_at,
      u.updated_at
    FROM users u
    LEFT JOIN branches b
      ON u.branch_id = b.id
    WHERE u.id = ?
      AND u.role_id = 2
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
        message: "Branch Admin not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: result[0]
    });
  });
};


// =====================================================
// UPDATE BRANCH ADMIN
// =====================================================

exports.updateBranchAdmin = (req, res) => {

  const { id } = req.params;

  const {
    name,
    email,
    phone,
    branch_id
  } = req.body;

  const sql = `
    UPDATE users
    SET
      name = ?,
      email = ?,
      phone = ?,
      branch_id = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
      AND role_id = 2
  `;

  connection.query(
    sql,
    [name, email, phone, branch_id, id],
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
          message: "Branch Admin not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Branch Admin updated successfully"
      });
    }
  );
};


// =====================================================
// DEACTIVATE BRANCH ADMIN
// =====================================================

exports.deleteBranchAdmin = (req, res) => {

  const { id } = req.params;

  const sql = `
    UPDATE users
    SET
      status = 'INACTIVE',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
      AND role_id = 2
  `;

  connection.query(sql, [id], (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Branch Admin not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Branch Admin deactivated successfully"
    });
  });
};