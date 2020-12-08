import React from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";

import Button from "../../../../UI/Inputs/Button/Button";
import Select from "../../../../UI/Inputs/Select/Select";
import Input from "../../../../UI/Inputs/Input/Input";
import { FixMeLater } from "../../../../../shared/types/common/FixMeLater";
import Item from "../../../../../shared/types/item/Item";

interface RemoveFormProps {
  addItem: (data: FixMeLater) => void;
  items: Item[];
}

const RemoveForm: React.FC<RemoveFormProps> = (props) => {
  const { addItem, items } = props;

  const { register, errors, handleSubmit, watch, setValue } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (formData: FixMeLater) => {
    addItem(formData);
    setValue("amount", null);
  };

  const setMaxAmount = () => {
    let v = _.find(items, (o) => watch("productId") === o.productId);
    return v ? v.amount : 0;
  };

  return (
    <form>
      <Select
        label={"Select item: "}
        config={{
          name: "productId",
        }}
        refSelect={register({
          required: true,
        })}
        options={items.map((i) => ({
          key: i.productName,
          value: i.productId,
        }))}
        hasError={errors.productId}
        errorMessage={"Select required."}
      />
      <Input
        label={"Amount of items: "}
        config={{
          placeholder: "Amount",
          type: "number",
          name: "amount",
        }}
        refInput={register({
          required: true,
          min: 1,
          max: setMaxAmount(),
        })}
        hasError={errors.amount}
        errorMessage={`Amount value from 1 to ${setMaxAmount()}.`}
      />
      <Button onClick={handleSubmit(onSubmit)} disabled={items.length === 0}>
        add
      </Button>
    </form>
  );
};

export default RemoveForm;
