import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationLinks from "./NavigationLinks";
import NavigationLink from "./NavigationLink/NavigationLink";

configure({ adapter: new Adapter() });

describe("<NavigationLinks />", () => {
  let wrapper;

  //   beforeEach(() => {
  //     wrapper = shallow(<NavigationLinks userRole={""} />);
  //   });

  it("should render two <NavigationLink /> elements if user role is OWNER", () => {
    // wrapper.setProps({ userRole: "OWNER" });
    wrapper = shallow(<NavigationLinks userRole={"OWNER"} />);
    expect(wrapper.find(NavigationLink)).toHaveLength(2);
  });

  it("should render zero <NavigationLink /> elements if user role is EMPLOYEE", () => {
    wrapper = shallow(<NavigationLinks userRole={"EMPLOYEE"} />);
    // wrapper.setProps({ userRole: "EMPLOYEE" });
    expect(wrapper.find(NavigationLink)).toHaveLength(0);
  });

  //   it("should an exact logout button", () => {
  //     wrapper.setProps({ isAuthenticated: true });
  //     expect(
  //       wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
  //     ).toEqual(true);
  //   });
});
