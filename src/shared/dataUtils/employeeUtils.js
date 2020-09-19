import { updateObject } from "../utils/utility";

export const mapEmployeeViewDtoToEmployeeView = (employee) =>
  updateObject(employee, {
    createdAt: new Date(employee.createdAt),
    updatedAt: new Date(employee.updatedAt),
  });

export const mapEmployeeDtoToEmployee = (employee) =>
  updateObject(employee, {
    createdAt: new Date(employee.createdAt),
    updatedAt: new Date(employee.updatedAt),
  });
