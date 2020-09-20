import { AuthState } from "../../../store/auth/types";
import { EmployeeState } from "../../../store/employee/types";

export default interface StoreState {
  authStore: AuthState;
  employeeStore: EmployeeState;
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
