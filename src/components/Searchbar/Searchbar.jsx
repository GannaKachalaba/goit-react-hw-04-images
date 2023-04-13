import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import css from 'components/Searchbar/Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onChangeInput = e => {
    setQuery(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    // const query = query.trim();
    if (query.trim() === '') {
      toast.error('Enter a search term.');
      return;
    }
    onSubmit(query);
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={onSubmitForm}>
        <button className={css.button} type="submit">
          <FaSearch size={12} />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChangeInput}
        />
      </form>
    </header>
  );
};
Searchbar.prototype = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
