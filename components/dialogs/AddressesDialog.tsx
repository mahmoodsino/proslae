import React, { useEffect, useState } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { X } from "tabler-icons-react";
import SimpleInput from "../inputs/SimpleInput";
import AddAddressBTN from "../buttons/AddAddressBTN";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  CitiesAtom,
  CountriesAtom,
  StatesAtom,
} from "../../helpers/recoil/profile";
import { CountriesType } from "../../helpers/types";
import Select, { ActionMeta, StylesConfig } from "react-select";
import {
  getAddress,
  getCitesOfState,
  getStateOfCountry,
  handelAddAress,
  handelUpdateAddress,
} from "../../helpers/server/services";
import CircleProgressBar from "../layouts/progress-bar";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import * as yup from "yup";
import { AddressAtom, TokenAtom } from "../../helpers/recoil";
import { useToasts } from "react-toast-notifications";
import { AddressType } from "../../helpers/types";

interface Props {
  open: boolean;
  setOpen?: any;
  addresses?: AddressType;
  address?: any;
}

interface IFormInputs {
  addressName: string;
  address: string;
  countries: string;
  cities: string;
  zipPostalCode: number;
  houseBuildingNo: number;
  states: number;
  cityId: number;
}

export const addressBookSchema = yup.object().shape({
  addressName: yup.string().required(),
  address: yup.string().required(),
  countries: yup.string().required(),
  zipPostalCode: yup.number().positive().integer(),
  houseBuildingNo: yup.number().positive().integer(),
  cities: yup.string().nullable(),
  states: yup.string(),
  cityId: yup.string(),
});

const AddressesDialog = ({ address, addresses, open, setOpen }: Props) => {
  console.log({ addresses });

  const [countries, setCountries] = useRecoilState(CountriesAtom);
  const [statesOfCountries, setStateOfCountries] = useRecoilState(StatesAtom);
  const [cities, setCities] = useRecoilState(CitiesAtom);
  const [countryId, setCountryId] = useState<number | undefined>();
  const [stateId, setStateId] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const [counName, setCounName] = useState("");
  const [stateName, setStateName] = useState("");
  const [token, setToken] = useRecoilState(TokenAtom);
  const { addToast } = useToasts();
  const setAddress = useSetRecoilState(AddressAtom);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(addressBookSchema),
  });
  const onSubmitHandler = async (data: any) => {
    console.log(data);

    setLoading(true);
    if (addresses) {
      const res = await handelUpdateAddress(
        addresses.id,
        data.addressName,
        data.address,
        data.countries,
        data.states,
        data.cityId,
        data.cities,
        data.zipPostalCode,
        data.houseBuildingNo,
        token
      );
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        addToast("adderss updated", { appearance: "success" });
      }
    } else {
      const res = await handelAddAress(
        data.addressName,
        data.address,
        data.countries,
        data.states,
        data.cityId,
        data.cities,
        data.zipPostalCode,
        data.houseBuildingNo,
        token
      );
      if (res === null) {
        addToast("Something wrong happened!", { appearance: "error" });
      } else {
        addToast("adderss Added", { appearance: "success" });
      }
    }

    const res = await getAddress(token);
    if (res === null) {
    } else {
      setAddress(res.result);
    }

    setOpen(false);
    setLoading(false);
  };

  useEffect(() => {
    if (addresses) {
      setValue("addressName", addresses.name);
      setValue("address", addresses.address);
      setValue("cities", addresses.city_name);
      setValue("zipPostalCode", addresses.post_code);
      setValue("countries", addresses.country_id);
      setValue("houseBuildingNo", addresses.post_code);
      setValue("cityId", addresses.city_id);
      setValue("states", addresses.state_id);
      setCounName(addresses.country_name);
    }
  }, [addresses]);

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {!loading ? (
          <form
            className="form__address__"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className="flex______">
              <div>
                <SimpleInput
                  hint="name*"
                  name="addressName"
                  register={register}
                />
                <div className="error_">
                  {errors?.addressName && (
                    <div>
                      <img
                        src="/img/error.svg"
                        alt=""
                        width="18px"
                        height="18px"
                        className="mr-1"
                      />

                      {/* <span>{errors?.addressName?.message}</span> */}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <SimpleInput
                  hint="Address*"
                  register={register}
                  name="address"
                />
                <div className="error_">
                  {errors?.address && (
                    <div>
                      <img
                        src="/img/error.svg"
                        alt=""
                        width="18px"
                        height="18px"
                        className="mr-1"
                      />
                      {/* <span>{errors?.address?.message}</span> */}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex______">
              <Controller
                name="countries"
                control={control}
                render={({ field: { onChange, value, name, ref } }) => {
                  const handleSelectChange = async (selectedOption: any) => {
                    setLoading(true);
                    if (selectedOption?.value !== undefined) {
                      setCountryId(+selectedOption?.value);
                      setCounName(selectedOption?.label);
                      setStateOfCountries([]);
                      const res = await getStateOfCountry(
                        +selectedOption?.value
                      );
                      let modifiedResponse = res.result;
                      modifiedResponse.map(
                        (item: { id: number; name: string }) => {
                          let statesValue = item.id.toString();
                          let StatesLabel = item.name;
                          let newStateStructure = {
                            label: StatesLabel,
                            value: statesValue,
                          };
                          setStateOfCountries((prev) => [
                            ...prev,
                            newStateStructure,
                          ]);
                        }
                      );
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
                      placeholder={counName ? counName : "countries"}
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
                    name="states"
                    control={control}
                    render={({ field: { onChange, value, name, ref } }) => {
                      const handleSelectChange = async (
                        selectedOption: any
                      ) => {
                        setStateName(selectedOption?.label);
                        setLoading(true);
                        if (selectedOption?.value !== undefined) {
                          setStateId(+selectedOption.value);
                          setCities([]);
                          const res = await getCitesOfState(
                            +selectedOption.value
                          );
                          let modifiedResponse = res.result;
                          modifiedResponse.map(
                            (item: { id: number; name: string }) => {
                              let cityValue = item.id.toString();
                              let cityLabel = item.name;
                              let newCitiesStructure = {
                                label: cityLabel,
                                value: cityValue,
                              };
                              setCities((prev) => [
                                ...prev,
                                newCitiesStructure,
                              ]);
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
                          placeholder={stateName ? stateName : "states"}
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
                    name="cities"
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
                      const handleSelectChange = async (
                        selectedOption: any
                      ) => {
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
                    name="cities"
                    register={register}
                  />
                </div>
              ) : null}
              <SimpleInput
                hint="House/Building.."
                className={""}
                name="houseBuildingNo"
                register={register}
              />
              <SimpleInput
                hint="Zip"
                className={""}
                name="zipPostalCode"
                register={register}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <AddAddressBTN
                title={address ? "Edit" : "Add New Address"}
                className={""}
                type="submit"
              />
            </div>
          </form>
        ) : (
          <div style={{display:"flex", justifyContent:"center"}}>
          <CircleProgressBar height={60} />
        </div>
        )}
      </Modal>
    </div>
  );
};

export default AddressesDialog;
