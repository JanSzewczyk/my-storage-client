import React from "react";
import PropTypes from "prop-types";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import AppBar from "../../../components/UI/AppBar";
import AppContent from "../../../components/UI/AppContent";
import Breadcrumbs from "../../../components/UI/Breadcrumbs/Breadcrumbs";
import BreadcrumbItem from "../../../components/UI/Breadcrumbs/BreadcrumbItem/BreadcrumbItem";

const StorageEmployee = (props) => {
  const { match } = props;

  const employeeId = match.params.employeeId;
  const storageId = match.params.storageId;

  const breadcrumbs = (
    <Breadcrumbs>
      <BreadcrumbItem text={"Storages"} path={`/storages`} />
      <BreadcrumbItem text={"Storage"} path={`/storages/${storageId}`} />
      <BreadcrumbItem
        text={"Employee"}
        path={`/storages/${storageId}/employee/${employeeId}`}
        active
      />
    </Breadcrumbs>
  );

  return (
    <Aux>
      <AppBar left={breadcrumbs} />
      <AppContent>StorageEmployee</AppContent>
    </Aux>
  );
};

StorageEmployee.propTypes = {};

export default StorageEmployee;
