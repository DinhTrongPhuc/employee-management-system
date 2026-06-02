import express, { Request, Response, Router } from "express";
import { Role } from "../../../domain/entities/Employee";
import { Email } from "../../../domain/value-object/Email";
import { Name } from "../../../domain/value-object/Name";
import { CreateEmployeeUseCase } from "../../../application/use-cases/CreateEmployeeUseCase";
import { ReadListEmployeeUseCase } from "../../../application/use-cases/ReadListEmployeeUseCase";
import { SearchEmployeeUseCase } from "../../../application/use-cases/SearchEmployeeUseCase";

export const EmployeeRoutes = (
  createUseCase: CreateEmployeeUseCase,
  readUseCase: ReadListEmployeeUseCase,
  searchUseCase: SearchEmployeeUseCase,
): Router => {
  const router = express.Router();

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

      res.status(200).json({ employee, message: "Employee retrieved" });
    } catch (error: any) {
      const status = error.message === "Employee not found" ? 404 : 500;
      res.status(status).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
      //method
      const { id } = req.params;

      res.status(200).json({ message: "Employee deleted" });
    } catch (error: any) {
      res.status(500).json({ error, message: "Internal Server Error" });
    }
  });

  return router;
};
