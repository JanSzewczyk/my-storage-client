import Storage from "../storage/Storage";
import User from "../user/User";

export default interface Employee extends User {
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
