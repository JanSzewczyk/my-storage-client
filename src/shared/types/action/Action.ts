import { ActionType } from "../../constants";
import Link from "../common/Link";
import Item from "../item/Item";

export default interface Action {
  action: ActionType;
  createdAt: Date;
  currency: string;
  employeeFirstName: string;
  employeeId: string;
  employeeLastName: string;
  id: string;
  items: Item[];
  links: Link[];
  storageId: string;
  storageShortId: string;
  storageName: string;
}
