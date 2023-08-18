import { useState, useEffect } from "react";

import cardMask from "../../utils/cardMask";
import { IRequired } from "../../app_interfaces";

import bemClassName from "../../utils/bem";

import "./index.scss";
import cardImage from "../../assets/images/credit-card-background.jpg";

const creditCard = bemClassName("credit-card");

const CreditCard = ({handleExternal}:{handleExternal: any}) => {
  const [cardNumber, setCardNumber] = useState<string | null>(null);
  const [cardHolder, setCardHolder] = useState<string | null>(null);
  const [cardMonth, setCardMonth] = useState<string | null>(null);
  const [cardYear, setCardYear] = useState<string | null>(null);
  const [cardCvv, setCardCvv] = useState<string | null>(null);
  const [isFlip, setIsFlip] = useState<boolean>(false);
  const [cardDataRequired, setCardDataRequired] = useState<Array<IRequired>>([]);
  
  const mountArray = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
  const yearArray = ["2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2032", "2033", "2034"]

  const getErrorText = (name: string) => {
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
      case 'card-number':
        const value = event.currentTarget.value
        .replace(/\s/g, "")
        .replace(/[^0-9]/, "");
        if (value !== "") {
          setCardNumber(value.replace(/(\d{4})/g, "$1 ").trim());
        } else {
          setCardNumber(null);
        }
        break;
        case 'card-holder':
          setCardHolder(
            event.currentTarget.value !== ""
            ? event.currentTarget.value
            : null
            )
            break;
            case 'card-cvv':
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
      case 'card-month':
        setCardMonth(event.target.value)
        break;
        case 'card-year':
          setCardYear(event.target.value.slice(2))
          break;
        }
      };
      
  useEffect(()=>{
    if(cardNumber !== null) {
      handleCardDataRequired({name: 'card-number', valid: cardNumber.length === 19 ? true : false})
    }
  },[cardNumber])
  
  useEffect(()=>{
    if(cardHolder !== null) {
      handleCardDataRequired({name: 'card-holder', valid: cardHolder === null || cardHolder.length > 0 ? true : false})
    }
  },[cardHolder])
  
  useEffect(()=>{
    if(cardMonth !== null) {
      handleCardDataRequired({name: 'card-month', valid: cardMonth === null || cardMonth.length === 2 ? true : false})
    }
  },[cardMonth])

  useEffect(()=>{
    if(cardYear !== null) {
      handleCardDataRequired({name: 'card-year', valid: cardYear === null || cardYear.length === 2 ? true : false})
    }
  },[cardYear])

  useEffect(()=>{
    if(cardCvv !== null) {
      handleCardDataRequired({name: 'card-cvv', valid: cardCvv === null || cardCvv.length === 3 ? true : false})
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
  }, [cardDataRequired]);
  
  return (
    <>
      <div className={creditCard()}>
        <div className={creditCard("flipper", { flip: isFlip })}>
          <div className={creditCard("side", { front: true })}>
            <img className={creditCard("image")} src={cardImage} />
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
              onInput={(event) => handleInputCard(event, 'card-number')}
            />
            { getErrorText('card-number') }
          </label>
          <label className={creditCard('label')}>
            <p className={creditCard('label-title')}>Держатель карты</p>
            <input
              type="text"
              value={cardHolder ? cardHolder : ""}
              className={creditCard('input')}
              onInput={(event) => handleInputCard(event, 'card-holder')}
            />
            { getErrorText('card-holder') }
          </label>
          <div className={creditCard('group')}>
            <label className={creditCard('label',{expires: true})}>
              <p className={creditCard('label-title')}>Срок хранения</p>
              <div className={creditCard('expires')}>
                <div className={creditCard('expires-item')}>
                  <select
                    className={creditCard('select')}
                    onChange={(event) => handleChangeCard(event, 'card-month')}
                  >
                    <option defaultValue={""} disabled>
                      Month
                    </option>
                    {mountArray.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  { getErrorText('card-month') }
                </div>
                <div className={creditCard('expires-item')}>
                  <select
                    className={creditCard('select')}
                    onChange={(event) => handleChangeCard(event, 'card-year')}
                  >
                    <option defaultValue={""} disabled>
                      Year
                    </option>
                    {yearArray.map((item, i) => (
                      <option key={i} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  { getErrorText('card-year') }
                </div>
              </div>
            </label>
            <label className={creditCard('label',{cvv: true})}>
              <p className={creditCard('label-title')}>CVV</p>
              <input
                type="text"
                maxLength={3}
                className={creditCard('input')}
                onFocus={() => setIsFlip(true)}
                onBlur={() => setIsFlip(false)}
                onInput={(event) => handleInputCard(event, 'card-cvv')}
              />
              { getErrorText('card-cvv') }
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreditCard;