import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import _ from "lodash";

import Button from "../../../../UI/Button/Button";
import Select from "../../../../UI/Select/Select";
import Input from "../../../../UI/Input/Input";

const RemoveForm = (props) => {
  const { addItem, items } = props;

  const { register, errors, handleSubmit, watch, setValue } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (formData) => {
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

RemoveForm.propTypes = {
  addItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
};

export default RemoveForm;
