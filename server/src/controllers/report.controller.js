const connection = require("../config/database");

// =====================================================
// 1. OVERALL / DASHBOARD REPORT
// GET /api/admin/reports
// =====================================================

exports.overallReport = (req, res) => {

  const queries = {

    students: `
      SELECT COUNT(*) AS total_students
      FROM students
    `,

    activeStudents: `
      SELECT COUNT(*) AS active_students
      FROM students
      WHERE status = 'ACTIVE'
    `,

    pendingAdmissions: `
      SELECT COUNT(*) AS pending_admissions
      FROM admissions
      WHERE status = 'PENDING'
    `,

    approvedAdmissions: `
      SELECT COUNT(*) AS approved_admissions
      FROM admissions
      WHERE status = 'APPROVED'
    `,

    totalRevenue: `
      SELECT COALESCE(SUM(paid_amount), 0) AS total_revenue
      FROM payments
    `,

    pendingFees: `
      SELECT COALESCE(SUM(amount + late_fee - discount), 0) AS pending_fees
      FROM fees
      WHERE status = 'PENDING'
    `,

    totalOrders: `
      SELECT COUNT(*) AS total_orders
      FROM orders
    `,

    totalProducts: `
      SELECT COUNT(*) AS total_products
      FROM products
    `,

    totalBranches: `
      SELECT COUNT(*) AS total_branches
      FROM branches
    `

  };


  const keys = Object.keys(queries);
  const resultData = {};

  let completed = 0;

  keys.forEach((key) => {

    connection.query(queries[key], (err, result) => {

      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }

      resultData[key] = result[0];

      completed++;

      if (completed === keys.length) {

        return res.status(200).json({
          success: true,
          data: resultData
        });

      }

    });

  });

};


// =====================================================
// 2. STUDENT REPORT
// GET /api/admin/reports/students
// =====================================================

exports.studentReport = (req, res) => {

  const sql = `
    SELECT
      COUNT(*) AS total_students,
      SUM(status = 'ACTIVE') AS active_students,
      SUM(status = 'INACTIVE') AS inactive_students,
      SUM(status = 'SUSPENDED') AS suspended_students
    FROM students
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
      data: result[0]
    });

  });

};


// =====================================================
// 3. REVENUE REPORT
// GET /api/admin/reports/revenue
// =====================================================

exports.revenueReport = (req, res) => {

  const sql = `
    SELECT
      COUNT(*) AS total_payments,
      COALESCE(SUM(paid_amount), 0) AS total_revenue
    FROM payments
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
      data: result[0]
    });

  });

};


// =====================================================
// 4. FEE COLLECTION REPORT
// GET /api/admin/reports/fees
// =====================================================

exports.feeCollectionReport = (req, res) => {

  const sql = `
    SELECT
      COUNT(*) AS total_fees,
      COALESCE(SUM(amount), 0) AS total_amount,
      COALESCE(SUM(late_fee), 0) AS total_late_fee,
      COALESCE(SUM(discount), 0) AS total_discount,

      COALESCE(
        SUM(
          CASE
            WHEN status = 'PAID'
            THEN amount + late_fee - discount
            ELSE 0
          END
        ), 0
      ) AS collected_amount,

      COALESCE(
        SUM(
          CASE
            WHEN status = 'PENDING'
            THEN amount + late_fee - discount
            ELSE 0
          END
        ), 0
      ) AS pending_amount

    FROM fees
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
      data: result[0]
    });

  });

};


// =====================================================
// 5. BRANCH REPORT
// GET /api/admin/reports/branches
// =====================================================

exports.branchReport = (req, res) => {

  const sql = `
    SELECT
      b.id AS branch_id,
      b.branch_name,
      b.branch_code,
      COUNT(s.id) AS total_students

    FROM branches b

    LEFT JOIN students s
      ON b.id = s.branch_id

    GROUP BY
      b.id,
      b.branch_name,
      b.branch_code

    ORDER BY b.id DESC
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
// 6. PRODUCT SALES REPORT
// GET /api/admin/reports/products
// =====================================================

exports.productSalesReport = (req, res) => {

  const sql = `
    SELECT
      p.id AS product_id,
      p.name AS product_name,
      COALESCE(SUM(oi.quantity), 0) AS total_quantity_sold,
      COALESCE(SUM(oi.quantity * oi.price), 0) AS total_sales

    FROM products p

    LEFT JOIN order_items oi
      ON p.id = oi.product_id

    GROUP BY
      p.id,
      p.name

    ORDER BY total_sales DESC
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
// 7. SUBSCRIPTION REPORT
// GET /api/admin/reports/subscriptions
// =====================================================

exports.subscriptionReport = (req, res) => {

  const sql = `
    SELECT
      sp.id AS plan_id,
      sp.plan_name,
      sp.duration,
      sp.price,

      COUNT(ss.id) AS total_subscriptions,

      SUM(
        ss.status = 'ACTIVE'
      ) AS active_subscriptions,

      SUM(
        ss.status = 'EXPIRED'
      ) AS expired_subscriptions,

      SUM(
        ss.status = 'CANCELLED'
      ) AS cancelled_subscriptions,

      SUM(
        ss.status = 'PENDING'
      ) AS pending_subscriptions

    FROM subscription_plans sp

    LEFT JOIN student_subscriptions ss
      ON sp.id = ss.plan_id

    GROUP BY
      sp.id,
      sp.plan_name,
      sp.duration,
      sp.price

    ORDER BY sp.id DESC
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
// 8. ADMISSION REPORT
// GET /api/admin/reports/admissions
// =====================================================

exports.admissionReport = (req, res) => {

  const sql = `
    SELECT
      COUNT(*) AS total_admissions,

      SUM(
        status = 'PENDING'
      ) AS pending_admissions,

      SUM(
        status = 'APPROVED'
      ) AS approved_admissions,

      SUM(
        status = 'REJECTED'
      ) AS rejected_admissions

    FROM admissions
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
      data: result[0]
    });

  });

};