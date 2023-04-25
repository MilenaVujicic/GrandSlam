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
    let url = "http://localhost:8000/generate_social_security/" + idValue + "/"
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
      .then(response => {
        window.location.reload();
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

function LoanForm() {
  const [idValue, setIdValue] = useState('');
  const [loanValue, setLoanValue] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = "http://localhost:8000/loan/" + idValue + "/" + loanValue + "/";
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
      })
      .then(response => {
        console.log("Success");
        window.location.reload();
      })
      .catch(error => {
        console.log("Something went wrong");
      });

  }

  const handleIdChange = (event) => {
    setIdValue(event.target.value);
  }

  const handleLoanChange = (event) => {
    setLoanValue(event.target.value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="input">
        <Form.Label>User ID:</Form.Label>
        <Form.Control 
          type="text" 
          value={idValue} 
          onChange={handleIdChange} 
        />
      </Form.Group>
      <Form.Group controlId="value">
        <Form.Label>Loan:</Form.Label>
        <Form.Control 
          type="number" 
          value={loanValue} 
          onChange={handleLoanChange} 
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function SellForm() {
  const [idValue, setIdValue] = useState('');
  const [sellValue, setSellValue] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = "http://localhost:8000/sell/" + idValue + "/" + sellValue + "/";
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: null
      })
      .then(response => {
        console.log("Success");
        window.location.reload();
      })
      .catch(error => {
        console.log("Something went wrong");
      });

  }

  const handleIdChange = (event) => {
    setIdValue(event.target.value);
  }

  const handleValueChange = (event) => {
    setSellValue(event.target.value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="input">
        <Form.Label>User ID:</Form.Label>
        <Form.Control 
          type="text" 
          value={idValue} 
          onChange={handleIdChange} 
        />
      </Form.Group>
      <Form.Group controlId="value">
        <Form.Label>Value:</Form.Label>
        <Form.Control 
          type="number" 
          value={sellValue} 
          onChange={handleValueChange} 
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Sell
      </Button>
    </Form>
  );
}


function BuyForm() {
  const [idValue, setIdValue] = useState('');
  const [buyValue, setBuyValue] = useState(0);
  const [typeValue, setTypeValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = "http://localhost:8000/buy/" + idValue + "/" + buyValue + "/" + typeValue + "/";
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: "{}"
      })
      .then(response => {
        console.log("Success");
        window.location.reload();
      })
      .catch(error => {
        console.log("Something went wrong");
      });

  }

  const handleIdChange = (event) => {
    setIdValue(event.target.value);
  }

  const handleValueChange = (event) => {
    setBuyValue(event.target.value);
  }

  const handleTypeChange = (event) =>{
    setTypeValue(event.target.value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="input">
        <Form.Label>User ID:</Form.Label>
        <Form.Control 
          type="text" 
          value={idValue} 
          onChange={handleIdChange} 
        />
      </Form.Group>
      <Form.Group controlId="value">
        <Form.Label>Value:</Form.Label>
        <Form.Control 
          type="number" 
          value={buyValue} 
          onChange={handleValueChange} 
        />
      </Form.Group>
      <Form.Group controlId="type">
        <Form.Label>Type:</Form.Label>
        <Form.Control 
          type="text" 
          value={typeValue} 
          onChange={handleTypeChange} 
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Buy
      </Button>
    </Form>
  );
}


export { UserTable, SalaryForm, LoanForm, SellForm, BuyForm};
