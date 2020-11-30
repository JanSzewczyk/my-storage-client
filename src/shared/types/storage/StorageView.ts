import Link from "../common/Link";

export default interface StorageView {
  addressCity: string;
  addressCountry: string;
  addressStreet: string;
  addressZip: string;
  createdAt: Date;
  id: string;
  lastActionDate: Date | null;
  links: Link[];
  name: string;
  numberOfEmployees: number;
  ownerId: string;
  shortId: string;
  surface: number;
  updatedAt: Date;
}
