import { AuthState } from "../../../store/auth/types";
import { EmployeeState } from "../../../store/employee/types";
import { ItemState } from "../../../store/item/types";
import { ProductState } from "../../../store/product/types";
import { StatisticState } from "../../../store/statistic/types";

export default interface StoreState {
  authStore: AuthState;
  employeeStore: EmployeeState;
  itemStore: ItemState;
  productStore: ProductState;
  statisticStore: StatisticState;
}
