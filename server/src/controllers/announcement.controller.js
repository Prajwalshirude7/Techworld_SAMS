const connection = require("../config/database");

// =====================================================
// CREATE ANNOUNCEMENT
// =====================================================

exports.createAnnouncement = (req, res) => {
  const {
    title,
    description,
    branch_id,
    type,
    publish_date,
    expiry_date,
    created_by
  } = req.body;

  if (
    !title ||
    !description ||
    !branch_id ||
    !type ||
    !publish_date ||
    !created_by
  ) {
    return res.status(400).json({
      success: false,
      message:
        "title, description, branch_id, type, publish_date and created_by are required"
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

      // Check creator
      const checkUser = `
        SELECT id
        FROM users
        WHERE id = ?
      `;

      connection.query(
        checkUser,
        [created_by],
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

          const sql = `
            INSERT INTO announcements
            (
              title,
              description,
              branch_id,
              type,
              publish_date,
              expiry_date,
              created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
          `;

          const values = [
            title,
            description,
            branch_id,
            type,
            publish_date,
            expiry_date || null,
            created_by
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
                message: "Announcement created successfully",
                announcement_id: result.insertId
              });

            }
          );
        }
      );
    }
  );
};


// =====================================================
// GET ALL ANNOUNCEMENTS
// =====================================================

exports.getAnnouncements = (req, res) => {

  const sql = `
    SELECT
      a.id,
      a.title,
      a.description,
      a.branch_id,
      b.branch_name,
      a.type,
      a.publish_date,
      a.expiry_date,
      a.created_by,
      u.name AS created_by_name
    FROM announcements a

    INNER JOIN branches b
      ON a.branch_id = b.id

    INNER JOIN users u
      ON a.created_by = u.id

    ORDER BY a.publish_date DESC
  `;

  connection.query(
    sql,
    (err, result) => {

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

    }
  );
};


// =====================================================
// GET ANNOUNCEMENT BY ID
// =====================================================

exports.getAnnouncementById = (req, res) => {

  const { id } = req.params;

  const sql = `
    SELECT
      a.id,
      a.title,
      a.description,
      a.branch_id,
      b.branch_name,
      a.type,
      a.publish_date,
      a.expiry_date,
      a.created_by,
      u.name AS created_by_name
    FROM announcements a

    INNER JOIN branches b
      ON a.branch_id = b.id

    INNER JOIN users u
      ON a.created_by = u.id

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
          message: "Announcement not found"
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
// UPDATE ANNOUNCEMENT
// =====================================================

exports.updateAnnouncement = (req, res) => {

  const { id } = req.params;

  const {
    title,
    description,
    branch_id,
    type,
    publish_date,
    expiry_date
  } = req.body;

  if (
    !title ||
    !description ||
    !branch_id ||
    !type ||
    !publish_date
  ) {
    return res.status(400).json({
      success: false,
      message:
        "title, description, branch_id, type and publish_date are required"
    });
  }

  const sql = `
    UPDATE announcements
    SET
      title = ?,
      description = ?,
      branch_id = ?,
      type = ?,
      publish_date = ?,
      expiry_date = ?
    WHERE id = ?
  `;

  const values = [
    title,
    description,
    branch_id,
    type,
    publish_date,
    expiry_date || null,
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
          message: "Announcement not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Announcement updated successfully"
      });

    }
  );
};


// =====================================================
// DELETE ANNOUNCEMENT
// =====================================================

exports.deleteAnnouncement = (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM announcements
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
          message: "Announcement not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Announcement deleted successfully"
      });

    }
  );
};