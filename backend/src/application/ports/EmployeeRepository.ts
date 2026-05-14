import { Employee } from "../../domain/entities/Employee";

export interface EmployeeRepository {
  save(employee: Employee): Promise<void>;
  findById(id: string): Promise<Employee | null>;
  findAll(): Promise<Employee[]>;
}
