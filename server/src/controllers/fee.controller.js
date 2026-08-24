const connection = require("../config/database");


// =====================================================
// CREATE FEE
// =====================================================

exports.createFee = (req, res) => {

  const {
    student_id,
    month,
    year,
    amount,
    late_fee,
    discount,
    status,
    due_date
  } = req.body;

  if (
    !student_id ||
    !month ||
    !year ||
    amount === undefined ||
    !due_date
  ) {
    return res.status(400).json({
      success: false,
      message: "student_id, month, year, amount and due_date are required"
    });
  }

  const checkStudent = `
    SELECT id
    FROM students
    WHERE id = ?
  `;

  connection.query(
    checkStudent,
    [student_id],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Student not found"
        });
      }

      const sql = `
        INSERT INTO fees
        (
          student_id,
          month,
          year,
          amount,
          late_fee,
          discount,
          status,
          due_date
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        student_id,
        month,
        year,
        amount,
        late_fee || 0,
        discount || 0,
        status || "PENDING",
        due_date
      ];

      connection.query(
        sql,
        values,
        (err, result) => {

          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message
            });
          }

          return res.status(201).json({
            success: true,
            message: "Fee created successfully",
            fee_id: result.insertId
          });

        }
      );

    }
  );
};


// =====================================================
// GET ALL FEES
// =====================================================

exports.getFees = (req, res) => {

  const sql = `
    SELECT
      f.*,
      s.student_code,
      u.name AS student_name
    FROM fees f
    INNER JOIN students s
      ON f.student_id = s.id
    INNER JOIN users u
      ON s.user_id = u.id
    ORDER BY f.id DESC
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
// GET FEE BY ID
// =====================================================

exports.getFeeById = (req, res) => {

  const { id } = req.params;

  const sql = `
    SELECT
      f.*,
      s.student_code,
      u.name AS student_name,
      u.email,
      u.phone
    FROM fees f
    INNER JOIN students s
      ON f.student_id = s.id
    INNER JOIN users u
      ON s.user_id = u.id
    WHERE f.id = ?
  `;

  connection.query(
    sql,
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Fee not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: result[0]
      });

    }
  );
};


// =====================================================
// UPDATE FEE
// =====================================================

exports.updateFee = (req, res) => {

  const { id } = req.params;

  const {
    month,
    year,
    amount,
    late_fee,
    discount,
    status,
    due_date
  } = req.body;

  const sql = `
    UPDATE fees
    SET
      month = ?,
      year = ?,
      amount = ?,
      late_fee = ?,
      discount = ?,
      status = ?,
      due_date = ?
    WHERE id = ?
  `;

  const values = [
    month,
    year,
    amount,
    late_fee || 0,
    discount || 0,
    status,
    due_date,
    id
  ];

  connection.query(
    sql,
    values,
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
          message: "Fee not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Fee updated successfully"
      });

    }
  );
};
// =====================================================
// DELETE FEE
// =====================================================

exports.deleteFee = (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM fees
    WHERE id = ?
  `;

  connection.query(
    sql,
    [id],
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
          message: "Fee not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Fee deleted successfully"
      });

    }
  );
};