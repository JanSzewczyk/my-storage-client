import React, { useRef, useEffect, useState } from "react";

import "./Search.scss";

interface SearchProps {
  onSearchChanged: (searchString: string) => void;
  searchString: string;
}

const Search: React.FC<SearchProps> = React.memo(
  ({ onSearchChanged, searchString }) => {
    const [value, setValue] = useState<string>(searchString);
    const [lastValue, setLastValue] = useState<string>(searchString);
    const inputRef: any = useRef();

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
  }
);

export default Search;
