import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import css from "./Searchbar.module.css"
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types"

export const Searchbar = ({onSubmit}) => {
  const [filter, setFilter] = useState("");
  const changeHandler = e => {
    setFilter(e.currentTarget.value.toLowerCase());
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (filter.trim() === '') {
      toast.warn('PLease enter keyword');
      return;
    }
    onSubmit(filter);
    setFilter("");
  };
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <BiSearchAlt className={css.SearchButtonIcon} />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={filter}
            onChange={changeHandler}
          />
        </form>
      </header>
    );
}
  
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}