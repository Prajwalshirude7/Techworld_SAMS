const connection = require("../config/database");


// =====================================================
// CREATE PRODUCT
// =====================================================

exports.createProduct = (req, res) => {

  const {
    category_id,
    name,
    description,
    price,
    stock,
    image,
    offer,
    status
  } = req.body;

  if (
    !category_id ||
    !name ||
    price === undefined ||
    stock === undefined
  ) {
    return res.status(400).json({
      success: false,
      message: "category_id, name, price and stock are required"
    });
  }

  // Check category
  connection.query(
    "SELECT id FROM categories WHERE id = ?",
    [category_id],
    (err, categoryResult) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (categoryResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Category not found"
        });
      }

      const sql = `
        INSERT INTO products
        (
          category_id,
          name,
          description,
          price,
          stock,
          image,
          offer,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        category_id,
        name,
        description || null,
        price,
        stock,
        image || null,
        offer || null,
        status || "AVAILABLE"
      ];

      connection.query(sql, values, (err, result) => {

        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message
          });
        }

        return res.status(201).json({
          success: true,
          message: "Product created successfully",
          product_id: result.insertId
        });

      });

    }
  );
};


// =====================================================
// GET ALL PRODUCTS
// =====================================================

exports.getProducts = (req, res) => {

  const sql = `
    SELECT
      p.*,
      c.name AS category_name
    FROM products p
    INNER JOIN categories c
      ON p.category_id = c.id
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
// GET PRODUCT BY ID
// =====================================================

exports.getProductById = (req, res) => {

  const { id } = req.params;

  const sql = `
    SELECT
      p.*,
      c.name AS category_name
    FROM products p
    INNER JOIN categories c
      ON p.category_id = c.id
    WHERE p.id = ?
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
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      data: result[0]
    });

  });
};


// =====================================================
// UPDATE PRODUCT
// =====================================================

exports.updateProduct = (req, res) => {

  const { id } = req.params;

  const {
    category_id,
    name,
    description,
    price,
    stock,
    image,
    offer,
    status
  } = req.body;

  const sql = `
    UPDATE products
    SET
      category_id = ?,
      name = ?,
      description = ?,
      price = ?,
      stock = ?,
      image = ?,
      offer = ?,
      status = ?
    WHERE id = ?
  `;

  const values = [
    category_id,
    name,
    description || null,
    price,
    stock,
    image || null,
    offer || null,
    status,
    id
  ];

  connection.query(sql, values, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully"
    });

  });
};


// =====================================================
// UPDATE PRODUCT STOCK
// =====================================================

exports.updateStock = (req, res) => {

  const { id } = req.params;
  const { stock } = req.body;

  if (stock === undefined) {
    return res.status(400).json({
      success: false,
      message: "stock is required"
    });
  }

  const status = Number(stock) > 0
    ? "AVAILABLE"
    : "OUT_OF_STOCK";

  const sql = `
    UPDATE products
    SET
      stock = ?,
      status = ?
    WHERE id = ?
  `;

  connection.query(
    sql,
    [stock, status, id],
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
          message: "Product not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product stock updated successfully"
      });

    }
  );
};


// =====================================================
// DISCONTINUE PRODUCT
// =====================================================

exports.deleteProduct = (req, res) => {

  const { id } = req.params;

  const sql = `
    UPDATE products
    SET status = 'DISCONTINUED'
    WHERE id = ?
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
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product discontinued successfully"
    });

  });
};