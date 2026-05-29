import dotenv from "dotenv";
dotenv.config();

import express from "express";
// Middleware
import { loginMiddleware } from "./middleware/login.middleware";
import { apikeyMiddleware } from "./middleware/apikey.middleware";
// Routes
import { EmployeeRoutes } from "./interfaces/http/routes/EmployeeRoutes";
//infrastructure
import { InMemoryEmployeeRepository } from "./infrastructure/repositories/InMemoryEmployeeRepository";
import { PostgresEmployeeRepository } from "./infrastructure/repositories/PostgresEmployeeRepository";
//application usecase
import { CreateEmployeeUseCase } from "./application/use-cases/CreateEmployeeUseCase";
import { ReadListEmployeeUseCase } from "./application/use-cases/ReadListEmployeeUseCase";
import { SearchEmployeeUseCase } from "./application/use-cases/SearchEmployeeUseCase";

const app = express();
const PORT = process.env.PORT || 5000;

//infrastructure
const repo = new PostgresEmployeeRepository();
//application usecase
const createUseCase = new CreateEmployeeUseCase(repo);
const readUseCase = new ReadListEmployeeUseCase(repo);
const searchUseCase = new SearchEmployeeUseCase(repo);

const employeeRouter = EmployeeRoutes(
  createUseCase,
  readUseCase,
  searchUseCase,
);

// Middleware
app.use(express.json());
app.use(loginMiddleware);
app.use(apikeyMiddleware);

// Routes
app.use("/employees", employeeRouter);

app.get("/health", (req, res) => {
  res.send({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
