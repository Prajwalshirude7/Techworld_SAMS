const connection = require("../config/database");

// =====================================================
// CREATE GALLERY IMAGE
// =====================================================

exports.createGallery = (req, res) => {

  const {
    title,
    image,
    branch_id,
    uploaded_by
  } = req.body;

  if (!title || !image || !branch_id || !uploaded_by) {
    return res.status(400).json({
      success: false,
      message: "title, image, branch_id and uploaded_by are required"
    });
  }

  // Check branch
  const branchSql = `
    SELECT id
    FROM branches
    WHERE id = ?
  `;

  connection.query(
    branchSql,
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

      // Check uploader
      const userSql = `
        SELECT id
        FROM users
        WHERE id = ?
      `;

      connection.query(
        userSql,
        [uploaded_by],
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
            INSERT INTO gallery
            (
              title,
              image,
              branch_id,
              uploaded_by
            )
            VALUES (?, ?, ?, ?)
          `;

          connection.query(
            sql,
            [
              title,
              image,
              branch_id,
              uploaded_by
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
                message: "Gallery image added successfully",
                gallery_id: result.insertId
              });

            }
          );

        }
      );

    }
  );
};


// =====================================================
// GET ALL GALLERY
// =====================================================

exports.getGallery = (req, res) => {

  const sql = `
    SELECT
      g.id,
      g.title,
      g.image,
      g.branch_id,
      b.branch_name,
      g.uploaded_by,
      u.name AS uploaded_by_name
    FROM gallery g

    INNER JOIN branches b
      ON g.branch_id = b.id

    INNER JOIN users u
      ON g.uploaded_by = u.id

    ORDER BY g.id DESC
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
// GET GALLERY BY ID
// =====================================================

exports.getGalleryById = (req, res) => {

  const { id } = req.params;

  const sql = `
    SELECT
      g.id,
      g.title,
      g.image,
      g.branch_id,
      b.branch_name,
      g.uploaded_by,
      u.name AS uploaded_by_name
    FROM gallery g

    INNER JOIN branches b
      ON g.branch_id = b.id

    INNER JOIN users u
      ON g.uploaded_by = u.id

    WHERE g.id = ?
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
          message: "Gallery image not found"
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
// UPDATE GALLERY
// =====================================================

exports.updateGallery = (req, res) => {

  const { id } = req.params;

  const {
    title,
    image,
    branch_id
  } = req.body;

  if (!title || !image || !branch_id) {
    return res.status(400).json({
      success: false,
      message: "title, image and branch_id are required"
    });
  }

  const sql = `
    UPDATE gallery
    SET
      title = ?,
      image = ?,
      branch_id = ?
    WHERE id = ?
  `;

  connection.query(
    sql,
    [
      title,
      image,
      branch_id,
      id
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
          message: "Gallery image not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Gallery image updated successfully"
      });

    }
  );
};


// =====================================================
// DELETE GALLERY IMAGE
// =====================================================

exports.deleteGallery = (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM gallery
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
          message: "Gallery image not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Gallery image deleted successfully"
      });

    }
  );
};