import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { Pool } from "pg";
// Middleware
import { loginMiddleware } from "./middleware/login.middleware";
import { apikeyMiddleware } from "./middleware/apikey.middleware";
// Routes
import { EmployeeRoutes } from "./interfaces/http/routes/EmployeeRoutes";
//infrastructure
import { InMemoryEmployeeRepository } from "./infrastructure/repositories/InMemoryEmployeeRepository";
import { PostgresEmployeeRepository } from "./infrastructure/repositories/PostgresEmployeeRepository";
import { PostgresUserRepository } from "./infrastructure/repositories/PostgresUserRepository";
//application usecase
import { CreateEmployeeUseCase } from "./application/use-cases/CreateEmployeeUseCase";
import { ReadListEmployeeUseCase } from "./application/use-cases/ReadListEmployeeUseCase";
import { SearchEmployeeUseCase } from "./application/use-cases/SearchEmployeeUseCase";
import { UpdateEmployeeUseCase } from "./application/use-cases/UpdateEmployeeUseCase";
import { DeleteEmployeeUseCase } from "./application/use-cases/DeleteEmployeeUseCase";

const app = express();
const PORT = process.env.PORT || 5000;

const dbpool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),
});

//infrastructure
const employyRepo = new PostgresEmployeeRepository(dbpool);
const userRepo = new PostgresUserRepository(dbpool);
//application usecase(Employee, User, ...)
const createUseCase = new CreateEmployeeUseCase(employyRepo);
const readUseCase = new ReadListEmployeeUseCase(employyRepo);
const searchUseCase = new SearchEmployeeUseCase(employyRepo);
const deleteUseCase = new DeleteEmployeeUseCase(employyRepo);
const updateUseCase = new UpdateEmployeeUseCase(employyRepo);

const employeeRouter = EmployeeRoutes(
  createUseCase,
  readUseCase,
  searchUseCase,
  deleteUseCase,
  updateUseCase,
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
