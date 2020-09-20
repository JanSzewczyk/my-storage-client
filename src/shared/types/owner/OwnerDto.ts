import Link from "../common/Link";
import UserDto from "../user/UserDto";

export default interface OwnerDto extends UserDto {
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
