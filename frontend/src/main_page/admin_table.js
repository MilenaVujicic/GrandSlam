import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
const DataTable = ({ data }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('http://localhost:8000/persons');
          const json = await response.json();

          for(let j of json){
          j.status = "Good Standing";
          if (j.balance < 0 && j.balance > -100000){
            j.status = "Yellow Alarm";
          }
          if (j.balance < -100000 && j.balance > -700000){
            j.status = "Orange Alarm";
          }
          if(j.balance < -700000){
            j.status = "Red Alarm";
          }
        }
          console.log(json);

          setUsers(json);
        };
    
        fetchData();
      }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>ID</th>
          <th>Balance</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.surname}</td>
            <td>{user.id_number}</td>
            <td>{user.balance}</td>
            <td>{user.status}</td>
            <td>
              <Button onClick={() => console.log(`Button clicked for row ${user.id}`)}>
                Blacklist
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const InfluxTable = ({ data }) => {
  const [influxes, setInfluxes] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('http://localhost:8000/influx');
        const json = await response.json();
        console.log(json);
        setInfluxes(json);
      };
  
      fetchData();
    }, []);

return (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Value</th>
        <th>Type</th>
        <th>Time</th>
        <th>Person</th>
      </tr>
    </thead>
    <tbody>
      {influxes.map((influx) => (
        <tr key={influx.id}>
          <td>{influx.value}</td>
          <td>{influx.type}</td>
          <td>{influx.time}</td>
          <td>{influx.person}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);
};

const EffluxTable = ({ data }) => {
  const [effluxes, setEFfluxes] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('http://localhost:8000/efflux');
        const json = await response.json();
        console.log(json);
        setEFfluxes(json);
      };
  
      fetchData();
    }, []);

return (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Value</th>
        <th>Type</th>
        <th>Time</th>
        <th>Size</th>
        <th>Person</th>
      </tr>
    </thead>
    <tbody>
      {effluxes.map((efflux) => (
        <tr key={efflux.id}>
          <td>{efflux.value}</td>
          <td>{efflux.type}</td>
          <td>{efflux.time}</td>
          <td>{efflux.size}</td>
          <td>{efflux.person}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);
};

export {DataTable, InfluxTable, EffluxTable};