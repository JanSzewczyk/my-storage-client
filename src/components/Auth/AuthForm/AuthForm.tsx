import React from "react";
import { useForm } from "react-hook-form";

import AuthData from "../../../shared/types/auth/AuthData";
import * as pattern from "../../../shared/patterns";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Loading from "../../UI/Loading/Loading";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { BoxIcon } from "../../UI/Icons";

import "./AuthForm.scss";

interface AuthFormProps {
  onAuthSubmit: (authData: AuthData) => void;
  loading: boolean;
  error: string | null;
}

const AuthForm: React.FC<AuthFormProps> = React.memo((props) => {
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
        <Input
          inputClass={"auth-form__input"}
          label={"Email"}
          refInput={register({
            required: true,
            pattern: pattern.email,
          })}
          config={{
            placeholder: "Email",
            type: "email",
            name: "email",
          }}
          hasError={Boolean(errors.email)}
        />
        <Input
          inputClass={"auth-form__input"}
          label={"Password"}
          refInput={register({
            required: true,
            minLength: 3,
          })}
          config={{
            placeholder: "Password",
            type: "password",
            name: "password",
          }}
          hasError={Boolean(errors.password)}
        />
        {error && <div className={"auth-form__error-message"}>{error}</div>}
        <Button
          btnType={"primary"}
          onClick={handleSubmit(onAuthSubmit)}
          className={"auth-form__button"}
        >
          LOGIN
        </Button>
      </form>
    </Aux>
  );
});

export default AuthForm;
