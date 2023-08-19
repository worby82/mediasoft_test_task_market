import { useState, useEffect } from "react";

import { CARDCVV, CARDHOLDER, CARDMONTH, CARDNUMBER, CARDYEAR, mountArray, yearArray } from "../../app_constants";
import { CreditCardTypes } from "../../app_types";
import { IRequired } from "../../app_interfaces";
import { ICreditCard } from "./interface";

import cardMask from "../../utils/cardMask";
import bemClassName from "../../utils/bem";

import cardImage from "../../assets/images/credit-card-background.jpg";
import "./index.scss";

const creditCard = bemClassName("credit-card");

const CreditCard: React.FC<ICreditCard> = ({handleExternal}) => {
  const [cardNumber, setCardNumber] = useState<string | null>(null);
  const [cardHolder, setCardHolder] = useState<string | null>(null);
  const [cardMonth, setCardMonth] = useState<string | null>(null);
  const [cardYear, setCardYear] = useState<string | null>(null);
  const [cardCvv, setCardCvv] = useState<string | null>(null);
  const [isFlip, setIsFlip] = useState<boolean>(false);
  const [cardDataRequired, setCardDataRequired] = useState<Array<IRequired>>([]);

  const getErrorText = (name: CreditCardTypes) => {
    if(cardDataRequired.some(item => item.name === name) && !cardDataRequired.find(item => item.name === name)!.valid) {
      return <p className={creditCard('error-text')}>Обязательное поле</p>
    }
  }

  const handleCardDataRequired = (required: IRequired) => {
    setCardDataRequired((prev) =>
      prev.some((item) => item.name === required.name)
        ? [...prev].map((item) =>
            item.name === required.name ? required : item
          )
        : [...prev, required]
    );
  };
  
  const handleInputCard = (event: React.FormEvent<HTMLInputElement>, type: string) => {
    switch (type) {
      case CARDNUMBER:
        const value = event.currentTarget.value
        .replace(/\s/g, "")
        .replace(/[^0-9]/, "");
        if (value !== "") {
          setCardNumber(value.replace(/(\d{4})/g, "$1 ").trim());
        } else {
          setCardNumber(null);
        }
        break;
      case CARDHOLDER:
        setCardHolder(
          event.currentTarget.value !== ""
          ? event.currentTarget.value
          : null
          )
          break;
      case CARDCVV:
        setCardCvv(
          event.currentTarget.value !== ""
          ? event.currentTarget.value.replace(/[^0-9]/, "")
          : null
          )
          break;
        }
  };
  
  const handleChangeCard = (event: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    switch (type) {
      case CARDMONTH:
        setCardMonth(event.target.value)
        break;
        case CARDYEAR:
          setCardYear(event.target.value.slice(2))
          break;
        }
      };
      
  useEffect(()=>{
    if(cardNumber !== null) {
      handleCardDataRequired({name: CARDNUMBER, valid: cardNumber.length === 19 ? true : false})
    }
  },[cardNumber])
  
  useEffect(()=>{
    if(cardHolder !== null) {
      handleCardDataRequired({name: CARDHOLDER, valid: cardHolder === null || cardHolder.length > 0 ? true : false})
    }
  },[cardHolder])
  
  useEffect(()=>{
    if(cardMonth !== null) {
      handleCardDataRequired({name: CARDMONTH, valid: cardMonth === null || cardMonth.length === 2 ? true : false})
    }
  },[cardMonth])

  useEffect(()=>{
    if(cardYear !== null) {
      handleCardDataRequired({name: CARDYEAR, valid: cardYear === null || cardYear.length === 2 ? true : false})
    }
  },[cardYear])

  useEffect(()=>{
    if(cardCvv !== null) {
      handleCardDataRequired({name: CARDCVV, valid: cardCvv === null || cardCvv.length === 3 ? true : false})
    }
  },[cardCvv])
  
  useEffect(() => {
    if (cardDataRequired.length > 0) {
      if (!cardDataRequired.some((item) => item.valid === false) && cardDataRequired.length === 5) {
        console.log(cardDataRequired);
        
        handleExternal(true);
      } else {
        handleExternal(false);
      }
    }
    // eslint-disable-next-line
  }, [cardDataRequired]);
  
  return (
    <>
      <div className={creditCard()}>
        <div className={creditCard("flipper", { flip: isFlip })}>
          <div className={creditCard("side", { front: true })}>
            <img className={creditCard("image")} src={cardImage} alt=""/>
            <div className={creditCard("inner")}>
              <p className={creditCard('number')}>{cardMask("#### #### #### ####", cardNumber ?? "")}</p>
              <div className={creditCard('content')}>
                <p className={creditCard('card-text')}>
                  <span className={creditCard('card-title')}>Card Holder</span>
                  {cardHolder ?? "Full Name"}
                </p>
                <p className={creditCard('card-text')}>
                  <span className={creditCard('card-title')}>Expires</span>
                  {cardMonth ?? "MM"}/{cardYear ?? "YY"}
                </p>
              </div>
            </div>
          </div>
          <div className={creditCard("side", { back: true })}>
            <img
              className={creditCard("image", { back: true })}
              src={cardImage}
              alt=""
            />
            <div className={creditCard("inner")}>
              <div className={creditCard('band')}></div>
              <div className={creditCard('cvv')}>
                <p className={creditCard('cvv-title')}>CVV</p>
                <p className={creditCard('cvv-band')}>{cardCvv ?? ""}</p>
              </div>
            </div>
          </div>
        </div>
        <div className={creditCard('form')}>
          <label className={creditCard('label')}>
            <p className={creditCard('label-title')}>Номер карты</p>
            <input
              type="text"
              value={cardNumber ? cardNumber : ""}
              maxLength={19}
              className={creditCard('input')}
              onInput={(event) => handleInputCard(event, CARDNUMBER)}
            />
            { getErrorText(CARDNUMBER) }
          </label>
          <label className={creditCard('label')}>
            <p className={creditCard('label-title')}>Держатель карты</p>
            <input
              type="text"
              value={cardHolder ? cardHolder : ""}
              className={creditCard('input')}
              onInput={(event) => handleInputCard(event, CARDHOLDER)}
            />
            { getErrorText(CARDHOLDER) }
          </label>
          <div className={creditCard('group')}>
            <label className={creditCard('label',{expires: true})}>
              <p className={creditCard('label-title')}>Срок хранения</p>
              <div className={creditCard('expires')}>
                <div className={creditCard('expires-item')}>
                  <select defaultValue={"Month"}
                    className={creditCard('select')}
                    onChange={(event) => handleChangeCard(event, CARDMONTH)}
                  >
                    <option disabled>
                      Month
                    </option>
                    {mountArray.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  { getErrorText(CARDMONTH) }
                </div>
                <div className={creditCard('expires-item')}>
                  <select defaultValue={"Year"}
                    className={creditCard('select')}
                    onChange={(event) => handleChangeCard(event, CARDYEAR)}
                  >
                    <option disabled>
                      Year
                    </option>
                    {yearArray.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  { getErrorText(CARDYEAR) }
                </div>
              </div>
            </label>
            <label className={creditCard('label',{cvv: true})}>
              <p className={creditCard('label-title')}>CVV</p>
              <input
                type="text"
                maxLength={3}
                value={cardCvv ? cardCvv : ""}
                className={creditCard('input')}
                onFocus={() => setIsFlip(true)}
                onBlur={() => setIsFlip(false)}
                onInput={(event) => handleInputCard(event, CARDCVV)}
              />
              { getErrorText(CARDCVV) }
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditCard;