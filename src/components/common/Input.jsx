const Input = ({ name, formik, type = "text", label }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        className="form-control"
        // value={formik.values.email}
        // onBlur={formik.handleBlur}
        // onChange={formik.handleChange}
        {...formik.getFieldProps(name)}
        name={name}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div>{formik.errors[name]}</div>
      )}
    </div>
  );
};
export default Input;
