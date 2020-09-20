import { AuthState } from "../../../store/auth/types";
import { EmployeeState } from "../../../store/employee/types";
import { ItemState } from "../../../store/item/types";
import { ProductState } from "../../../store/product/types";

export default interface StoreState {
  authStore: AuthState;
  employeeStore: EmployeeState;
  itemStore: ItemState;
  productStore: ProductState;
  // authStore: AuthState;
  // balanceStore: BalanceState;
  // merchantStore: MerchantState;
  // offerStore: OfferState;
  // ownerStore: OwnerState;
  // paymentStore: PaymentState;
  // reportStore: ReportState;
  // serverStore: ServerState;
  // shopStore: ShopState;
  // transactionStore: TransactionsState;
  // userStore: UserState;
}
