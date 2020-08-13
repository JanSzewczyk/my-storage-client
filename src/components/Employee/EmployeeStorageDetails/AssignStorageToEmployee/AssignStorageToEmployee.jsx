import React, { useEffect } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { useAxios, useNotification } from "../../../../hooks";
import { useForm } from "react-hook-form";

import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import { TileContent, TileBottom } from "../../../UI/Tile";
import Button from "../../../UI/Button";
import Loading from "../../../UI/Loading/Loading";
import Select from "../../../UI/Select";
import axios from "../../../../shared/config/axios";
import browserHistory from "../../../../shared/config/history";
import { mapEmployeeDtoToEmployee } from "../../../../shared/dataUtils/employeeUtils";

const AssignStorageToEmployee = React.memo((props) => {
  const { employeeId, storageId, onClose, storage, onSetEmployee } = props;

  const notification = useNotification();
  const [getStorages, { response, loading }] = useAxios({
    url: "storages",
    storyState: { response: [], error: null, loading: true },
  });

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      storageId: storage ? storage.id : null,
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    getStorages();
  }, [getStorages]);

  const onChangeWorkplace = (formData) => {
    axios
      .post(`employees/${employeeId}/storage`, {
        storageId: !_.isEmpty(formData.storageId) ? formData.storageId : null,
      })
      .then((res) => {
        onClose();
        const employee = res.data;
        notification.add({
          content: `Employee id=${employee.id} changed the workplace`,
          type: "success",
        });

        if (storageId) {
          if (employee.workPlace) {
            onSetEmployee(mapEmployeeDtoToEmployee(employee));
            browserHistory.replace(
              `/storages/${employee.workPlace.id}/employee/${employee.id}`
            );
          } else {
            browserHistory.replace(`/employees/${employee.id}`);
          }
        } else {
          onSetEmployee(mapEmployeeDtoToEmployee(employee));
        }
      });
  };

  const getStoragesList = () => {
    const sl = response.map((i) => ({
      key: i.name,
      value: i.id,
    }));

    return [{ key: "None", value: "" }, ...sl];
  };

  const chooseWorkplaceForm = (
    <form>
      <Select
        label={"Choose working place: "}
        config={{
          name: "storageId",
        }}
        refSelect={register}
        options={getStoragesList()}
      />
    </form>
  );

  return (
    <Aux>
      <TileContent>{loading ? <Loading /> : chooseWorkplaceForm}</TileContent>
      <TileBottom
        right={
          <Aux>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              btnType={"primary"}
              onClick={handleSubmit(onChangeWorkplace)}
              disabled={loading || !formState.isDirty}
            >
              Save
            </Button>
          </Aux>
        }
      />
    </Aux>
  );
});

AssignStorageToEmployee.propTypes = {
  employeeId: PropTypes.string.isRequired,
  storageId: PropTypes.string,
  storage: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSetEmployee: PropTypes.func.isRequired,
};

export default AssignStorageToEmployee;
