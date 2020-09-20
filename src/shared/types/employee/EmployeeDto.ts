import StorageDto from "../storage/StorageDto";
import UserDto from "../user/UserDto";

export default interface EmployeeDto extends UserDto {
  addressCity: string;
  addressCountry: string;
  addressStreet: string;
  addressZip: string;
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  ownerId: string;
  phone: string;
  shortId: string;
  updatedAt: string;
  workPlace: StorageDto | null;
}
