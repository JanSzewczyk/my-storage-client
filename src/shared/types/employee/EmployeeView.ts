import Link from "../common/Link";

export default interface EmployeeView {
  addressCity: string;
  addressCountry: string;
  addressStreet: string;
  addressZip: string;
  createdAt: Date;
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
  updatedAt: Date;
}
