import React from "react";

import { connect } from "react-redux";

import StoreState from "../../shared/types/store/StoreState";
import PropsWithChildren from "../../shared/types/props/PropsWithChildren";
import { UserRole } from "../../shared/constants";
import User from "../../shared/types/user/User";

import Aux from "../Auxiliary/Auxiliary";
import Header from "../../components/Header/Header";

import "./AppLayout.scss";

interface AppLayoutProps extends PropsWithChildren<any> {
  user: User | null;
  userRole: keyof typeof UserRole | null;
}

const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const { children, user, userRole } = props;
  return (
    <Aux>
      <Header user={user} userRole={userRole} />
      <main className={"app-layout"}>{children}</main>
    </Aux>
  );
};

const mapStateToProps = (state: StoreState) => {
  return {
    user: state.userStore.user,
    userRole: state.userStore.role,
  };
};

export default connect(mapStateToProps)(AppLayout);
