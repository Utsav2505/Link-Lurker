"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "@styles/Search-bar.css";

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push(`/tool?url=${searchValue}`);
  };

  return (
    <form className="search-form" action="/tool" onSubmit={handleSearchSubmit}>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Check..."
          defaultValue={props.defaultUrl}
          className="search-input open-sans-400"
          onChange={handleSearchChange}
        />
      </div>
      <button type="submit" className="search-btn">
        <img src="./search.svg" />
      </button>
    </form>
  );
};

export default SearchBar;
//
