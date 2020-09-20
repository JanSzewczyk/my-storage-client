import SortInfo from "./SortInfo";

export default interface Query {
  sort: SortInfo[];
  page: number;
}
