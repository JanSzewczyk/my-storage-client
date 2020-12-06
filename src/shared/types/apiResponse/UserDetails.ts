import { UserRole } from "../../constants";
import UserDto from "../user/UserDto";

export default interface UserDetails {
  user: UserDto;
  role: keyof typeof UserRole;
}
