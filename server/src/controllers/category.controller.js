const connection = require("../config/database");


// CREATE CATEGORY

exports.createCategory = (req, res) => {

  const {
    name,
    image
  } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required"
    });
  }

  const checkSql = `
    SELECT id
    FROM categories
    WHERE name = ?
  `;

  connection.query(
    checkSql,
    [name],
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
          message: "Category already exists"
        });
      }

      const sql = `
        INSERT INTO categories
        (name, image)
        VALUES (?, ?)
      `;

      connection.query(
        sql,
        [name, image || null],
        (err, result) => {

          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message
            });
          }

          return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category_id: result.insertId
          });

        }
      );

    }
  );
};


// GET ALL CATEGORIES

exports.getCategories = (req, res) => {

  const sql = `
    SELECT *
    FROM categories
    ORDER BY id DESC
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


// GET CATEGORY BY ID

exports.getCategoryById = (req, res) => {

  const { id } = req.params;

  connection.query(
    "SELECT * FROM categories WHERE id = ?",
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
          message: "Category not found"
        });
      }

      return res.status(200).json({
        success: true,
        data: result[0]
      });

    }
  );
};


// UPDATE CATEGORY

exports.updateCategory = (req, res) => {

  const { id } = req.params;

  const {
    name,
    image
  } = req.body;

  const sql = `
    UPDATE categories
    SET
      name = ?,
      image = ?
    WHERE id = ?
  `;

  connection.query(
    sql,
    [name, image || null, id],
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
          message: "Category not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category updated successfully"
      });

    }
  );
};


// DELETE CATEGORY

exports.deleteCategory = (req, res) => {

  const { id } = req.params;

  connection.query(
    "DELETE FROM categories WHERE id = ?",
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
          message: "Category not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Category deleted successfully"
      });

    }
  );
};