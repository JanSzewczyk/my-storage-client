import React, { useRef, useEffect, useState } from "react";

import Input from "../Input";
import { SearchIcon } from "../../DataDisplay/Icons";

import "./Search.scss";

interface SearchProps {
  onSearchChanged: (searchString: string) => void;
  searchString: string;
}

const Search: React.FC<SearchProps> = ({ onSearchChanged, searchString }) => {
  const [value, setValue] = useState<string>(searchString);
  const [lastValue, setLastValue] = useState<string>(searchString);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        inputRef.current &&
        value === inputRef.current.value &&
        value !== lastValue
      ) {
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
      <Input
        name={"search"}
        ref={inputRef}
        type={"text"}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        iconInside={<SearchIcon />}
      />
    </div>
  );
};

export default Search;
