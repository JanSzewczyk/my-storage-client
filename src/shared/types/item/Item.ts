import Link from "../common/Link";

export default interface Item {
  amount: number;
  currency: string;
  id: string;
  links: Link[];
  productId: string;
  productName: string;
  productDescription: string;
  productValue: number;
  totalValue: number;
}
