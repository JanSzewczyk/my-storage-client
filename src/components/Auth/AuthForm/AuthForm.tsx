import React from "react";
import { useForm } from "react-hook-form";

import AuthData from "../../../shared/types/auth/AuthData";
import * as pattern from "../../../shared/patterns";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Input from "../../UI/Inputs/Input/Input";
import Button from "../../UI/Inputs/Button/Button";
import Loading from "../../UI/Loading/Loading";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { BoxIcon } from "../../UI/DataDisplay/Icons";
import Label from "../../UI/Inputs/Label";

import "./AuthForm.scss";

interface AuthFormProps {
  onAuthSubmit: (authData: AuthData) => void;
  loading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = (props) => {
  const { onAuthSubmit, loading, error } = props;

  const { register, errors, handleSubmit } = useForm<AuthData>({
    mode: "onSubmit",
  });

  return (
    <Aux>
      {loading && (
        <Backdrop>
          <Loading />
        </Backdrop>
      )}
      <form className={"auth-form"}>
        <div className={"auth-form__logo"}>
          <BoxIcon /> MY STORAGE
        </div>

        <div className={"field"}>
          <Label name={"email"}>Email</Label>
          <Input
            name={"email"}
            type={"email"}
            placeholder={"Email"}
            ref={register({
              required: true,
              pattern: pattern.email,
            })}
            className={"auth-form__input"}
            fullWidth
            isInvalid={Boolean(errors.email)}
          />
        </div>

        <div className={"field"}>
          <Label name={"password"}>Password</Label>
          <Input
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            ref={register({
              required: true,
              minLength: 3,
            })}
            className={"auth-form__input"}
            fullWidth
            isInvalid={Boolean(errors.password)}
          />
        </div>

        {error && <div className={"auth-form__error-message"}>{error}</div>}
        <Button
          type={"submit"}
          color={"primary"}
          onClick={handleSubmit(onAuthSubmit)}
          className={"auth-form__button"}
        >
          LOGIN
        </Button>
      </form>
    </Aux>
  );
};

export default AuthForm;
