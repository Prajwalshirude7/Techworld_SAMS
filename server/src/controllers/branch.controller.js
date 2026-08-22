const connection = require("../config/database");

// ================= CREATE BRANCH =================

exports.createBranch = (req, res) => {
  const {
    branch_name,
    branch_code,
    manager,
    phone,
    email,
    address,
    city,
    state,
    country,
    google_map,
    working_hours,
    status,
  } = req.body;

  if (
    !branch_name ||
    !branch_code ||
    !phone ||
    !email ||
    !address ||
    !city ||
    !state ||
    !country
  ) {
    return res.status(400).json({
      success: false,
      message: "Please fill all required fields",
    });
  }

  // Check duplicate branch code
  connection.query(
    "SELECT id FROM branches WHERE branch_code = ?",
    [branch_code],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Branch code already exists",
        });
      }

      const sql = `
        INSERT INTO branches
        (
          branch_name,
          branch_code,
          manager,
          phone,
          email,
          address,
          city,
          state,
          country,
          google_map,
          working_hours,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        branch_name,
        branch_code,
        manager || null,
        phone,
        email,
        address,
        city,
        state,
        country,
        google_map || null,
        working_hours || null,
        status || "ACTIVE",
      ];

      connection.query(sql, values, (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        return res.status(201).json({
          success: true,
          message: "Branch created successfully",
          branch_id: result.insertId,
        });
      });
    }
  );
};


// ================= GET ALL BRANCHES =================

exports.getAllBranches = (req, res) => {
  const sql = `
    SELECT *
    FROM branches
    ORDER BY created_at DESC
  `;

  connection.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      total: result.length,
      data: result,
    });
  });
};


// ================= GET SINGLE BRANCH =================

exports.getBranchById = (req, res) => {
  const { id } = req.params;

  connection.query(
    "SELECT * FROM branches WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Branch not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: result[0],
      });
    }
  );
};


// ================= UPDATE BRANCH =================

exports.updateBranch = (req, res) => {
  const { id } = req.params;

  const {
    branch_name,
    branch_code,
    manager,
    phone,
    email,
    address,
    city,
    state,
    country,
    google_map,
    working_hours,
    status,
  } = req.body;

  const sql = `
    UPDATE branches
    SET
      branch_name = ?,
      branch_code = ?,
      manager = ?,
      phone = ?,
      email = ?,
      address = ?,
      city = ?,
      state = ?,
      country = ?,
      google_map = ?,
      working_hours = ?,
      status = ?
    WHERE id = ?
  `;

  const values = [
    branch_name,
    branch_code,
    manager || null,
    phone,
    email,
    address,
    city,
    state,
    country,
    google_map || null,
    working_hours || null,
    status,
    id,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Branch not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Branch updated successfully",
    });
  });
};


// ================= DELETE BRANCH =================

exports.deleteBranch = (req, res) => {
  const { id } = req.params;

  connection.query(
    "DELETE FROM branches WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "Branch not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Branch deleted successfully",
      });
    }
  );
};