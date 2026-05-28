import { Employee } from "../../domain/entities/Employee";

export interface EmployeeRepository {
  save(employee: Employee): Promise<void>;
  findById(id: string): Promise<Employee>;
  findAll(): Promise<Employee[]>;
  updateById(id: string, employee: Employee): Promise<void>;
  deleteById(id: string): Promise<void>;
}
