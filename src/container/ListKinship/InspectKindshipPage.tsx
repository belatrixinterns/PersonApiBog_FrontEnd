
import React, { useState, useEffect } from "react";
import { Confirm } from "semantic-ui-react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MESSAGES from "../../component/shared/Messages";
import KinshipApi from "../../api/kinshipApi";
import { IKinshipNames } from "../../component/shared/IKinshipNames";
import { IKinship } from "../../interfaces/IKinship";
import { IPerson } from "../../interfaces/IPerson";
import ListInspectKindshipComponent from "../../component/ListKinship/ListInspectKindshipComponent"
import PersonApi from "../../api/personApi";
import { listKinshipType } from "../../component/shared/listKinshipType";
import { createBrowserHistory } from "history";

const InspectKindshipPage: React.FC<{}> = ({ match }: any) => {

  const history = createBrowserHistory();

  const [relationship, setKinship] = useState(Array<IKinshipNames>());
  const [kinshipSelected, setKinshipSelected] = useState<IKinshipNames>();
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const url = (match.url.split("/"));
  const id = url[url.length - 1];

  useEffect(() => {
    if(isNaN(id)){
      toast.error("Invalid Id");
      history.push("/persons"); history.push("/persons");
      history.go(-1);
    }else{
      PersonApi.getPerson(id)
      .then(()=>{
        return ejecution();
      }).catch(()=>{
        toast.error("Id not found. Please try another user.");
        history.push("/persons"); history.push("/persons");
        history.go(-1);
      });
    }
  }, [])

  function ejecution(){
    const idPerson = parseInt(id);
    PersonApi.getPeople().then((people: IPerson[]) => {
      KinshipApi.getKinships().then((kinships: IKinship[]) => {
        let newKinship = kinships.filter((kinship: IKinship) => kinship.idFirstPerson === idPerson || kinship.idSecondPerson === idPerson);
        console.log(newKinship);
        
        if(newKinship.length === 0){
          toast.error("This user doesn't have kinships");
          history.push("/persons"); history.push("/persons");
          history.go(-1);
        }
        return newKinship;
      })
        .then((kinshipsFiltered: IKinship[]) => {
          return kinshipsFiltered.map((kinshipFiltered: IKinship) => {
            const personOne: IPerson | undefined = people.find((person: IPerson) => person.id === kinshipFiltered.idFirstPerson);
            const personTwo: IPerson | undefined = people.find((person: IPerson) => person.id === kinshipFiltered.idSecondPerson);
            const kinshipType: any = listKinshipType.find((kinshipType) => kinshipType.key === kinshipFiltered.idRelationType.toString())
            const kinshipWithNames: IKinshipNames = {
              id: kinshipFiltered.id,
              personOne: personOne ? personOne.name + " " + personOne.last_name : "",
              relation: kinshipType.text,
              personTwo: personTwo ? personTwo.name + " " + personTwo.last_name : ""
            }
            return kinshipWithNames;
          })
        })
        .then((kinshipWithNames: IKinshipNames[]) => {
          setKinship(kinshipWithNames)
          setLoading(false)
        })  
    })
  
  }    

  function setStateShowConfirmComponent(state: boolean) {
    setConfirmOpen(state)
  }

  function handleDelete(kinship: IKinshipNames) {
    setKinshipSelected(kinship)
    setStateShowConfirmComponent(true)
  }

  function deletePerson(kinshipToDelete: IKinshipNames | undefined) {
    if (kinshipToDelete) {
      KinshipApi.deleteKinship(kinshipToDelete.id)
        .then((relationshipDeleted: IKinship) => {
          setKinship(relationship.filter(relationship => relationship.id !== relationshipDeleted.id))
          toast.info(MESSAGES.DELETE_KINSHIP_SUCCESSFUL)
        }).catch(() => { toast.error(MESSAGES.DELETE_A_NON_EXIST_KINSHIP); setKinship(relationship.filter(kinship => kinship.id !== kinshipToDelete.id)) })
      setStateShowConfirmComponent(false)
    }
  }

  return (
    <div>
      <ListInspectKindshipComponent data={relationship} handleDelete={handleDelete} loading={loading} ></ListInspectKindshipComponent>
      <Confirm
        content={`${kinshipSelected ? "Are you sure to delete " + kinshipSelected.personOne + " " + kinshipSelected.personTwo + "?" : MESSAGES.DELETE_A_NON_EXIST_PERSON}`}
        open={confirmOpen}
        onCancel={() => setStateShowConfirmComponent(false)}
        onConfirm={() => deletePerson(kinshipSelected)} />
    </div>

  );
}

export default InspectKindshipPage;