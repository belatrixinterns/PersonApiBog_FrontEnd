import React, { useState, useEffect } from "react";
import { IPerson } from "../../interfaces/IPerson";
import ListPersonComponent from "../../component/ListPerson/ListPersonComponent";
import axios from "axios";

const ListPersonPage: React.FC<{}> = () => {

  const [people, setPeople] = useState(Array<IPerson>());
  const [loading, setLoading] = useState(true);

  function getPeople() {
    axios.get('https://personapibogbackend.herokuapp.com/person/')
      .then(response => response.data)
      .then(posts => setPeople(posts))
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    getPeople();
    setLoading(false);
  }, [])

  function handleUpdate(row: any) {
    console.log(row);
  }

  function handleDelete(row: any) {
    console.log(row)
  }
  function handleInspect(row: any) {
    console.log(row)
  }
  return (
    <ListPersonComponent data={people} handleUpdate={handleUpdate} handleDelete={handleDelete} loading={loading} handleInspect={handleInspect}></ListPersonComponent>
  );
}

export default ListPersonPage;