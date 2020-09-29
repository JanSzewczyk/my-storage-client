import { ActionType } from "../../constants";
import Link from "../common/Link";
import Item from "../item/Item";

export default interface ActionDto {
  action: ActionType;
  createdAt: string;
  currency: string;
  employeeFirstName: string;
  employeeId: string;
  employeeLastName: string;
  id: string;
  items: Item[];
  links: Link[];
}
