import Link from "../common/Link";
import User from "../user/User";

export default interface Owner extends User {
  createdAt: Date;
  currency: string;
  email: string;
  firstName: string;
  lastName: string;
  links: Link[];
  ownerId: string;
  phone: string;
  updatedAt: Date;
}
