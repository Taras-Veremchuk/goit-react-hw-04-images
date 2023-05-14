import PropTypes from 'prop-types';
import { useState } from 'react';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { Header, Form, Btn, Input } from './Searchbar.styled';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmit }) {
  const [value, setValue] = useState('');

  // == Input change ==
  const handleValueChange = event => {
    setValue(event.currentTarget.value.toLowerCase());
  };
  // == Form Submit ==
  const handleSubmit = event => {
    event.preventDefault();
    if (value.trim() === '') {
      toast.error('Please write something');
      return;
    }
    onSubmit(value);
    setValue('');
  };
  // == Return ==
  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Btn type="submit">
          <SearchIcon />
        </Btn>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
          onChange={handleValueChange}
        />
      </Form>
    </Header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
