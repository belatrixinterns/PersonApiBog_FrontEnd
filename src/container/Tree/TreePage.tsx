import React, { FunctionComponent, useState, useEffect } from 'react';
import TreeComponent from '../../component/Tree/TreeComponent';
import { match } from 'react-router-dom';
import { IKinshipNames } from '../../component/shared/IKinshipNames';
import PersonApi from '../../api/personApi';
import { IPerson } from '../../interfaces/IPerson';
import KinshipApi from '../../api/kinshipApi';
import { IKinship } from '../../interfaces/IKinship';
import { listKinshipType } from '../../component/shared/listKinshipType';


const TreePage: React.FC<{}> = ({ match }: any) => {
    const [relationship, setRelationship] = useState(Array<IKinshipNames>());
    const url = (match.url.split("/"));
    const id = url[url.length - 1];

    useEffect(() => {
        const idPerson = parseInt(id);
        PersonApi.getPeople().then((people: IPerson[]) => {
            KinshipApi.getKinships().then((kinships: IKinship[]) => {
                return kinships.filter((kinship: IKinship) => kinship.idFirstPerson === idPerson || kinship.idSecondPerson === idPerson)
            })
                .then((kinshipsFiltered: IKinship[]) => {
                    let kins = kinshipsFiltered.map((kinshipFiltered: IKinship) => {
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
                    setRelationship(kins)

                })
        })
    }, [])

    return (
       // console.log(relationship),
        
        <TreeComponent data={relationship} />
    )
}




export default TreePage;