const connection = require("../config/database");


// =====================================================
// GET ALL ADMISSIONS
// =====================================================

exports.getAdmissions = (req, res) => {

  const sql = `
    SELECT
      a.id,
      a.student_id,
      s.student_code,
      u.name AS student_name,
      u.email,
      a.branch_id,
      b.branch_name,
      a.status,
      a.approved_by,
      approver.name AS approved_by_name,
      a.approved_date,
      a.remarks

    FROM admissions a

    INNER JOIN students s
      ON a.student_id = s.id

    INNER JOIN users u
      ON s.user_id = u.id

    INNER JOIN branches b
      ON a.branch_id = b.id

    LEFT JOIN users approver
      ON a.approved_by = approver.id

    ORDER BY a.id DESC
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
// GET PENDING ADMISSIONS
// =====================================================

exports.getPendingAdmissions = (req, res) => {

  const sql = `
    SELECT
      a.id,
      a.student_id,
      s.student_code,
      u.name AS student_name,
      u.email,
      b.branch_name,
      a.status,
      a.approved_date,
      a.remarks

    FROM admissions a

    INNER JOIN students s
      ON a.student_id = s.id

    INNER JOIN users u
      ON s.user_id = u.id

    INNER JOIN branches b
      ON a.branch_id = b.id

    WHERE a.status = 'PENDING'

    ORDER BY a.id DESC
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
// GET ADMISSION BY ID
// =====================================================

exports.getAdmissionById = (req, res) => {

  const { id } = req.params;


  const sql = `
    SELECT
      a.*,
      s.student_code,
      s.dob,
      s.gender,
      s.father_name,
    
      u.name AS student_name,
      u.email,
      u.phone,
      b.branch_name,
      b.branch_code,
      approver.name AS approved_by_name

    FROM admissions a

    INNER JOIN students s
      ON a.student_id = s.id

    INNER JOIN users u
      ON s.user_id = u.id

    INNER JOIN branches b
      ON a.branch_id = b.id

    LEFT JOIN users approver
      ON a.approved_by = approver.id

    WHERE a.id = ?
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
        message: "Admission not found"
      });
    }


    return res.status(200).json({
      success: true,
      data: result[0]
    });

  });

};


// =====================================================
// APPROVE ADMISSION
// =====================================================

exports.approveAdmission = (req, res) => {

  const { id } = req.params;

  const approvedBy = req.user.id;


  const sql = `
    UPDATE admissions
    SET
      status = 'APPROVED',
      approved_by = ?,
      approved_date = NOW()
    WHERE id = ?
      AND status = 'PENDING'
  `;


  connection.query(
    sql,
    [approvedBy, id],
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
          message: "Pending admission not found"
        });
      }


      return res.status(200).json({
        success: true,
        message: "Admission approved successfully"
      });

    }
  );

};


// =====================================================
// REJECT ADMISSION
// =====================================================

exports.rejectAdmission = (req, res) => {

  const { id } = req.params;

  const {
    remarks
  } = req.body;

  const approvedBy = req.user.id;


  const sql = `
    UPDATE admissions
    SET
      status = 'REJECTED',
      approved_by = ?,
      approved_date = NOW(),
      remarks = ?
    WHERE id = ?
      AND status = 'PENDING'
  `;


  connection.query(
    sql,
    [approvedBy, remarks || null, id],
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
          message: "Pending admission not found"
        });
      }


      return res.status(200).json({
        success: true,
        message: "Admission rejected successfully"
      });

    }
  );

};


module.exports = exports;