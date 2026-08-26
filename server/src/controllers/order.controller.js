const connection = require("../config/database");

// =====================================================
// CREATE ORDER
// =====================================================

exports.createOrder = (req, res) => {
  const {
    student_id,
    shipping_address,
    items
  } = req.body;

  // Example items:
  // [
  //   {
  //     product_id: 1,
  //     quantity: 2
  //   }
  // ]

  if (!student_id || !shipping_address || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: "student_id, shipping_address and items are required"
    });
  }

  // ---------------------------------------------------
  // Check student
  // ---------------------------------------------------

  const studentSql = `
    SELECT id
    FROM students
    WHERE id = ?
  `;

  connection.query(
    studentSql,
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

      // ---------------------------------------------------
      // Get product details
      // ---------------------------------------------------

      const productIds = items.map(item => item.product_id);

      if (productIds.some(id => !id)) {
        return res.status(400).json({
          success: false,
          message: "Every item must contain product_id"
        });
      }

      const placeholders = productIds.map(() => "?").join(",");

      const productSql = `
        SELECT
          id,
          name,
          price,
          stock,
          status
        FROM products
        WHERE id IN (${placeholders})
      `;

      connection.query(
        productSql,
        productIds,
        (err, products) => {

          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message
            });
          }

          if (products.length !== productIds.length) {
            return res.status(400).json({
              success: false,
              message: "One or more products not found"
            });
          }

          // ---------------------------------------------------
          // Calculate total
          // ---------------------------------------------------

          let total = 0;
          const orderItems = [];

          for (const item of items) {

            const product = products.find(
              p => p.id === Number(item.product_id)
            );

            const quantity = Number(item.quantity);

            if (!quantity || quantity <= 0) {
              return res.status(400).json({
                success: false,
                message: "Quantity must be greater than 0"
              });
            }

            if (product.status !== "AVAILABLE") {
              return res.status(400).json({
                success: false,
                message: `Product ${product.name} is not available`
              });
            }

            if (product.stock < quantity) {
              return res.status(400).json({
                success: false,
                message: `Insufficient stock for ${product.name}`
              });
            }

            const itemTotal = Number(product.price) * quantity;

            total += itemTotal;

            orderItems.push({
              product_id: product.id,
              quantity,
              price: product.price
            });
          }

          // ---------------------------------------------------
          // Insert order
          // ---------------------------------------------------

          const orderSql = `
            INSERT INTO orders
            (
              student_id,
              total,
              payment_status,
              order_status,
              shipping_address
            )
            VALUES (?, ?, ?, ?, ?)
          `;

          const orderValues = [
            student_id,
            total,
            "PENDING",
            "PLACED",
            shipping_address
          ];

          connection.query(
            orderSql,
            orderValues,
            (err, orderResult) => {

              if (err) {
                return res.status(500).json({
                  success: false,
                  message: err.message
                });
              }

              const orderId = orderResult.insertId;

              // ---------------------------------------------------
              // Insert order items
              // ---------------------------------------------------

              const itemValues = [];

              orderItems.forEach(item => {
                itemValues.push([
                  orderId,
                  item.product_id,
                  item.quantity,
                  item.price
                ]);
              });

              const itemSql = `
                INSERT INTO order_items
                (
                  order_id,
                  product_id,
                  quantity,
                  price
                )
                VALUES ?
              `;

              connection.query(
                itemSql,
                [itemValues],
                (err) => {

                  if (err) {
                    return res.status(500).json({
                      success: false,
                      message: err.message
                    });
                  }

                  // ---------------------------------------------------
                  // Reduce product stock
                  // ---------------------------------------------------

                  let completed = 0;
                  let stockError = false;

                  orderItems.forEach(item => {

                    const stockSql = `
                      UPDATE products
                      SET stock = stock - ?
                      WHERE id = ?
                    `;

                    connection.query(
                      stockSql,
                      [item.quantity, item.product_id],
                      (err) => {

                        completed++;

                        if (err) {
                          stockError = true;
                        }

                        if (completed === orderItems.length) {

                          if (stockError) {
                            return res.status(500).json({
                              success: false,
                              message: "Order created but stock update failed"
                            });
                          }

                          return res.status(201).json({
                            success: true,
                            message: "Order created successfully",
                            order_id: orderId,
                            total: total
                          });

                        }

                      }
                    );

                  });

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
// GET ALL ORDERS
// =====================================================

exports.getOrders = (req, res) => {

  const sql = `
    SELECT
      o.id,
      o.student_id,
      u.name AS student_name,
      u.email,
      o.total,
      o.payment_status,
      o.order_status,
      o.shipping_address
    FROM orders o

    INNER JOIN students s
      ON o.student_id = s.id

    INNER JOIN users u
      ON s.user_id = u.id

    ORDER BY o.id DESC
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
// GET ORDER BY ID
// =====================================================

exports.getOrderById = (req, res) => {

  const { id } = req.params;

  const orderSql = `
    SELECT
      o.id,
      o.student_id,
      u.name AS student_name,
      u.email,
      u.phone,
      o.total,
      o.payment_status,
      o.order_status,
      o.shipping_address
    FROM orders o

    INNER JOIN students s
      ON o.student_id = s.id

    INNER JOIN users u
      ON s.user_id = u.id

    WHERE o.id = ?
  `;

  connection.query(
    orderSql,
    [id],
    (err, orderResult) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      if (orderResult.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found"
        });
      }

      const itemSql = `
        SELECT
          oi.id,
          oi.product_id,
          p.name AS product_name,
          oi.quantity,
          oi.price,
          (oi.quantity * oi.price) AS item_total
        FROM order_items oi

        INNER JOIN products p
          ON oi.product_id = p.id

        WHERE oi.order_id = ?
      `;

      connection.query(
        itemSql,
        [id],
        (err, itemResult) => {

          if (err) {
            return res.status(500).json({
              success: false,
              message: err.message
            });
          }

          return res.status(200).json({
            success: true,
            data: {
              order: orderResult[0],
              items: itemResult
            }
          });

        }
      );

    }
  );
};


// =====================================================
// UPDATE ORDER STATUS
// =====================================================

exports.updateOrderStatus = (req, res) => {

  const { id } = req.params;

  const {
    order_status,
    payment_status
  } = req.body;

  const allowedOrderStatus = [
    "PLACED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED"
  ];

  const allowedPaymentStatus = [
    "PENDING",
    "PAID",
    "FAILED",
    "REFUNDED"
  ];

  if (
    order_status &&
    !allowedOrderStatus.includes(order_status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid order_status"
    });
  }

  if (
    payment_status &&
    !allowedPaymentStatus.includes(payment_status)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment_status"
    });
  }

  if (!order_status && !payment_status) {
    return res.status(400).json({
      success: false,
      message: "Provide order_status or payment_status"
    });
  }

  let fields = [];
  let values = [];

  if (order_status) {
    fields.push("order_status = ?");
    values.push(order_status);
  }

  if (payment_status) {
    fields.push("payment_status = ?");
    values.push(payment_status);
  }

  values.push(id);

  const sql = `
    UPDATE orders
    SET ${fields.join(", ")}
    WHERE id = ?
  `;

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
          message: "Order not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Order status updated successfully"
      });

    }
  );
};


// =====================================================
// CANCEL ORDER
// =====================================================

exports.cancelOrder = (req, res) => {

  const { id } = req.params;

  const sql = `
    UPDATE orders
    SET order_status = 'CANCELLED'
    WHERE id = ?
      AND order_status NOT IN ('DELIVERED', 'CANCELLED')
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
          message: "Order not found or cannot be cancelled"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Order cancelled successfully"
      });

    }
  );
};