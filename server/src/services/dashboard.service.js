const connection = require("../config/database");

const queryDatabase = (sql, values = []) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

exports.getDashboardData = async () => {
  const [
    branches,
    students,
    branchAdmins,
    pendingAdmissions,
    activeSubscriptions,
    products,
    revenue,
    recentAdmissions,
  ] = await Promise.all([
    queryDatabase(`
      SELECT COUNT(*) AS total
      FROM branches
    `),

    queryDatabase(`
      SELECT COUNT(*) AS total
      FROM students
    `),

    queryDatabase(`
      SELECT COUNT(*) AS total
      FROM users u
      INNER JOIN roles r ON u.role_id = r.id
      WHERE r.role_name = 'Branch Admin'
    `),

    queryDatabase(`
      SELECT COUNT(*) AS total
      FROM admissions
      WHERE status = 'PENDING'
    `),

    queryDatabase(`
      SELECT COUNT(*) AS total
      FROM student_subscriptions
      WHERE status = 'ACTIVE'
    `),

    queryDatabase(`
      SELECT COUNT(*) AS total
      FROM products
    `),

    queryDatabase(`
      SELECT COALESCE(SUM(paid_amount), 0) AS total
      FROM payments
    `),

    queryDatabase(`
      SELECT
        a.id,
        a.status,
        a.approved_date,
        s.student_code,
        u.name AS student_name,
        b.branch_name
      FROM admissions a
      INNER JOIN students s ON a.student_id = s.id
      INNER JOIN users u ON s.user_id = u.id
      INNER JOIN branches b ON a.branch_id = b.id
      ORDER BY a.id DESC
      LIMIT 5
    `),
  ]);

  return {
    statistics: {
      total_branches: branches[0].total,
      total_students: students[0].total,
      total_branch_admins: branchAdmins[0].total,
      pending_admissions: pendingAdmissions[0].total,
      active_subscriptions: activeSubscriptions[0].total,
      total_products: products[0].total,
      total_revenue: revenue[0].total,
    },

    recent_admissions: recentAdmissions,
  };
};