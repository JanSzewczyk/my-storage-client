import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

import Aux from "../../../hoc/Auxiliary/Auxiliary";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import Loading from "../../UI/Loading/Loading";
import * as pattern from "../../../shared/patterns";
import Backdrop from "../../UI/Backdrop/Backdrop";
import InboxIcon from "@material-ui/icons/Inbox";

import "./AuthForm.scss";

const AuthForm = (props) => {
  const { onAuthSubmit, loading, error } = props;

  const { register, errors, handleSubmit } = useForm({
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
          <InboxIcon /> MY STORAGE
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
          hasError={errors.email}
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
          hasError={errors.password}
        />
        {error && <div className={"auth-form__error-message"}>{error}</div>}
        <Button
          btnType={"primary"}
          clicked={handleSubmit(onAuthSubmit)}
          btnClass={"auth-form__button"}
        >
          LOGIN
        </Button>
      </form>
    </Aux>
  );
};

AuthForm.propTypes = {
  onAuthSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default AuthForm;
