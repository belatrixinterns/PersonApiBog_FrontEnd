import React, { useState, useEffect } from "react";
import { IPerson } from "../../interfaces/IPerson";
import ListPersonComponent from "../../component/ListPerson/ListPersonComponent";
import axios from "axios";
import { Confirm } from "semantic-ui-react";

const ListPersonPage: React.FC<{}> = () => {

  const [people, setPeople] = useState(Array<IPerson>());
  const [personSelected, setPersonSelected] = useState<IPerson>();
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  function getPeople() {
    axios.get('https://personapibogbackend.herokuapp.com/person/')
      .then(response => response.data)
      .then(posts => {setPeople(posts); setLoading(false)})
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    getPeople();
  }, [])

  function setStateShowConfirmComponent(state: boolean) {
    setConfirmOpen(state)
  }

  function handleUpdate(row: any) {
    console.log(row);
  }

  function handleInspect(row: any) {
    console.log(row)
  }

  function handleDelete(person: IPerson) {
    setPersonSelected(person)
    setStateShowConfirmComponent(true)
  }

  function deletePerson(personToDelete: IPerson | undefined){
    if(personToDelete){
      axios.delete(`https://personapibogbackend.herokuapp.com/person/${personToDelete.id}`)
      .then(response => response.data)
      .then(personDeleted => setPeople(people.filter(person => person.id != personDeleted.id)))
      .catch(err => console.log(err.message))
      setStateShowConfirmComponent(false)
    }
  }

  return (
    <div>
       <ListPersonComponent data={people} handleUpdate={handleUpdate} handleDelete={handleDelete} loading={loading} handleInspect={handleInspect}></ListPersonComponent>
       <Confirm 
                content={`${personSelected ? "Are you sure to delete "+personSelected.name.toLocaleUpperCase()+"?" : "You can't delete a non existent person"}`} 
                open={confirmOpen} 
                onCancel={() => setStateShowConfirmComponent(false)}
                onConfirm={() => deletePerson(personSelected)} />
    </div>
   
  );
}

export default ListPersonPage;