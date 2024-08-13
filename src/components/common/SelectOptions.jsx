import React from "react";

function SelectOptions({ selectOptions, name, formik }) {
  return (
    <div className="formcontrol">
      <select>
        {selectOptions.map((item) => (
          <option
            key={item.value}
            value={item.value}
            name={name}
            {...formik.getFieldProps(name)}
          >
            {item.label}
          </option>
        ))}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <div>{formik.errors[name]}</div>
      )}
    </div>
  );
}

export default SelectOptions;
