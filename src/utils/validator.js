import * as Yup from "yup";

const regEx = {
  phone:
    /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/,
};

export const requiredNumber = Yup.number()
  .required("Enter only Number")
  .max(100, "Invalid Age");
export const number = Yup.number().required("Enter only Number");
export const mobileNumber = Yup.string()
  .required("Mobile number is Required")
  .matches(regEx.phone, "Enter Valid Mobile number");
const validator = {
  requiredNumber,
  regEx,
  mobileNumber,
  number,
};

export default validator;
