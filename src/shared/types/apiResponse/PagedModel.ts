import Link from "../common/Link";
import PageInfo from "../common/PageInfo";

export default interface PagedModel<T> {
  content: T;
  links: Link[];
  page: PageInfo;
}
