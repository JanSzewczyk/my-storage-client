import Storage from "../storage/Storage";

export default interface Employee {
  addressCity: string;
  addressCountry: string;
  addressStreet: string;
  addressZip: string;
  createdAt: Date;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  ownerId: string;
  phone: string;
  shortId: string;
  updatedAt: Date;
  workPlace: Storage | null;
}
