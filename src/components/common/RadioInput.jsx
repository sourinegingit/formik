import React from "react";

function RadioInput({ RadioOptions,formik,name ,label}) {
  return (
    <div className="formcontrol">
      {RadioOptions.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="radio"
            value={item.value}
            name={name}
            id={item.value}
            onChange={formik.handleChange}
            checked={formik.values[name] === item.value}
          />
          <label htmlFor={item.value}>{item.label}</label>
        </React.Fragment>
      ))}

      {formik.errors[name] && formik.touched[name] && (
        <div>{formik.errors[name]}</div>
      )}
    </div>
  );
}

export default RadioInput;
