import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearCartProduct } from "../../store/reducers/data/cartDataSlice";

import Button from "../../UI/Button";
import CustomerForm from "../CustomerForm";
import CreditCard from "../CreditCard";
import OrderMap from "../OrderMap";

import bemClassName from "../../utils/bem";

import "./index.scss";

const stepTabs = bemClassName("step-tabs");

const StepTabs = () => {
  const [isEnableNextButton, setIsEnableNextButton] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const dispatch = useDispatch();

  const components = [
    <CustomerForm handleExternal={setIsEnableNextButton} />,
    <CreditCard handleExternal={setIsEnableNextButton} />,
    <OrderMap handleExternal={setIsEnableNextButton} />,
  ];

  const handleClickNext = () => {
    setStepIndex((prev) => prev + 1);
    setIsEnableNextButton(false);
  };

  useEffect(() => {
    if (stepIndex) {
      dispatch(clearCartProduct());
    }
    // eslint-disable-next-line
  }, [stepIndex]);
  return (
    <>
      <div className={stepTabs()}>
        <div className={stepTabs("list")}>
          {components.map((component, i) => {
            return (
              <div
                className={stepTabs("list-item", {
                  active: stepIndex === i,
                  done: stepIndex > i,
                })}
                key={i}
              >
                Шаг {i + 1}
              </div>
            );
          })}
        </div>
        {components.length !== stepIndex ? (
          components.map((component, i) => {
            if (stepIndex === i) {
              return (
                <div key={i} className={stepTabs("content")}>
                  {component}
                  {i + 1 < components.length ? (
                    <Button
                      text="Далее"
                      disabled={!isEnableNextButton}
                      handleExternal={
                        isEnableNextButton ? handleClickNext : undefined
                      }
                    />
                  ) : (
                    <Button
                      text="Заказать"
                      disabled={!isEnableNextButton}
                      handleExternal={
                        isEnableNextButton ? handleClickNext : undefined
                      }
                    />
                  )}
                </div>
              );
            }
          })
        ) : (
          <div className={stepTabs("success")}>
            <p className={stepTabs("success-text")}>
              Ваш заказ успешно оформлен!
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default StepTabs;