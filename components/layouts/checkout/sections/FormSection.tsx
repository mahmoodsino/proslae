import React, { useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { useRecoilState } from "recoil";
import {
  CitiesAtom,
  CountriesAtom,
  StatesAtom,
  TokenAtom,
} from "../../../../helpers/recoil";
import Select, { ActionMeta, StylesConfig } from "react-select";
import { CountriesType } from "../../../../helpers/types";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import SimpleInput from "../../../inputs/SimpleInput";
import {
  getCitesOfState,
  getStateOfCountry,
  handelComletePay,
  handelOrderPay,
} from "../../../../helpers/server/services";
import CheckoutBTN from "../../../buttons/CheckoutBTN";
import CircleProgressBar from "../../progress-bar";
import { PaymentProvidorAtom, paymentProvidorIdAtom, publicKeyAtom } from "../../../../helpers/recoil/payment";
import { useRouter } from "next/router";

interface IFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  cityId: string;
  state: string;
  postalCodel: number;
}

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  country: yup.string().required(),
  city: yup.string().nullable(),
  cityId: yup.string().nullable(),
  state: yup.string().nullable(),
  postalCodel: yup.number().required(),
});

const FormSection = () => {
  const [token, setToken] = useRecoilState(TokenAtom);
  const [countryId, setCountryId] = useState<number | undefined>();
  const [payLoading, setPayLoading] = useState(false);
  const [countries, setCountries] = useRecoilState(CountriesAtom);
  const [statesOfCountries, setStateOfCountries] = useRecoilState(StatesAtom);
  const [cities, setCities] = useRecoilState(CitiesAtom);
  const [loading, setLoading] = useState(false);
  const [stateId, setStateId] = useState<number | undefined>();
  const { addToast } = useToasts();
  const [paymentProvidorState, setPaymentProvidorState] =
  useRecoilState(PaymentProvidorAtom);
const [paymentProvidorId, setPaymenProvidorId] = useRecoilState(
  paymentProvidorIdAtom
);
const [publicKey, setPublicKey] = useRecoilState(publicKeyAtom);
const [clientSecret, setClientSecret] = useState<string>();

const router = useRouter().query;


  const cardElementOptions = {
    iconStyle: "solid",
    hidePostalCode: true,
    style: {
      base: {
        fontSize: "16px",
        fontSmoothing: "antialiased",
      },
      invalid: {
        color: "#e5424d",
        ":focus": {
          color: "#303238",
        },
      },
    },
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(checkoutSchema),
  });

  const customStyles: StylesConfig<CountriesType> = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px solid #F8F8F8",
      color: state.isSelected ? "#373737" : "#373737",
    }),
    control: (base) => ({
      ...base,
      "&:hover": { borderColor: "gray" },
      border: "1px solid #CCCCCC",
      boxShadow: "none",
      paddingTop: 3,
      paddingBottom: 4,
    }),
  };

  const stripe = useStripe();
  const elements = useElements();
  const handelPay = async (data: IFormInputs) => {
    let secrit: string = "";
    setPayLoading(true);
    const billingDetails = {
      name: `${data.firstName} ${data.lastName}`,
      email: `${data.email}`,
      address: {
        city: `${data.city}` || `${data.cityId}`,
        state: `${data.state}`,
        postal_code: `${data.postalCodel}`,
        // country:`${data.country}`
      },
    };
    if (router.savedOrder && !router.paymentTransaction) {
      const res = await handelOrderPay(
        token,
        Number(router.savedOrder),
        paymentProvidorId
      );
      if (res === null) {
        addToast("fail", { appearance: "error" });
      } else {
        secrit = res.result.client_result.client_secret;
        setClientSecret(res.result.client_result.client_secret);
      }
    }
    if (router.savedOrder && router.paymentTransaction && paymentProvidorId) {
      const res = await handelComletePay(
        token,
        Number(router.paymentTransaction)
      );
      if (res === null) {
        addToast("fail", { appearance: "error" });
      } else {
        secrit = res.result.client_result.client_secret;
        setClientSecret(res.result.client_result.client_secret);
      }
    }
    if (secrit) {
      const cardElement = elements?.getElement(CardNumberElement);
      const paymentMethodReq = await stripe?.createPaymentMethod({
        type: "card",
        //@ts-ignore
        card: cardElement,
        billing_details: billingDetails,
      });

      const confirmCardPayment = await stripe?.confirmCardPayment(secrit, {
        payment_method: paymentMethodReq?.paymentMethod?.id,
      });
      if (confirmCardPayment?.error) {
        addToast(confirmCardPayment?.error?.message, { appearance: "error" });

      }
      if (confirmCardPayment?.paymentIntent) {
        addToast(confirmCardPayment.paymentIntent.status, {
          appearance: "success",
        });      }
      setPayLoading(false);
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(handelPay)}>
        <SimpleInput hint="John*" name="firstName" register={register} />
        <SimpleInput hint="Smith*" name="lastName" register={register} />
        <SimpleInput
          hint="johnsmith@hotmail.com*"
          name="email"
          register={register}
        />
        <div className="info_sction___">
          <Controller
            name="country"
            control={control}
            render={({ field: { onChange, value, name, ref } }) => {
              const handleSelectChange = async (selectedOption: any) => {
                setLoading(true);
                if (selectedOption?.value !== undefined) {
                  setCountryId(+selectedOption?.value);
                  // setCounName(selectedOption?.label);
                  setStateOfCountries([]);
                  const res = await getStateOfCountry(+selectedOption?.value);
                  let modifiedResponse = res.result;
                  modifiedResponse.map((item: { id: number; name: string }) => {
                    let statesValue = item.id.toString();
                    let StatesLabel = item.name;
                    let newStateStructure = {
                      label: StatesLabel,
                      value: statesValue,
                    };
                    setStateOfCountries((prev) => [...prev, newStateStructure]);
                  });
                }
                setLoading(false);
                console.log(selectedOption?.label);

                onChange(selectedOption?.value);
              };
              return (
                <Select
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary: "gray",
                    },
                  })}
                  className="w-full  "
                  ref={ref}
                  name={name}
                  placeholder={"countries"}
                  options={countries}
                  onChange={handleSelectChange}
                  maxMenuHeight={150}
                  isSearchable={true}
                  styles={customStyles}
                />
              );
            }}
          />

          {typeof countryId === "number" && statesOfCountries.length > 0 ? (
            <div className="">
              <Controller
                name="state"
                control={control}
                render={({ field: { onChange, value, name, ref } }) => {
                  const handleSelectChange = async (selectedOption: any) => {
                    // setStateName(selectedOption?.label);
                    setLoading(true);
                    if (selectedOption?.value !== undefined) {
                      setStateId(+selectedOption.value);
                      setCities([]);
                      const res = await getCitesOfState(+selectedOption.value);
                      let modifiedResponse = res.result;
                      modifiedResponse.map(
                        (item: { id: number; name: string }) => {
                          let cityValue = item.id.toString();
                          let cityLabel = item.name;
                          let newCitiesStructure = {
                            label: cityLabel,
                            value: cityValue,
                          };
                          setCities((prev) => [...prev, newCitiesStructure]);
                        }
                      );
                    }
                    setLoading(false);
                    onChange(selectedOption?.value);
                  };
                  return (
                    <Select
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary: "gray",
                        },
                      })}
                      className="w-full  "
                      ref={ref}
                      name={name}
                      placeholder={"states"}
                      options={statesOfCountries}
                      onChange={handleSelectChange}
                      maxMenuHeight={150}
                      isSearchable={true}
                      styles={customStyles}
                    />
                  );
                }}
              />
            </div>
          ) : typeof countryId === "number" &&
            statesOfCountries.length === 0 ? (
            <div className="">
              <SimpleInput
                hint="City"
                className={""}
                name="city"
                register={register}
              />
            </div>
          ) : null}

          {typeof stateId === "number" && cities.length > 0 ? (
            <div className="">
              <Controller
                name="cityId"
                control={control}
                render={({ field: { onChange, value, name, ref } }) => {
                  const handleSelectChange = async (selectedOption: any) => {
                    onChange(selectedOption?.value);
                  };
                  return (
                    <Select
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary: "gray",
                        },
                      })}
                      className="w-full  "
                      ref={ref}
                      name={name}
                      placeholder="cities"
                      options={cities}
                      onChange={handleSelectChange}
                      isSearchable={true}
                      styles={customStyles}
                    />
                  );
                }}
              />
            </div>
          ) : typeof stateId === "number" && cities.length === 0 ? (
            <div>
              <SimpleInput
                hint="City"
                className={""}
                name="city"
                register={register}
              />
            </div>
          ) : null}

          <SimpleInput
            hint="postal Code"
            className={""}
            name="postalCodel"
            register={register}
          />
        </div>
        <hr className="dashed" />
        <h4>Billing details</h4>
        <div className="info_sction___">
          <div className="">
            <label style={{fontWeight:"600"}} className="text-sm font-medium px-2">Card Number</label>
            <div className="border py-3 px-2 border-[#AEAEAE]">
              <CardNumberElement
                //@ts-ignore
                options={cardElementOptions}
              />
            </div>
          </div>
          <div className="">
            <label style={{fontWeight:"600"}} className="text-sm font-medium px-2">Expiry Date</label>
            <div className="border py-3 px-2 border-[#AEAEAE]">
              <CardExpiryElement />
            </div>
          </div>
          <div className="">
            <label className="text-sm font-medium px-2">CVC Number</label>
            <div className="border py-3 px-2 border-[#AEAEAE]">
              <CardCvcElement />
            </div>
          </div>
        </div>
        <div style={{marginTop:"25px"}}>

          {!payLoading ? 
          <CheckoutBTN title="pay" type="submit" />
         :
         <div style={{display:"flex",justifyContent:"center"}}>
          <CircleProgressBar height={60} />
         </div> 
        }

        </div>

      </form>
    </div>
  );
};

export default FormSection;
