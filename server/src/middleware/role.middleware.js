// const connection = require("../config/database");

// const requireSuperAdmin = (req, res, next) => {
//   console.log("USER FROM JWT:", req.user);

//   const sql = `
//     SELECT id, role_name
//     FROM roles
//     WHERE id = ?
//   `;

//   connection.query(sql, [req.user.role_id], (err, result) => {
//     if (err) {
//       console.log("ROLE ERROR:", err.message);

//       return res.status(500).json({
//         success: false,
//         message: "Database error while checking role",
//       });
//     }

//     console.log("ROLE FROM DATABASE:", result);

//     if (result.length === 0) {
//       return res.status(403).json({
//         success: false,
//         message: "Role not found",
//       });
//     }

//     const roleName = result[0].role_name;

//     console.log("ROLE NAME:", `"${roleName}"`);

//     if (roleName.trim().toUpperCase() !== "SUPER ADMIN") {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Super Admin only",
//       });
//     }

//     next();
//   });
// };

// module.exports = requireSuperAdmin;
const connection = require("../config/database");

const requireSuperAdmin = (req, res, next) => {

  console.log("USER FROM JWT:", req.user);

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Token not provided"
    });
  }

  const sql = `
    SELECT role_name
    FROM roles
    WHERE id = ?
  `;

  connection.query(sql, [req.user.role_id], (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message
      });
    }

    if (result.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Invalid role"
      });
    }

    if (result[0].role_name !== "SUPER ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Super Admin only"
      });
    }

    next();
  });
};

module.exports = {
  requireSuperAdmin
};