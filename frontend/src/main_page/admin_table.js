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

export default DataTable;