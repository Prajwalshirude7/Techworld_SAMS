const connection = require("../config/database");


// =====================================================
// CREATE PAYMENT
// =====================================================

exports.createPayment = (req, res) => {

  const {
    fee_id,
    payment_method,
    transaction_id,
    paid_amount,
    receipt
  } = req.body;

  if (
    !fee_id ||
    !payment_method ||
    paid_amount === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "fee_id, payment_method and paid_amount are required"
    });
  }

  const checkFee = `
    SELECT id, amount, late_fee, discount, status
    FROM fees
    WHERE id = ?
  `;

  connection.query(
    checkFee,
    [fee_id],
    (err, feeResult) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (feeResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Fee not found"
        });
      }

      const fee = feeResult[0];

      const sql = `
        INSERT INTO payments
        (
          fee_id,
          payment_method,
          transaction_id,
          paid_amount,
          paid_date,
          receipt
        )
        VALUES (?, ?, ?, ?, NOW(), ?)
      `;

      const values = [
        fee_id,
        payment_method,
        transaction_id || null,
        paid_amount,
        receipt || null
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

          // Mark fee as PAID
          connection.query(
            `
              UPDATE fees
              SET status = 'PAID'
              WHERE id = ?
            `,
            [fee_id],
            (updateErr) => {

              if (updateErr) {
                console.log(
                  "Fee status update error:",
                  updateErr.message
                );
              }

              return res.status(201).json({
                success: true,
                message: "Payment recorded successfully",
                payment_id: result.insertId
              });

            }
          );

        }
      );

    }
  );
};


// =====================================================
// GET ALL PAYMENTS
// =====================================================

exports.getPayments = (req, res) => {

  const sql = `
    SELECT
      p.*,
      f.student_id,
      f.month,
      f.year,
      s.student_code,
      u.name AS student_name
    FROM payments p

    INNER JOIN fees f
      ON p.fee_id = f.id

    INNER JOIN students s
      ON f.student_id = s.id

    INNER JOIN users u
      ON s.user_id = u.id

    ORDER BY p.id DESC
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
// GET PAYMENT BY ID
// =====================================================

exports.getPaymentById = (req, res) => {

  const { id } = req.params;

  const sql = `
    SELECT
      p.*,
      f.student_id,
      f.month,
      f.year,
      f.amount AS fee_amount,
      s.student_code,
      u.name AS student_name,
      u.email
    FROM payments p

    INNER JOIN fees f
      ON p.fee_id = f.id

    INNER JOIN students s
      ON f.student_id = s.id

    INNER JOIN users u
      ON s.user_id = u.id

    WHERE p.id = ?
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
          message: "Payment not found"
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
// UPDATE PAYMENT
// =====================================================

exports.updatePayment = (req, res) => {

  const { id } = req.params;

  const {
    payment_method,
    transaction_id,
    paid_amount,
    receipt
  } = req.body;

  const sql = `
    UPDATE payments
    SET
      payment_method = ?,
      transaction_id = ?,
      paid_amount = ?,
      receipt = ?
    WHERE id = ?
  `;

  const values = [
    payment_method,
    transaction_id || null,
    paid_amount,
    receipt || null,
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
          message: "Payment not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Payment updated successfully"
      });

    }
  );
};
// =====================================================
// DELETE PAYMENT
// =====================================================

exports.deletePayment = (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM payments
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
          message: "Payment not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Payment deleted successfully"
      });

    }
  );
};