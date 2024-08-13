import React from "react";

function CheckBoxInput({ checkInputBox, formik, name }) {
  return (
    <div className="formcontrol">
      {checkInputBox.map((item) => (
        <React.Fragment key={item.value}>
          <input
            type="checkbox"
            id={item.value}
            value={item.value}
            onChange={formik.handleChange}
            name={name}
            checked={formik.values[name].includes(item.value)}
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

export default CheckBoxInput;
