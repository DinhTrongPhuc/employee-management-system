import express, { Request, Response } from "express";
import { Role } from "../../../domain/entities/Employee";
import { Email } from "../../../domain/value-object/Email";
import { Name } from "../../../domain/value-object/Name";
import { InMemoryEmployeeRepository } from "../../../infrastructure/repositories/InMemoryEmployeeRepository";
import { CreateEmployeeUseCase } from "../../../application/use-cases/CreateEmployeeUseCase";
import { ReadListEmployeeUseCase } from "../../../application/use-cases/ReadListEmployeeUseCase";
import { SearchEmployeeUseCase } from "../../../application/use-cases/SearchEmployeeUseCase";

const router = express.Router();

const repo = new InMemoryEmployeeRepository();

const createUseCase = new CreateEmployeeUseCase(repo);
const readUseCase = new ReadListEmployeeUseCase(repo);
const searchUseCase = new SearchEmployeeUseCase(repo);

router.post("/", async (req: Request, res: Response) => {
  try {
    const { id, name, email, role, salary } = req.body;

    const employee = await createUseCase.execute(
      id,
      new Name(name),
      new Email(email),
      (role as Role) || Role.Staff, //enum default là Staff nếu không có role nào được cung cấp
      salary,
    );

    res.status(201).json({ employee, message: "employee created" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const employee = await readUseCase.execute();
    res.status(200).json({ employee, message: "employee retrieved" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const employee = await searchUseCase.execute(id);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ employee, message: "Employee retrieved" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
