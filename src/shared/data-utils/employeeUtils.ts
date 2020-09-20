import Employee from "../types/employee/Employee";
import EmployeeDto from "../types/employee/EmployeeDto";
import EmployeeView from "../types/employee/EmployeeView";
import EmployeeViewDto from "../types/employee/EmployeeViewDto";
import { updateObject } from "../utils/utility";
import { mapStorageDtoToStorage } from "./storageUtils";

export const mapEmployeeViewDtoToEmployeeView = (
  employeeViewDto: EmployeeViewDto
): EmployeeView =>
  updateObject(employeeViewDto, {
    createdAt: new Date(employeeViewDto.createdAt),
    updatedAt: new Date(employeeViewDto.updatedAt),
  });

export const mapEmployeeDtoToEmployee = (employeeDto: EmployeeDto): Employee =>
  updateObject(employeeDto, {
    createdAt: new Date(employeeDto.createdAt),
    updatedAt: new Date(employeeDto.updatedAt),
    workPlace: employeeDto.workPlace
      ? mapStorageDtoToStorage(employeeDto.workPlace)
      : null,
  });
