import Link from "../common/Link";

export default interface Owner {
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
