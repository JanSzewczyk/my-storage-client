import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import _ from "lodash";

import Button from "../../../../UI/Inputs/Button/Button";
import Select from "../../../../UI/Inputs/Select/Select";
import Input from "../../../../UI/Inputs/Input/Input";
import Aux from "../../../../../hoc/Auxiliary/Auxiliary";
import { FixMeLater } from "../../../../../shared/types/common/FixMeLater";
import Product from "../../../../../shared/types/product/Product";

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
          <Input
            label={"Product Name: "}
            config={{
              placeholder: "Product Name",
              type: "text",
              name: "name",
            }}
            refInput={register({
              required: true,
              minLength: 3,
            })}
            hasError={errors.name}
            errorMessage={`Min length is 3.`}
          />
          <Input
            label={"Description: "}
            config={{
              placeholder: "Description",
              type: "text",
              name: "description",
            }}
            refInput={register({
              required: true,
              min: 30,
            })}
            hasError={errors.description}
            errorMessage={`Min length is 30.`}
          />
          <Input
            label={"Product Value: "}
            config={{
              placeholder: "Product Value",
              type: "number",
              // step: 0.01,  // TODO FIX this
              name: "value",
            }}
            refInput={register({
              required: true,
              min: 0,
            })}
            hasError={errors.value}
            errorMessage={`Min value is 0.`}
          />
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
        })}
        hasError={errors.amount}
        errorMessage={`Min value is 1.`}
      />
      <Button onClick={handleSubmit(onSubmit)} disabled={products.length === 0}>
        add
      </Button>
    </form>
  );
});

export default StoreForm;
