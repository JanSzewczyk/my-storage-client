import Link from "../common/Link";

export default interface ItemViewDto {
  amount: number;
  currency: string;
  itemId: string;
  links: Link[];
  productDescription: string | null;
  productId: string;
  productName: string;
  storageId: string;
  totalValue: number;
  value: number;
}
