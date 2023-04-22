import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function UserTable() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = JSON.stringify({name:name, surname:surname, id_number:id});
    fetch('http://localhost:8000/person/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
      .then(response => {
        console.log("Success");
      })
      .catch(error => {
        console.log("Something went wrong");
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicSurname">
        <Form.Label>Surname</Form.Label>
        <Form.Control type="text" placeholder="Enter surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicID">
        <Form.Label>ID</Form.Label>
        <Form.Control type="number" placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function SalaryForm() {
  const [idValue, setIdValue] = useState('');
  const [salaryValue, setSalaryValue] = useState(0);

  const handleSubmit = (event) => {
    e.preventDefault();
    let data = JSON.stringify({id:idValue, s});
    fetch('http://localhost:8000/person/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
      .then(response => {
        console.log("Success");
      })
      .catch(error => {
        console.log("Something went wrong");
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmountValue(event.target.value);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Label htmlFor="bootstrap-field">User ID:</Form.Label>
      <FormControl
        type="text"
        id="bootstrap-field"
        value={idValue}
        onChange={handleInputChange}
      />
      <Form.Label htmlFor="bootstrap-amount">Salary:</Form.Label>
      <FormControl
        type="number"
        id="bootstrap-amount"
        value={amountValue}
        onChange={handleAmountChange}
      />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
export default UserTable;
