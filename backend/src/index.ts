import dotenv from "dotenv";
dotenv.config();

import express from "express";
// Middleware
import { loginMiddleware } from "./middleware/login.middleware";
import { apikeyMiddleware } from "./middleware/apikey.middleware";
// Routes
import EmployeeRoutes from "./interfaces/http/routes/EmployeeRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(loginMiddleware);
app.use(apikeyMiddleware);

// Routes
app.use("/employees", EmployeeRoutes);

app.get("/health", (req, res) => {
  res.send({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
