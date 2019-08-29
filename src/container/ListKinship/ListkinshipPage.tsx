import React, { useState, useEffect } from "react";
import { Confirm } from "semantic-ui-react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ListKinshipComponent from "../../component/ListKinship/ListKinshipComponent"
import MESSAGES from "../../component/shared/Messages";
import KinshipApi from "../../api/kinshipApi";
import { IKinshipNames } from "../../component/shared/IKinshipNames";
import { IKinship } from "../../interfaces/IKinship";

const ListKinshipPage: React.FC<{}> = () => {
  const [relationship, setKinship] = useState(Array<IKinshipNames>());
  const [kinshipSelected, setKinshipSelected] = useState<IKinshipNames>();
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
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
      <ListKinshipComponent data={relationship} handleDelete={handleDelete} loading={loading} ></ListKinshipComponent>
      <Confirm
        content={`${kinshipSelected ? "Are you sure to delete " + kinshipSelected.personOne+" "+kinshipSelected.personTwo + "?" : MESSAGES.DELETE_A_NON_EXIST_PERSON}`}
        open={confirmOpen}
        onCancel={() => setStateShowConfirmComponent(false)}
        onConfirm={() => deletePerson(kinshipSelected)} />
    </div>

  );
}

export default ListKinshipPage;