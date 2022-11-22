import * as yup from "yup";

// export const addressBookSchema = yup.object().shape({
//   addressName: yup.string().required(),
//   address: yup.string().required(),
//   countries: yup.string().required(),
//   zipPostalCode: yup.number().positive().integer(),
//   houseBuildingNo: yup.number().positive().integer(),
//   cities: yup.string().nullable(),
//   states:yup.string(),
//   cityId:yup.string()
// })


export const addressBookSchema = yup.object().shape({
  addressName: yup.string().required(),
  address: yup.string().required(),
  // countries: yup.string().required(),
  // zipPostalCode: yup.number().positive().integer(),
  // houseBuildingNo: yup.number().positive().integer(),
  // cities: yup.string().nullable(),
  // states:yup.string(),
  // cityId:yup.string()
})