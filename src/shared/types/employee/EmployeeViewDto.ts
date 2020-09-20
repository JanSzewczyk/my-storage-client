import Link from "../common/Link";

export default interface EmployeeViewDto {
  addressCity: string;
  addressCountry: string;
  addressStreet: string;
  addressZip: string;
  createdAt: string;
  email: string;
  id: string;
  links: Link[];
  name: string;
  ownerEmail: string;
  ownerId: string;
  phone: string;
  shortId: string;
  storageId: string | null;
  storageName: string | null;
  updatedAt: string;
}
