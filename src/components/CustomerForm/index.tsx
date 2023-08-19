import { useEffect, useState } from "react";

import { EMAIL, TEL, TEXT } from "../../app_constants";
import { IRequired } from "../../app_interfaces";
import { ICustomerForm } from "./interface";

import AppInput from "../../UI/AppInput";

import bemClassName from "../../utils/bem";

import "./index.scss";

const customerForm = bemClassName("customer-form");

const CustomerForm: React.FC<ICustomerForm> = ({ handleExternal }) => {
  const [customerDataRequired, setCustomerDataRequired] = useState<
    Array<IRequired>
  >([]);

  const handleCustomerDataRequired = (required: IRequired) => {
    setCustomerDataRequired((prev) =>
      prev.some((item) => item.name === required.name)
        ? [...prev].map((item) =>
            item.name === required.name ? required : item
          )
        : [...prev, required]
    );
  };

  useEffect(() => {
    if (customerDataRequired.length > 0) {
      if (!customerDataRequired.some((item) => item.valid === false)) {
        handleExternal(true);
      } else {
        handleExternal(false);
      }
    }
    // eslint-disable-next-line
  }, [customerDataRequired]);

  return (
    <form className={customerForm()}>
      <AppInput
        externalClassName={customerForm("field")}
        name="last-name"
        type={TEXT}
        text="Фамилия *"
        placeholder="Фамилия"
        required
        handleExternalRequired={handleCustomerDataRequired}
      />
      <AppInput
        externalClassName={customerForm("field")}
        name="first-name"
        type={TEXT}
        text="Имя *"
        placeholder="Имя"
        required
        handleExternalRequired={handleCustomerDataRequired}
      />
      <AppInput
        externalClassName={customerForm("field")}
        name="second-name"
        type={TEXT}
        text="Отчество"
        placeholder="Отчество"
      />
      <AppInput
        externalClassName={customerForm("field")}
        name="phone"
        type={TEL}
        placeholder="Номер телефона"
        text="Телефон *"
        required
        handleExternalRequired={handleCustomerDataRequired}
      />
      <AppInput
        externalClassName={customerForm("field")}
        name="email"
        type={EMAIL}
        placeholder="Email"
        text="Электронная почта"
      />
    </form>
  );
};

export default CustomerForm;