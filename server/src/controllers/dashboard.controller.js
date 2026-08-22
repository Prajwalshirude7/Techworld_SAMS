const dashboardService = require("../services/dashboard.service");

exports.getDashboard = async (req, res) => {
  try {
    const dashboardData =
      await dashboardService.getDashboardData();

    return res.status(200).json({
      success: true,
      message: "Super Admin Dashboard data fetched successfully",
      data: dashboardData,
    });
  } catch (error) {
    console.error("Dashboard Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
};