import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

const Search = React.memo(({ onSearchChanged, searchString }) => {
  const [value, setValue] = useState(searchString);
  const [lastValue, setLastValue] = useState(searchString);
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value === inputRef.current.value && value !== lastValue) {
        if (value.length !== 1) {
          onSearchChanged(value);
          setLastValue(value);
        }
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [lastValue, onSearchChanged, value]);

  return (
    <div className={"search"}>
      <label className={"search__label"}>Search: </label>
      <input
        ref={inputRef}
        type={"search"}
        placeholder={"Search..."}
        className={"search__input"}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
});

Search.propTypes = {
  onSearchChanged: PropTypes.func.isRequired,
  searchString: PropTypes.string.isRequired,
};

export default Search;
