import express, { Request, Response, Router } from "express";

import { CreateUserUseCase } from "../../../application/use-cases/User/CreateUserUseCase";
import { ReadListUserUseCase } from "../../../application/use-cases/User/ReadListUserUseCase";
import { SearchUserUseCase } from "../../../application/use-cases/User/SearchUserUseCase";
import { UpdateUserUseCase } from "../../../application/use-cases/User/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../application/use-cases/User/DeleteUserUseCase";

export const UserRoutes = (
  createUseCase: CreateUserUseCase,
  readUseCase: ReadListUserUseCase,
  searchUseCase: SearchUserUseCase,
  updateUseCase: UpdateUserUseCase,
  deleteUseCase: DeleteUserUseCase,
): Router => {
  const router = express.Router();

  router.post("/", async (req: Request, res: Response) => {
    try {
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/", async (req: Request, res: Response) => {
    try {
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    try {
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    try {
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  router.put("/:id", async (req: Request, res: Response) => {
    try {
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  return router;
};
