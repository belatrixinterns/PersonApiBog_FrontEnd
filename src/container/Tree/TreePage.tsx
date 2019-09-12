import React, { FunctionComponent, useState, useEffect } from 'react';
import TreeComponent from '../../component/Tree/TreeComponent';
import PersonApi from '../../api/personApi';
import { IPerson } from '../../interfaces/IPerson';
import KinshipApi from '../../api/kinshipApi';
import { IKinship } from '../../interfaces/IKinship';
import { listKinshipType } from '../../component/shared/listKinshipType';
import { IKinshipsWithParents } from '../../interfaces/IkinshipsWithParents';
import GoBackButton from '../../component/shared/GoBackButton';


const TreePage: React.FC<{}> = ({ match }: any) => {
    const [relationship, setRelationship] = useState(Array<IKinshipsWithParents>());
    const [person, setPerson] = useState();
    const url = (match.url.split("/"));
    const id = url[url.length - 1];


    useEffect(() => {
        const idPerson = parseInt(id);
        PersonApi.getPeople().then((people: IPerson[]) => {
            setPerson(people.find((person: IPerson) => person.id === idPerson))
            KinshipApi.getKinships().then((kinships: IKinship[]) => {
                const kinshipsFiltered = kinships.filter((kinship: IKinship) => kinship.idFirstPerson === idPerson || kinship.idSecondPerson === idPerson);

                const grandParentsFiltered: IKinship[] = kinships.filter((kinship :IKinship) => kinship.idRelationType ===  5 || kinship.idRelationType === 6);

                let kins: IKinshipsWithParents[] | undefined = kinshipsFiltered.map((kinshipFiltered: IKinship) => {
                    const personOne: IPerson | undefined = people.find((person: IPerson) => person.id === kinshipFiltered.idFirstPerson);
                    const personTwo: IPerson | undefined = people.find((person: IPerson) => person.id === kinshipFiltered.idSecondPerson);
                    const kinshipType: any = listKinshipType.find((kinshipType) => kinshipType.key === kinshipFiltered.idRelationType.toString())

                    let kinshipWithNames: IKinshipsWithParents = {
                        id: kinshipFiltered.id,
                        personOne: personOne ? personOne.name + " " + personOne.last_name : "",
                        relation: kinshipType.text,
                        personTwo: personTwo ? personTwo.name + " " + personTwo.last_name : ""
                    }

                    if (kinshipType.text === "Father") {
                        const father: IPerson | undefined = people.find(person => person.id === (personOne ? personOne.id : undefined));
                        const possibleGrandFathers: IKinship[] | undefined= kinships ? kinships.filter((currentKinship: IKinship) => currentKinship.idSecondPerson === (father ? father.id : undefined)): undefined
                        const grandFather: IKinship | undefined = possibleGrandFathers ? possibleGrandFathers.find((possibleGrandFather: IKinship) => possibleGrandFather.idRelationType === 1 ): undefined;
                        const personGrandFather = people.find( (person: IPerson) => person.id === (grandFather ? grandFather.idFirstPerson: undefined));
                       
                        const possibleGrandMother: IKinship[] | undefined= kinships ? kinships.filter((currentKinship: IKinship) => currentKinship.idSecondPerson === (father ? father.id : undefined)): undefined
                        const grandMother: IKinship | undefined = possibleGrandMother ? possibleGrandMother.find((possibleGrandMother: IKinship) => possibleGrandMother.idRelationType === 2 ): undefined;
                        const personGrandMother = people.find( (person: IPerson) => person.id === (grandMother ? grandMother.idFirstPerson: undefined));

                        const isAlreadyexistGrandParentFather = grandParentsFiltered.find((grandParentKinship: IKinship) => grandParentKinship.idFirstPerson === (personGrandFather ? personGrandFather.id: undefined));
                        const isAlreadyexistGrandParentMother = grandParentsFiltered.find((grandParentKinship: IKinship) => grandParentKinship.idFirstPerson === (personGrandMother ? personGrandMother.id: undefined));
                        
                        if(isAlreadyexistGrandParentMother != undefined &&isAlreadyexistGrandParentMother && isAlreadyexistGrandParentMother ){
                            kinshipWithNames["grandParentsFather"] = []
                        }
                        else if(isAlreadyexistGrandParentFather){
                            kinshipWithNames["grandParentsFather"] = [personGrandMother]
                        }
                        else if(isAlreadyexistGrandParentMother){
                            kinshipWithNames["grandParentsFather"] = [personGrandFather]
                        }else{
                            kinshipWithNames["grandParentsFather"] = [personGrandFather, personGrandMother];
                        }
                        
                    }
                    if (kinshipType.text === "Mother") {
                        const father: IPerson | undefined = people.find(person => person.id === (personOne ? personOne.id : undefined));
                        const possibleGrandFathers: IKinship[] | undefined= kinships ? kinships.filter((currentKinship: IKinship) => currentKinship.idSecondPerson === (father ? father.id : undefined)): undefined
                        const grandFather: IKinship | undefined = possibleGrandFathers ? possibleGrandFathers.find((possibleGrandFather: IKinship) => possibleGrandFather.idRelationType === 1 ): undefined;
                        const personGrandFather = people.find( (person: IPerson) => person.id === (grandFather ? grandFather.idFirstPerson: undefined));
                        
                        const possibleGrandMother: IKinship[] | undefined= kinships ? kinships.filter((currentKinship: IKinship) => currentKinship.idSecondPerson === (father ? father.id : undefined)): undefined
                        const grandMother: IKinship | undefined = possibleGrandMother ? possibleGrandMother.find((possibleGrandMother: IKinship) => possibleGrandMother.idRelationType === 2 ): undefined;
                        const personGrandMother = people.find( (person: IPerson) => person.id === (grandMother ? grandMother.idFirstPerson: undefined));
                        
                        const isAlreadyexistGrandParentFather = grandParentsFiltered.find((grandParentKinship: IKinship) => grandParentKinship.idFirstPerson === (personGrandFather ? personGrandFather.id: undefined));
                        const isAlreadyexistGrandParentMother = grandParentsFiltered.find((grandParentKinship: IKinship) => grandParentKinship.idFirstPerson === (personGrandMother ? personGrandMother.id: undefined));
                        
                        if(isAlreadyexistGrandParentFather != undefined && isAlreadyexistGrandParentMother && isAlreadyexistGrandParentMother ){
                            kinshipWithNames["grandParentsMother"] = []
                        }
                        else if(isAlreadyexistGrandParentFather){
                            kinshipWithNames["grandParentsMother"] = [personGrandMother]
                        }
                        else if(isAlreadyexistGrandParentMother){
                            kinshipWithNames["grandParentsMother"] = [personGrandFather]
                        }else{
                            kinshipWithNames["grandParentsMother"] = [personGrandFather, personGrandMother];
                        }
                        
                    }

                    return kinshipWithNames;

                })

                setRelationship(kins)
            })

        })
    }, [])

    return (
        <div className="Family_tree">
            <h2>Family Tree</h2>
            <TreeComponent person={person} listKinshipNames={relationship} />
            <GoBackButton />        
        </div>
    )
}


export default TreePage;