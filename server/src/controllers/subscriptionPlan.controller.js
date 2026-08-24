const connection = require("../config/database");

// =====================================================
// CREATE SUBSCRIPTION PLAN
// =====================================================

exports.createPlan = (req, res) => {

  const {
    plan_name,
    duration,
    price,
    benefits,
    renewal,
    status
  } = req.body;

  if (
    !plan_name ||
    duration === undefined ||
    price === undefined ||
    !renewal
  ) {
    return res.status(400).json({
      success: false,
      message: "plan_name, duration, price and renewal are required"
    });
  }

  const checkSql = `
    SELECT id
    FROM subscription_plans
    WHERE plan_name = ?
  `;

  connection.query(
    checkSql,
    [plan_name],
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
          message: "Subscription plan already exists"
        });
      }

      const sql = `
        INSERT INTO subscription_plans
        (
          plan_name,
          duration,
          price,
          benefits,
          renewal,
          status
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const values = [
        plan_name,
        duration,
        price,
        benefits || null,
        renewal,
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
            message: "Subscription plan created successfully",
            plan_id: result.insertId
          });

        }
      );

    }
  );
};


// =====================================================
// GET ALL PLANS
// =====================================================

exports.getPlans = (req, res) => {

  const sql = `
    SELECT *
    FROM subscription_plans
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


// =====================================================
// GET PLAN BY ID
// =====================================================

exports.getPlanById = (req, res) => {

  const { id } = req.params;

  const sql = `
    SELECT *
    FROM subscription_plans
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

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Subscription plan not found"
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
// UPDATE PLAN
// =====================================================

exports.updatePlan = (req, res) => {

  const { id } = req.params;

  const {
    plan_name,
    duration,
    price,
    benefits,
    renewal,
    status
  } = req.body;

  const sql = `
    UPDATE subscription_plans
    SET
      plan_name = ?,
      duration = ?,
      price = ?,
      benefits = ?,
      renewal = ?,
      status = ?
    WHERE id = ?
  `;

  const values = [
    plan_name,
    duration,
    price,
    benefits || null,
    renewal,
    status,
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
          message: "Subscription plan not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Subscription plan updated successfully"
      });

    }
  );
};


// =====================================================
// DELETE / DEACTIVATE PLAN
// =====================================================

exports.deletePlan = (req, res) => {

  const { id } = req.params;

  const sql = `
    UPDATE subscription_plans
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
          message: "Subscription plan not found"
        });
      }

      return res.status(200).json({
        success: true,
        message: "Subscription plan deactivated successfully"
      });

    }
  );
};