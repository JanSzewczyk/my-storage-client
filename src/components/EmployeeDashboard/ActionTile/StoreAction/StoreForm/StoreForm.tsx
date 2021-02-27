import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import _ from "lodash";

import Button from "../../../../UI/Inputs/Button/Button";
import Select from "../../../../UI/Inputs/Select/Select";
import Input from "../../../../UI/Inputs/Input/Input";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import { FixMeLater } from "../../../../../shared/types/common/FixMeLater";
import Product from "../../../../../shared/types/product/Product";
import Label from "../../../../UI/Inputs/Label";
import ValidationError from "../../../../UI/Inputs/ValidationError";

interface StoreFormProps {
  addItem: (data: FixMeLater) => void;
  products: Product[];
}

const StoreForm: React.FC<StoreFormProps> = React.memo((props) => {
  const { addItem, products } = props;

  const [addNewProduct, setAddNewProduct] = useState<boolean>(false);

  const { register, errors, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = (formData: FixMeLater) => {
    let item = null;

    if (addNewProduct) {
      item = {
        amount: formData.amount,
        newProduct: {
          name: formData.name,
          description: formData.description,
          value: formData.value,
        },
      };
    } else {
      item = formData;
    }

    addItem(item);
    setValue("amount", "");
  };

  return (
    <form>
      {addNewProduct ? (
        <Aux>
          <Label name={"name"}>Product Name</Label>
          <Input
            name={"name"}
            type={"text"}
            ref={register({
              required: true,
              minLength: 3,
            })}
          />
          <ValidationError
            hasError={errors.name}
          >{`Min length is 3.`}</ValidationError>

          <Label name={"description"}>Description</Label>
          <Input
            name={"description"}
            type={"text"}
            placeholder={"Description"}
            ref={register({
              required: true,
              min: 30,
            })}
          />
          <ValidationError
            hasError={errors.description}
          >{`Min length is 30.`}</ValidationError>

          <Label name={"value"}>Product Value</Label>
          <Input
            name={"value"}
            type={"number"}
            placeholder={"Product Value"}
            step={0.01}
            ref={register({
              required: true,
              min: 0,
            })}
          />
          <ValidationError
            hasError={errors.value}
          >{`Min value is 0.`}</ValidationError>

          <Button onClick={() => setAddNewProduct(false)}>back</Button>
        </Aux>
      ) : (
        <Aux>
          <Select
            label={"Select item: "}
            config={{
              name: "productId",
            }}
            refSelect={register({
              required: true,
            })}
            options={products.map((i) => ({
              key: i.name,
              value: i.productId,
            }))}
            hasError={errors.productId}
            errorMessage={"Select required."}
          />
          <Button onClick={() => setAddNewProduct(true)}>
            add new product
          </Button>
        </Aux>
      )}

      <Label name={"amount"}>Amount of items</Label>
      <Input
        name={"amount"}
        type={"number"}
        placeholder={"Amount"}
        step={1}
        ref={register({
          required: true,
          min: 1,
        })}
      />
      <ValidationError
        hasError={errors.amount}
      >{`Min value is 1.`}</ValidationError>
      <Button onClick={handleSubmit(onSubmit)} disabled={products.length === 0}>
        add
      </Button>
    </form>
  );
});

export default StoreForm;
