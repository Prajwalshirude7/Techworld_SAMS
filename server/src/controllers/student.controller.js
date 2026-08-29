const connection = require("../config/database");

// =====================================================
// CREATE STUDENT
// POST /api/admin/students
// =====================================================

exports.createStudent = (req, res) => {
  const {
    student_code,
    user_id,
    branch_id,
    dob,
    gender,
    blood_group,
    address,
    father_name,
    emergency_contact,
    medical_condition,
    id_proof,
    medical_certificate,
    joining_date,
    status
  } = req.body;

  // Required fields
  if (
    !student_code ||
    !user_id ||
    !branch_id ||
    !dob ||
    !gender ||
    !joining_date
  ) {
    return res.status(400).json({
      success: false,
      message:
        "student_code, user_id, branch_id, dob, gender and joining_date are required"
    });
  }

  // Check duplicate student code
  const checkStudentCode = `
    SELECT id
    FROM students
    WHERE student_code = ?
  `;

  connection.query(
    checkStudentCode,
    [student_code],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (result.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Student code already exists"
        });
      }

      // Check user exists
      const checkUser = `
        SELECT id, role_id, branch_id
        FROM users
        WHERE id = ?
      `;

      connection.query(
        checkUser,
        [user_id],
        (err, userResult) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message
            });
          }

          if (userResult.length === 0) {
            return res.status(404).json({
              success: false,
              message: "User not found"
            });
          }

          // Check if user is already a student
          const checkExistingStudent = `
            SELECT id
            FROM students
            WHERE user_id = ?
          `;

          connection.query(
            checkExistingStudent,
            [user_id],
            (err, existingResult) => {
              if (err) {
                return res.status(500).json({
                  success: false,
                  message: err.message
                });
              }

              if (existingResult.length > 0) {
                return res.status(400).json({
                  success: false,
                  message: "This user is already registered as a student"
                });
              }

              // Check branch exists
              const checkBranch = `
                SELECT id
                FROM branches
                WHERE id = ?
              `;

              connection.query(
                checkBranch,
                [branch_id],
                (err, branchResult) => {
                  if (err) {
                    return res.status(500).json({
                      success: false,
                      message: err.message
                    });
                  }

                  if (branchResult.length === 0) {
                    return res.status(404).json({
                      success: false,
                      message: "Branch not found"
                    });
                  }

                  // Insert student
                  const sql = `
                    INSERT INTO students
                    (
                      student_code,
                      user_id,
                      branch_id,
                      dob,
                      gender,
                      blood_group,
                      address,
                      father_name,
                      emergency_contact,
                      medical_condition,
                      id_proof,
                      medical_certificate,
                      joining_date,
                      status
                    )
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `;

                  const values = [
                    student_code,
                    user_id,
                    branch_id,
                    dob,
                    gender,
                    blood_group || null,
                    address || null,
                    father_name || null,
                    emergency_contact || null,
                    medical_condition || null,
                    id_proof || null,
                    medical_certificate || null,
                    joining_date,
                    status || "ACTIVE"
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
                        message: "Student created successfully",
                        student_id: result.insertId
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};


// =====================================================
// GET ALL STUDENTS
// GET /api/admin/students
// =====================================================

exports.getStudents = (req, res) => {
  const sql = `
    SELECT
      s.id,
      s.student_code,
      s.user_id,
      u.name,
      u.email,
      u.phone,
      s.branch_id,
      b.branch_name,
      s.dob,
      s.gender,
      s.blood_group,
      s.address,
      s.father_name,
      s.emergency_contact,
      s.medical_condition,
      s.id_proof,
      s.medical_certificate,
      s.joining_date,
      s.status
    FROM students s
    INNER JOIN users u
      ON s.user_id = u.id
    INNER JOIN branches b
      ON s.branch_id = b.id
    ORDER BY s.id DESC
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
// GET STUDENT BY ID
// GET /api/admin/students/:id
// =====================================================

exports.getStudentById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      s.id,
      s.student_code,
      s.user_id,
      u.name,
      u.email,
      u.phone,
      u.role_id,
      s.branch_id,
      b.branch_name,
      b.branch_code,
      s.dob,
      s.gender,
      s.blood_group,
      s.address,
      s.father_name,
      s.emergency_contact,
      s.medical_condition,
      s.id_proof,
      s.medical_certificate,
      s.joining_date,
      s.status
    FROM students s
    INNER JOIN users u
      ON s.user_id = u.id
    INNER JOIN branches b
      ON s.branch_id = b.id
    WHERE s.id = ?
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
          message: "Student not found"
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
// UPDATE STUDENT
// PUT /api/admin/students/:id
// =====================================================

exports.updateStudent = (req, res) => {
  const { id } = req.params;

  const {
    student_code,
    branch_id,
    dob,
    gender,
    blood_group,
    address,
    father_name,
    emergency_contact,
    medical_condition,
    id_proof,
    medical_certificate,
    joining_date,
    status
  } = req.body;

  // Check student exists
  const checkStudent = `
    SELECT id
    FROM students
    WHERE id = ?
  `;

  connection.query(
    checkStudent,
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
          message: "Student not found"
        });
      }

      // Check duplicate student code
      if (student_code) {
        const checkCode = `
          SELECT id
          FROM students
          WHERE student_code = ?
          AND id != ?
        `;

        connection.query(
          checkCode,
          [student_code, id],
          (err, codeResult) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message
              });
            }

            if (codeResult.length > 0) {
              return res.status(400).json({
                success: false,
                message: "Student code already exists"
              });
            }

            performUpdate();
          }
        );
      } else {
        performUpdate();
      }

      function performUpdate() {
        const sql = `
          UPDATE students
          SET
            student_code = COALESCE(?, student_code),
            branch_id = COALESCE(?, branch_id),
            dob = COALESCE(?, dob),
            gender = COALESCE(?, gender),
            blood_group = ?,
            address = ?,
            father_name = ?,
            emergency_contact = ?,
            medical_condition = ?,
            id_proof = ?,
            medical_certificate = ?,
            joining_date = COALESCE(?, joining_date),
            status = COALESCE(?, status)
          WHERE id = ?
        `;

        const values = [
          student_code || null,
          branch_id || null,
          dob || null,
          gender || null,
          blood_group || null,
          address || null,
          father_name || null,
          emergency_contact || null,
          medical_condition || null,
          id_proof || null,
          medical_certificate || null,
          joining_date || null,
          status || null,
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

            return res.status(200).json({
              success: true,
              message: "Student updated successfully"
            });
          }
        );
      }
    }
  );
};


// =====================================================
// DEACTIVATE STUDENT
// DELETE /api/admin/students/:id
// =====================================================

exports.deactivateStudent = (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE students
    SET status = 'INACTIVE'
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
          message: "Student not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Student deactivated successfully"
      });
    }
  );
};