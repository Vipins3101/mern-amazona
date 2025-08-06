import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';

export default function SearchBox() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search?query=${query}` : '/search');
  };

  // Assuming `query` is defined in the component's state or props

  return (
    <Form className="d-flex me-auto" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          value={query} // <-- add this
          type="text"
          name="q"
          id="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          aria-label="Search products"
          aria-describedby="button-search"
        ></FormControl>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
}
