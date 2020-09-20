import Query from "./Query";

export default interface SearchQuery extends Query {
  search: string;
}
