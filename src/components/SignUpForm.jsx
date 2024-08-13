import axios, { Axios } from "axios";
import { FastField, useFormik } from "formik";
import { useEffect, useState } from "react";

import * as Yup from "yup";
import Input from "./common/Input";
import RadioInput from "./common/RadioInput";
import SelectOptions from "./common/SelectOptions";
import CheckBoxInput from "./common/CheckBoxInput";

function SignUpForm() {
  //   const [userData, SetUserData] = useState({
  //     name: "",
  //     email: "",
  //     password: "",
  //   });

  //   const formik.handleChange = (e) => {
  //     SetUserData({...userData,[e.target.name]:e.target.value})
  //   };

  //   const submitHandler=(e)=>{
  // e.preventDefault();
  //   }

  // const validate = (values) => {
  //   console.log(values);
  //   let errors = {};
  //   if (!values.name) {
  //     errors.name = "name is required";
  //   }
  //   if (!values.email) {
  //     errors.email = "email is required";
  //   }
  //   if (!values.password) {
  //     errors.password = "password is required";
  //   }
  //   return errors;
  // };

  //  -----------------yup--------------------
  const [formValues, setFormValues] = useState("");

  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConfirmation: "",
    gender: "",
    nationality: "",
    intrests: [],
    terms: false,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("name is required"),
    email: Yup.string()
      .email("invalid email format")
      .required("email is required"),
    phoneNumber: Yup.string()
      .required("phoneNumber is required")
      .matches(/^[0-9]{11}$/, "invalid phonenumber")
      .nullable(),
    password: Yup.string().required("password is required"),
    passwordConfirmation: Yup.string()
      .required("passwor confirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords don't match"),

    gender: Yup.string().required("gender is required"),
    nationality: Yup.string().required("nationality is required"),
    intrests: Yup.array().min(1).required("at least choose one"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  // const onSubmit = (values) => {
  //   console.log(values);
  //   // axios.post("http://localhost:8000/user", values);
  // };
  const formik = useFormik({
    initialValues: formValues || initialValues,
    onSubmit:(values) => {console.log(values)},
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
  });
  // console.log(formik.errors);
  console.log(formik.values);

  useEffect(() => {
    axios
      .get("http://localhost:8000/user/1")
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const RadioOptions = [
    { label: "male", value: "0" },
    { label: "famale", value: "1" },
  ];

  const selectOptions = [
    { label: "select options...", value: "" },
    { label: "iran", value: "IR" },
    { label: "germany", value: "GE" },
    { label: "poland", value: "PO" },
  ];

  const checkInputBox = [
    { label: "react js", value: "react" },
    { label: "vue js", value: "vue" },
    { label: "next js", value: "next" },
  ];

  console.log(formik.values.terms);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Input label="name" type="text" formik={formik} name="name" />
        <Input label="email" type="text" formik={formik} name="email" />
        <Input
          label="phoneNumber"
          type="text"
          formik={formik}
          name="phoneNumber"
        />
        <Input
          label="password"
          type="password"
          formik={formik}
          name="password"
        />
        <Input
          label="confirmPassword"
          type="password"
          formik={formik}
          name="confirmPassword"
        />
        <RadioInput RadioOptions={RadioOptions} formik={formik} name="gender" />
        <SelectOptions
          selectOptions={selectOptions}
          formik={formik}
          name="nationality"
        />
        <CheckBoxInput
          checkInputBox={checkInputBox}
          formik={formik}
          name="intrests"
        />

        <input
          type="checkbox"
          id="terms"
          value={true}
          onChange={formik.handleChange}
          name="terms"
          checked={formik.values.terms}
        />
        <label htmlFor="terms">terms</label>

        {formik.errors.terms && formik.touched.terms && (
          <div>{formik.errors.terms}</div>
        )}
        {/* <div className="form-group">
          <label>Email address</label>
          <input
            type="text"
            className="form-control"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            name="email"
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <div>{formik.errors.email}</div>
          )}
        </div> */}
        {/* radio button */}
        {/* <RadioInput RadioOptions={RadioOptions} formik={formik} name="gender"/> */}
        {/* <div className="form-group">
          <input
            type="radio"
            value="0"
            name="gender"
            id="0"
            onChange={formik.handleChange}
            checked={formik.values.gender === "0"}
          />
          <label htmlFor="0">male</label>
          <input
            type="radio"
            value="1"
            name="gender"
            id="1"
            onChange={formik.handleChange}
            checked={formik.values.gender === "1"}
          />
          <label htmlFor="1">female</label>
        </div> */}
        {/* ---------------------------end redio------------------------------ */}
        {/* <button onClick={() => setFormValues()}>load data</button> */}
        <button type="submit" disabled={!formik.isValid}>
          submit
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
