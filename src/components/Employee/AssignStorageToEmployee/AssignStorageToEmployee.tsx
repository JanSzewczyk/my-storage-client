import React, { useEffect, useState } from "react";
import _ from "lodash";
import { useForm } from "react-hook-form";
import { AxiosResponse } from "axios";

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

import StorageDto from "../../../shared/types/storage/StorageDto";
import { TileBottom, TileContent } from "../../UI/DataDisplay/Tile";
import { Employee, EmployeeDto } from "../../../shared/types/employee";

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

const AssignStorageToEmployee: React.FC<AssignStorageToEmployeeProps> = ({
  employeeId,
  storageId,
  onClose,
  storage,
  onSetEmployee,
}) => {
  const notification = useNotification();
  const {
    register,
    handleSubmit,
    formState,
  } = useForm<AssignStorageToEmployeeForm>({
    defaultValues: {
      storageId: storage ? storage.id : "",
    },
    mode: "onSubmit",
  });

  const [storages, setStorages] = useState<Storage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      .then((res: AxiosResponse<EmployeeDto>) => {
        const employee = mapEmployeeDtoToEmployee(res.data);

        notification.add({
          content: `Employee id=${employee.id} changed the workplace`,
          type: "success",
        });

        if (storageId) {
          if (employee.workPlace) {
            browserHistory.push(
              `/storages/${employee.workPlace.id}/employee/${employee.id}`
            );
          } else {
            browserHistory.replace(`/employees/${employee.id}`);
          }
        } 
        
        // TODO Change to getEmployee #CACHE
        onSetEmployee(employee);
        onClose();
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
};

export default AssignStorageToEmployee;
