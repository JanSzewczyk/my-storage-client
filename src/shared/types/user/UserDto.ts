import EmployeeDto from "../employee/EmployeeDto";
import OwnerDto from "../owner/OwnerDto";

type UserDto = EmployeeDto | OwnerDto;

export default UserDto;
