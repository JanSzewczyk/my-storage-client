import StorageDto from "../storage/StorageDto";

export default interface EmployeeDto {
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
