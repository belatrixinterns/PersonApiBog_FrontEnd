import React, { useState, useEffect } from "react";
import { IPerson } from "../../interfaces/IPerson";
import ListPersonComponent from "../../component/ListPerson/ListPersonComponent";
import axios from "axios";
import { Confirm } from "semantic-ui-react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import personApi from "../../api/personApi";

const ListPersonPage: React.FC<{}> = () => {
  const [people, setPeople] = useState(Array<IPerson>());
  const [personSelected, setPersonSelected] = useState<IPerson>();
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    personApi.getPeople().then(response => {
      setPeople(response);
      setLoading(false)
    })
  }, [])

  function setStateShowConfirmComponent(state: boolean) {
    setConfirmOpen(state)
  }

  function handleDelete(person: IPerson) {
    setPersonSelected(person)
    setStateShowConfirmComponent(true)
  }

  function deletePerson(personToDelete: IPerson | undefined) {
    if (personToDelete) {
      axios.delete(`https://personapibogbackend.herokuapp.com/person/${personToDelete.id}`)
        .then(response => response.data)
        .then(personDeleted => { setPeople(people.filter(person => person.id != personDeleted.id)); toast.info("Delete successfull") })
        .catch(err => { console.log(err.message); toast.error("Delete don't successfull, the user don't exist in the applicative") })
      setStateShowConfirmComponent(false)
    }
  }


  return (
    <div>
      <ListPersonComponent data={people} handleDelete={handleDelete} loading={loading} ></ListPersonComponent>
      <Confirm
        content={`${personSelected ? "Are you sure to delete " + personSelected.name.toLocaleUpperCase() + "?" : "You can't delete a non existent person"}`}
        open={confirmOpen}
        onCancel={() => setStateShowConfirmComponent(false)}
        onConfirm={() => deletePerson(personSelected)} />
    </div>

  );
}

export default ListPersonPage;