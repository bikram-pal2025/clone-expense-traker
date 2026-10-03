const express = require("express");
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");
const adminRoutes = require("./routes/admin.routes");
const transationRouts = require("./routes/transation.routes");
const profileRoutes = require('./routes/profile.routes')
const cookieParser = require("cookie-parser");
const cors = require("cors");



const app = express();
app.use(express.json());

// middle ware
const allowedOrigins = [
  "pest your backend and forntend deployed || localhost urls"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser())

//Api call for auth
app.use("/api/auth", authRoutes);

//Api call for admin

app.use("/api/admin",adminRoutes );


app.use("/api/category",categoryRoutes);

//Api call for transation 

app.use("/api/transation",transationRouts);

//Api call for profile

app.use('/api/profile',profileRoutes)



module.exports = app;
