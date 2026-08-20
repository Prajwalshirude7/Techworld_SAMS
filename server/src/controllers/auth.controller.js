// const connection = require("../config/database");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// // ================= REGISTER =================

// exports.register = async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       password,
//       role_id,
//       branch_id,
//     } = req.body;

//     // Validation
//     if (!name || !email || !phone || !password || !role_id) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all required fields",
//       });
//     }

//     // Check existing email
//     connection.query(
//       "SELECT * FROM users WHERE email = ?",
//       [email],
//       async (err, result) => {
//         if (err) {
//           return res.status(500).json({
//             success: false,
//             message: err.message,
//           });
//         }

//         if (result.length > 0) {
//           return res.status(400).json({
//             success: false,
//             message: "Email already exists",
//           });
//         }

//         // Check existing phone
//         connection.query(
//           "SELECT * FROM users WHERE phone = ?",
//           [phone],
//           async (err, phoneResult) => {
//             if (err) {
//               return res.status(500).json({
//                 success: false,
//                 message: err.message,
//               });
//             }

//             if (phoneResult.length > 0) {
//               return res.status(400).json({
//                 success: false,
//                 message: "Phone number already exists",
//               });
//             }

//             // Hash password
//             const hashedPassword = await bcrypt.hash(password, 10);

//             const sql = `
//               INSERT INTO users
//               (name,email,phone,password,role_id,branch_id)
//               VALUES (?,?,?,?,?,?)
//             `;

//             connection.query(
//               sql,
//               [
//                 name,
//                 email,
//                 phone,
//                 hashedPassword,
//                 role_id,
//                 branch_id || null,
//               ],
//               (err) => {
//                 if (err) {
//                   return res.status(500).json({
//                     success: false,
//                     message: err.message,
//                   });
//                 }

//                 return res.status(201).json({
//                   success: true,
//                   message: "Registration Successful",
//                 });
//               }
//             );
//           }
//         );
//       }
//     );
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // ================= LOGIN =================

// exports.login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "Email and Password are required",
//     });
//   }

//   connection.query(
//     "SELECT * FROM users WHERE email = ?",
//     [email],
//     async (err, result) => {
//       if (err) {
//         return res.status(500).json({
//           success: false,
//           message: err.message,
//         });
//       }

//       if (result.length === 0) {
//         return res.status(401).json({
//           success: false,
//           message: "Invalid Email",
//         });
//       }

//       const user = result[0];

//       // Check password
//       const isMatch = await bcrypt.compare(password, user.password);

//       if (!isMatch) {
//         return res.status(401).json({
//           success: false,
//           message: "Invalid Password",
//         });
//       }

//       // Update last login
//       // Update last login
// // Update last login
// connection.query(
//   "UPDATE users SET last_login = NOW() WHERE id = ?",
//   [user.id]
// );

// // Get client information
// const ipAddress =
//   req.headers["x-forwarded-for"] || req.socket.remoteAddress;

// const deviceInfo = req.headers["user-agent"];

// // Save login history
// connection.query(
//   `INSERT INTO login_history (user_id, login_time, ip_address, device_info)
//    VALUES (?, NOW(), ?, ?)`,
//   [user.id, ipAddress, deviceInfo],
//   (err, result) => {
//     if (err) {
//       console.error("❌ Login History Error:", err);
//     } else {
//       console.log("✅ Login History Saved");
//       console.log(result);
//     }
//   }
// );

//       // Generate JWT
//       const token = jwt.sign(
//         {
//           id: user.id,
//           role_id: user.role_id,
//           branch_id: user.branch_id
//         },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "1d",
//         }
//       );

//       return res.status(200).json({
//         success: true,
//         message: "Login Successful",
//         token,
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           phone: user.phone,
//           role_id: user.role_id,
//           branch_id: user.branch_id,
//           status: user.status,
//         },
//       });
//     }
//   );
// };
const connection = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      role_id,
      branch_id,
    } = req.body;

    if (!name || !email || !phone || !password || !role_id) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err.message,
          });
        }

        if (result.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          });
        }

        connection.query(
          "SELECT * FROM users WHERE phone = ?",
          [phone],
          async (err, phoneResult) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: err.message,
              });
            }

            if (phoneResult.length > 0) {
              return res.status(400).json({
                success: false,
                message: "Phone number already exists",
              });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const sql = `
              INSERT INTO users
              (name,email,phone,password,role_id,branch_id)
              VALUES (?,?,?,?,?,?)
            `;

            connection.query(
              sql,
              [
                name,
                email,
                phone,
                hashedPassword,
                role_id,
                branch_id || null,
              ],
              (err) => {
                if (err) {
                  return res.status(500).json({
                    success: false,
                    message: err.message,
                  });
                }

                return res.status(201).json({
                  success: true,
                  message: "Registration Successful",
                });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= LOGIN =================

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required",
    });
  }

  connection.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      if (result.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Invalid Email",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid Password",
        });
      }

      // Update last login
      connection.query(
        "UPDATE users SET last_login = NOW() WHERE id = ?",
        [user.id]
      );

      // Login History
      const ipAddress =
        req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      const deviceInfo = req.headers["user-agent"];

      connection.query(
        `INSERT INTO login_history
        (user_id, login_time, ip_address, device_info)
        VALUES (?, NOW(), ?, ?)`,
        [user.id, ipAddress, deviceInfo],
        (err, result) => {
          if (err) {
            console.log("Login History Error:", err.message);
          } else {
            console.log("Login History Saved");
          }
        }
      );

      // Generate JWT
      const token = jwt.sign(
        {
          id: user.id,
          role_id: user.role_id,
          branch_id: user.branch_id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Login Successful",
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role_id: user.role_id,
          branch_id: user.branch_id,
          status: user.status,
        },
      });
    }
  );
};

// ================= LOGIN HISTORY =================

exports.getLoginHistory = (req, res) => {

  const sql = `
    SELECT
      lh.id AS login_id,
      u.id AS user_id,
      u.name,
      u.email,
      u.phone,
      u.role_id,
      u.branch_id,
      lh.login_time,
      lh.ip_address,
      lh.device_info
    FROM login_history lh
    INNER JOIN users u
      ON lh.user_id = u.id
    ORDER BY lh.login_time DESC
  `;

  connection.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });

  });

};