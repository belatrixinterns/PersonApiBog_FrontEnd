import React, { useState, useEffect } from "react";
import { IPerson } from "../../interfaces/IPerson";
import ListPersonComponent from "../../component/ListPerson/ListPersonComponent";
import { Confirm } from "semantic-ui-react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import personApi from "../../api/personApi";
import MESSAGES from "../../component/shared/Messages";

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
      personApi.deletePerson(personToDelete.id)
        .then((personDeleted: IPerson) => {
          setPeople(people.filter(person => person.id !== personDeleted.id))
          toast.info(MESSAGES.DELETE_PERSON_SUCESSFULL)
        }).catch(() => { toast.error(MESSAGES.DELETE_A_NON_EXIST_PERSON); setPeople(people.filter(person => person.id !== personToDelete.id)) })
      setStateShowConfirmComponent(false)
    }
  }


  return (
    <div>
      <ListPersonComponent data={people} handleDelete={handleDelete} loading={loading} ></ListPersonComponent>
      <Confirm
        content={`${personSelected ? "Are you sure to delete " + personSelected.name.toLocaleUpperCase() + "?" : MESSAGES.DELETE_A_NON_EXIST_PERSON}`}
        open={confirmOpen}
        onCancel={() => setStateShowConfirmComponent(false)}
        onConfirm={() => deletePerson(personSelected)} />
    </div>

  );
}

export default ListPersonPage;