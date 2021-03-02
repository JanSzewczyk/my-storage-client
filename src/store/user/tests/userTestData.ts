import { UserRole } from "../../../shared/constants";
import UserDetails from "../../../shared/types/apiResponse/UserDetails";
import User from "../../../shared/types/user/User";
import UserDto from "../../../shared/types/user/UserDto";

export const userDto1: UserDto = {
  createdAt: "2016-05-06T17:53:58.000+0000",
  currency: "PLN",
  email: "jan.szewczyk1997@gmail.com",
  firstName: "Janek",
  lastName: "Szewczyk",
  links: [],
  ownerId: "02346256-44b2-4811-917a-6ad03c56036e",
  phone: "+23534321565",
  updatedAt: "2020-06-23T19:59:13.886+0000",
};

export const userDetails: UserDetails = {
  role: UserRole.OWNER,
  user: userDto1,
};

export const user1: User = {
  createdAt: new Date("2016-05-06T17:53:58.000+0000"),
  currency: "PLN",
  email: "jan.szewczyk1997@gmail.com",
  firstName: "Janek",
  lastName: "Szewczyk",
  links: [],
  ownerId: "02346256-44b2-4811-917a-6ad03c56036e",
  phone: "+23534321565",
  updatedAt: new Date("2020-06-23T19:59:13.886+0000"),
};
