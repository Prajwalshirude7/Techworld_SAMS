const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

require("dotenv").config();
require("./config/database");

const authRoutes = require("./routes/auth.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const branchRoutes = require("./routes/branch.routes");
const branchAdminRoutes = require("./routes/branchAdmin.routes");
const studentRoutes = require("./routes/student.routes");
const admissionRoutes = require("./routes/admission.routes");
const subscriptionRoutes = require("./routes/subscriptionPlan.routes");
const feeRoutes = require("./routes/fee.routes");
const paymentRoutes = require("./routes/payment.routes");
const categoryRoutes = require("./routes/category.routes");
const productRoutes =require("./routes/product.routes");
const orderRoutes = require("./routes/order.routes");
const galleryRoutes = require("./routes/gallery.routes");
const achievementRoutes = require("./routes/achievement.routes");
const announcementRoutes = require("./routes/announcement.routes");
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin/branches", branchRoutes);
app.use("/api/admin/branch-admins", branchAdminRoutes);
app.use("/api/admin/students", studentRoutes);
app.use("/api/admin/admissions", admissionRoutes);
app.use("/api/admin/subscription-plans", subscriptionRoutes);
app.use("/api/admin/fees", feeRoutes);
app.use("/api/admin/payments", paymentRoutes);
app.use("/api/admin/categories", categoryRoutes);
app.use("/api/admin/products",productRoutes);
app.use("/api/admin/orders", orderRoutes);
app.use("/api/admin/gallery", galleryRoutes);
app.use("/api/admin/achievements", achievementRoutes);
app.use("/api/admin/announcements", announcementRoutes);
app.get("/", (req, res) => {
    res.send("SAMS Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});