import React, { useState, useEffect } from "react";
import { Confirm } from "semantic-ui-react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ListKinshipComponent from "../../component/ListKinship/ListKinshipComponent"
import MESSAGES from "../../component/shared/Messages";
import KinshipApi from "../../api/kinshipApi";
import { IKinshipNames } from "../../component/shared/IKinshipNames";
import { IKinship } from "../../interfaces/IKinship";
import { IPerson } from "../../interfaces/IPerson";
import ListPersonComponent from "../../component/ListPerson/ListPersonComponent";
import ListInspectKindshipComponent from "../../component/ListKinship/ListInspectKindshipComponent"
import { isExpression } from "@babel/types";
import { IRelation } from "../../interfaces/IRelation";
import PersonApi from "../../api/personApi";
import { listKinshipType } from "../../component/shared/listKinshipType";

const InspectKindshipPage: React.FC<{}> = () => {
  const [relationship, setKinship] = useState(Array<IKinshipNames>());
  const [kinshipSelected, setKinshipSelected] = useState<IKinshipNames>();
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);


  useEffect(() => {
    //arreglar id por url
    const idQuemado = 5;
      PersonApi.getPeople().then((people: IPerson[]) => {
        KinshipApi.getKinships().then((kinships: IKinship[]) =>{
        return kinships.filter( ( kinship: IKinship ) => kinship.idFirstPerson===idQuemado || kinship.idSecondPerson===idQuemado )
        })
        .then((kinshipsFiltered: IKinship[]) => {
          return kinshipsFiltered.map((kinshipFiltered: IKinship) => {
            const personOne: IPerson | undefined = people.find((person: IPerson)=> person.id === kinshipFiltered.idFirstPerson);
            const personTwo: IPerson | undefined = people.find((person: IPerson)=> person.id === kinshipFiltered.idSecondPerson);
            const kinshipType: any = listKinshipType.find((kinshipType)=> kinshipType.key === kinshipFiltered.idRelationType.toString() )
            const kinshipWithNames: IKinshipNames = {
              id: kinshipFiltered.id,
              personOne: personOne? personOne.name+" "+personOne.last_name: "",
              relation: kinshipType.text,
              personTwo: personTwo? personTwo.name+" "+personTwo.last_name: ""
            }
            return kinshipWithNames;
          })
        }).then((kinshipWithNames: IKinshipNames[]) =>{
          setKinship(kinshipWithNames)
        })
      })

      KinshipApi.getKinshipsNames().then((response:IKinshipNames[])=> {
      setKinship(response);
      setLoading(false)
    })
  }, [])

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
        content={`${kinshipSelected ? "Are you sure to delete " + kinshipSelected.personOne+" "+kinshipSelected.personTwo + "?" : MESSAGES.DELETE_A_NON_EXIST_PERSON}`}
        open={confirmOpen}
        onCancel={() => setStateShowConfirmComponent(false)}
        onConfirm={() => deletePerson(kinshipSelected)} />
    </div>

  );
}

export default InspectKindshipPage;