import { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

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
        window.location.reload();
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
  const [contractValue, setContractValue] = useState('');
  const [salaryValue, setSalaryValue] = useState(0);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    let data = JSON.stringify({contract:contractValue , salary:salaryValue});
    let url = "http://localhost:8000/generate_social_security/" + idValue
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
      .then(response => {
        window.localtion.reload();
      })
      .catch(error => {
        console.log("Something went wrong");
        console.log(error);
      });
  };

  const handleContractChange = (event) => {
    setContractValue(event.target.value);
  }
  
  const handleIdChange = (event) => {
    setIdValue(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalaryValue(event.target.value);
  };
  

  return (
    <Form onSubmit={handleSubmit}>
       <Form.Label htmlFor="bootstrap-field">Contract:</Form.Label>
      <FormControl
        type="text"
        id="bootstrap-field"
        value={contractValue}
        onChange={handleContractChange}
      />
      <Form.Label htmlFor="bootstrap-field">User ID:</Form.Label>
      <FormControl
        type="text"
        id="bootstrap-field"
        value={idValue}
        onChange={handleIdChange}
      />
      <Form.Label htmlFor="bootstrap-amount">Salary:</Form.Label>
      <FormControl
        type="number"
        id="bootstrap-amount"
        value={salaryValue}
        onChange={handleSalaryChange}
      />
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export { UserTable, SalaryForm};
