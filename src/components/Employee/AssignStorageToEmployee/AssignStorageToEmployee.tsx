import React, { useEffect } from "react";
import _ from "lodash";
import { useForm } from "react-hook-form";

// import useAxios from "../../../../hooks/useAxios";
import useNotification from "../../../hooks/useNotification";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Inputs/Button";
import Loading from "../../UI/Loading/Loading";
import Select from "../../UI/Inputs/Select";
import axios from "../../../shared/config/axios";
import browserHistory from "../../../shared/config/history";
import { mapEmployeeDtoToEmployee } from "../../../shared/data-utils/employeeUtils";
import {
  createStoragesSelectList,
  mapStorageDtoToStorage,
} from "../../../shared/data-utils/storageUtils";
import Storage from "../../../shared/types/storage/Storage";
import Employee from "../../../shared/types/employee/Employee";
import { useState } from "react";
import { AxiosResponse } from "axios";
import StorageDto from "../../../shared/types/storage/StorageDto";
import { TileBottom, TileContent } from "../../UI/DataDisplay/Tile";

interface AssignStorageToEmployeeForm {
  storageId: string;
}

interface AssignStorageToEmployeeProps {
  employeeId: string;
  storageId?: string;
  onClose: () => void;
  storage: Storage | null;
  onSetEmployee: (employee: Employee) => void;
}

const AssignStorageToEmployee: React.FC<AssignStorageToEmployeeProps> = React.memo(
  (props) => {
    const { employeeId, storageId, onClose, storage, onSetEmployee } = props;

    const notification = useNotification();
    
    const [storages, setStorages] = useState<Storage[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { register, handleSubmit, formState } = useForm<
      AssignStorageToEmployeeForm
    >({
      defaultValues: {
        storageId: storage ? storage.id : "",
      },
      mode: "onSubmit",
    });

    useEffect(() => {
      setLoading(true);
      axios
        .get(`storages/list`)
        .then((res: AxiosResponse<StorageDto[]>) => {
          setStorages(res.data.map(mapStorageDtoToStorage));
        })
        .finally(() => {
          setLoading(false);
        });
    }, []);

    const onChangeWorkplace = (formData: AssignStorageToEmployeeForm) => {
      axios
        .post(`employees/${employeeId}/storage`, {
          storageId: !_.isEmpty(formData.storageId) ? formData.storageId : null,
        })
        .then((res) => {
          const employee = res.data;

          onClose();
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

    const chooseWorkplaceForm = (
      <form>
        <Select
          label={"Choose working place: "}
          config={{
            name: "storageId",
          }}
          refSelect={register}
          options={createStoragesSelectList(storages)}
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
                color={"primary"}
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
  }
);

export default AssignStorageToEmployee;
