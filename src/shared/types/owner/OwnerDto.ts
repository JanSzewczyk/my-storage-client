import Link from "../common/Link";

export default interface OwnerDto {
  createdAt: string;
  currency: string;
  email: string;
  firstName: string;
  lastName: string;
  links: Link[];
  ownerId: string;
  phone: string;
  updatedAt: string;
}
