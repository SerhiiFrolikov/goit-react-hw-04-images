import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Form,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';

export const Searchbar = ({ handleSubmit }) => {
  const [query, setQuery] = useState('');

  const addQueryName = event => {
    setQuery(event.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    handleSubmit(query);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmitForm}>
        <SearchFormBtn type="submit" disabled={!query}>
          <SearchIcon width="30" height="30" />
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          value={query}
          onChange={addQueryName}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </Header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
