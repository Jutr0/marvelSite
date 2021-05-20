import React, { useState } from "react";

const useDropdown = (
  label: string,
  defaultState: string,
  options: string[]
):[string, Function, React.Dispatch<React.SetStateAction<string>>] => {
  const [state, updateState] = useState<string>(defaultState);
  const id: string = `use-dropdown-${label.replace(" ", "").toLowerCase()}`;
  const Dropdown = ():JSX.Element => (
    <label htmlFor={id} id={id + "-label"}>
      {label}
      <select
        id={id}
        value={state}
        onChange={(e) => updateState(e.target.value)}
        onBlur={(e) => updateState(e.target.value)}
        disabled={!options.length}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
  return [state, Dropdown, updateState ];
};

export default useDropdown;
