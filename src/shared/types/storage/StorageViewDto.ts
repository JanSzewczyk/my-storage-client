import Link from "../common/Link";

export default interface StorageViewDto {
  addressCity: string;
  addressCountry: string;
  addressStreet: string;
  addressZip: string;
  createdAt: string;
  id: string;
  lastActionDate: string | null;
  links: Link[];
  name: string;
  numberOfEmployees: number;
  ownerId: string;
  shortId: string;
  surface: number;
  updatedAt: string;
}
