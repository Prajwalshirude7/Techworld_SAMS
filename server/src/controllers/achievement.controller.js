const connection = require("../config/database");

// =====================================================
// CREATE ACHIEVEMENT
// =====================================================

exports.createAchievement = (req, res) => {
  const {
    student_id,
    branch_id,
    title,
    competition,
    level,
    certificate,
    media,
    date
  } = req.body;

  if (
    !student_id ||
    !branch_id ||
    !title ||
    !competition ||
    !level ||
    !date
  ) {
    return res.status(400).json({
      success: false,
      message:
        "student_id, branch_id, title, competition, level and date are required"
    });
  }

  // Check student
  const checkStudent = `
    SELECT id
    FROM students
    WHERE id = ?
  `;

  connection.query(
    checkStudent,
    [student_id],
    (err, studentResult) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (studentResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Student not found"
        });
      }

      // Check branch
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

          const sql = `
            INSERT INTO achievements
            (
              student_id,
              branch_id,
              title,
              competition,
              level,
              certificate,
              media,
              date
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const values = [
            student_id,
            branch_id,
            title,
            competition,
            level,
            certificate || null,
            media || null,
            date
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
                message: "Achievement created successfully",
                achievement_id: result.insertId
              });
            }
          );
        }
      );
    }
  );
};


// =====================================================
// GET ALL ACHIEVEMENTS
// =====================================================

exports.getAchievements = (req, res) => {
  const sql = `
    SELECT
      a.id,
      a.student_id,
      s.student_code,
      u.name AS student_name,
      a.branch_id,
      b.branch_name,
      a.title,
      a.competition,
      a.level,
      a.certificate,
      a.media,
      a.date
    FROM achievements a

    INNER JOIN students s
      ON a.student_id = s.id

    INNER JOIN users u
      ON s.user_id = u.id

    INNER JOIN branches b
      ON a.branch_id = b.id

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
      total: result.length,
      data: result
    });
  });
};


// =====================================================
// GET ACHIEVEMENT BY ID
// =====================================================

exports.getAchievementById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      a.id,
      a.student_id,
      s.student_code,
      u.name AS student_name,
      a.branch_id,
      b.branch_name,
      a.title,
      a.competition,
      a.level,
      a.certificate,
      a.media,
      a.date
    FROM achievements a

    INNER JOIN students s
      ON a.student_id = s.id

    INNER JOIN users u
      ON s.user_id = u.id

    INNER JOIN branches b
      ON a.branch_id = b.id

    WHERE a.id = ?
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
          message: "Achievement not found"
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
// UPDATE ACHIEVEMENT
// =====================================================

exports.updateAchievement = (req, res) => {
  const { id } = req.params;

  const {
    student_id,
    branch_id,
    title,
    competition,
    level,
    certificate,
    media,
    date
  } = req.body;

  if (
    !student_id ||
    !branch_id ||
    !title ||
    !competition ||
    !level ||
    !date
  ) {
    return res.status(400).json({
      success: false,
      message:
        "student_id, branch_id, title, competition, level and date are required"
    });
  }

  const sql = `
    UPDATE achievements
    SET
      student_id = ?,
      branch_id = ?,
      title = ?,
      competition = ?,
      level = ?,
      certificate = ?,
      media = ?,
      date = ?
    WHERE id = ?
  `;

  const values = [
    student_id,
    branch_id,
    title,
    competition,
    level,
    certificate || null,
    media || null,
    date,
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
          message: "Achievement not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Achievement updated successfully"
      });
    }
  );
};


// =====================================================
// DELETE ACHIEVEMENT
// =====================================================

exports.deleteAchievement = (req, res) => {
  const { id } = req.params;

  const sql = `
    DELETE FROM achievements
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
          message: "Achievement not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Achievement deleted successfully"
      });
    }
  );
};