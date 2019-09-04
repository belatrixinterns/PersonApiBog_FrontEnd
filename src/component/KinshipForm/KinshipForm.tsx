import React, { FunctionComponent, useState, useEffect } from 'react';
import { Table, Select, Button } from 'semantic-ui-react';
import GoBackButton from '../shared/GoBackButton';
import PersonApi from '../../api/personApi';
import { IKinship } from '../../interfaces/IKinship';
import KinshipApi from '../../api/kinshipApi';
import { toast } from 'react-toastify';
import { createBrowserHistory } from 'history';
import UpdateButtonsForm from '../shared/updateButtonsForm';
import { listKinshipType } from '../shared/listKinshipType';
import MESSAGES from '../shared/Messages';
import CreateButtonsForm from '../shared/createButtonsForm';
import { IPerson } from '../../interfaces/IPerson';
import { IPersonOnUpdate } from '../../interfaces/IPersonOnUpdate';


const KinshipForm : FunctionComponent = ({match}:any) => {

    const history = createBrowserHistory();

    const [localState, setLocalState] = useState({personOne:'', personTwo: '', kinship:''});

    const [listState, setListState] = useState({peopleList: Array<IPersonOnUpdate>(), kinshipListMale: listKinshipType.filter(element => element.gender === 1 || element.gender === 2), kinshipListFemale: listKinshipType.filter(element => element.gender === 0 || element.gender === 2)});

    const [genderState, setGenderState] = useState({gender:""});

    function getGender(key:any){
        let gender:any = listState.peopleList.filter((element:any) => element.key === key);
        if(gender.length > 0){
            setGenderState({ ...genderState, gender: gender[0].gender });      
        }
    };

    const getFormCreateContent= () =>{ return([
        {name: "Person 1:", input: <Select id="personO" fluid search placeholder='Person 1' className="input-form" value={localState.personOne} options={listState.peopleList} onChange={handlePersonOneChange}/>  },
        {name: "Relation:", input: <Select id="kinship" fluid placeholder='Kinship' className="input-form" options={genderState.gender == ''? listKinshipType:( genderState.gender == '1'? listState.kinshipListMale:listState.kinshipListFemale)} type="text" value={localState.kinship} onChange={handleKinshipChange}/>  },
        {name: "Person 2:", input: <Select id="personT" fluid search placeholder='Person 2' className="input-form" value={localState.personTwo} options={listState.peopleList} onChange={handlePersonTwoChange}/>  },
    ])};

    useEffect(() => {
        chargePeople();
    },[])

    function chargePeople(){
        PersonApi.getPeople()
        .then((response: IPerson[]) => {
            setListState({...listState, 
                "peopleList":(response.map((person: IPerson) => {
                    return {"text": (person.name + " " + person.last_name), "value": (person.id).toString(), "gender": (person.gender).toString() , "key": (person.id).toString()}})), 
            });
            return response;
        })
        .then((response: IPerson[]) => {
             if (match.url && !match.url.includes("/kinship/create")) {
                const url = (match.url.split("/"));
                const id = url[url.length - 1];
                
                if(isNaN(id)){
                    toast.info("Id not valid");
                    history.push("/kinships");
                    history.go(0);
                }
                else{
                    KinshipApi.getKinship(id).then((data:IKinship)=>{
                        setLocalState({...localState, "personOne": (data.idFirstPerson).toString() , "personTwo": (data.idSecondPerson).toString(), "kinship": (data.idRelationType).toString(), })
                            const personSearched = response.find(person => person.id == data.idFirstPerson);
                        if(personSearched){
                            setGenderState({gender: personSearched.gender.toString()})
                        }
                    });
                }  
            }      
        });
    }

    function charheKinship() {
        if (match.url && !match.url.includes("/kinship/create")) {
            const url = (match.url.split("/"));
            const id = url[url.length - 1];
            
            KinshipApi.getKinship(id).then((data:IKinship)=>{
                setLocalState({...localState, "personOne": (data.idFirstPerson).toString() , "personTwo": (data.idSecondPerson).toString(), "kinship": (data.idRelationType).toString(), })
            });
        }
    }
    function handlePersonOneChange(event: any, { name, value }: any) {
        if(localState.personTwo && value == localState.personTwo){
            toast.error(MESSAGES.CANT_SELECT_SAME_PERSON)
        }
        else{
            setLocalState({...localState, personOne: value });        
            getGender(value);
        }
}

    function handleKinshipChange(event: any, { name, value }: any) {
        setLocalState({ ...localState, kinship: value });
    }

    function handlePersonTwoChange(event: any, { name, value }: any) {
        if(localState.personOne && value == localState.personOne){
            toast.error(MESSAGES.CANT_SELECT_SAME_PERSON)
        }
        else{
            setLocalState({ ...localState, personTwo: value });
        }
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        if(localState.kinship === '' || localState.personOne === '' || localState.personTwo === '' ){
            toast.error(MESSAGES.KINSHIP_NOT_NULL);
        }
        else{
            const newKinship: IKinship = JSON.parse(`{"idFirstPerson":"${localState.personOne}", "idSecondPerson":"${localState.personTwo}", "idRelationType":"${localState.kinship}"}`);
            KinshipApi.createKinship(newKinship)
            .then(()=>{
                history.goBack();
                toast.info("Kinship created succesfully");
            })
            .catch( err => {
                if(err.response.data.message)
                toast.error(err.response.data.message);
            });
        }
    }
    
    function updateButtonHandler(event:any){
        event.preventDefault();
        if(localState.kinship === "" || localState.personOne === "" || localState.personTwo === "" ){
            toast.error(MESSAGES.KINSHIP_NOT_NULL);
        }
        else{
            const url = (match.url.split("/"));
            const id = url[url.length - 1];
    
            const newKinship: IKinship = JSON.parse(`{"id": "${id}" ,"idFirstPerson":${localState.personOne}, "idSecondPerson":${localState.personTwo}, "idRelationType":${localState.kinship}}`);
            
            KinshipApi.updateKinship(newKinship)
            .then(()=>{
                history.goBack();
                toast.info("Kinship updated succesfully");
            })
            .catch( (err:any) => {
                if (err.response && err.response.data.message){
                    toast.error(err.response.data.message);
                    history.goBack();
                }
                else{
                    toast.error("Error on change kinship");
                    history.goBack();
                }
            });
        }
    }

    function inspectButtons(){
        return(
            <div>
                <GoBackButton/>
            </div>
        );
    }

    function update() {
        return(
            printTableForm()
        );
    }

    function printTableForm(status?:string) {
        return getFormCreateContent().map((formElement:any)=>{
            return(
                <Table.Row key={`row_${formElement.name}`}>
                    <Table.Cell key={`cell_name_${formElement.name}`} width={2}>{formElement.name}</Table.Cell>
                    <Table.Cell key={`cell_input_${formElement.name}`} className={status} width={10}>
                        {formElement.input}
                    </Table.Cell>
                </Table.Row>
            );
        })
    }

    return(
        <div className="kinship_form_container">
            <form>
                {
                    match.url === "/kinship/create" ?  <h2>Add kinship</h2> : (match.url.includes("/kinship/update") ?  <h2>Modify kinship</h2> : <h2>Inspect person's kinships</h2>) 
                }
                <Table basic='very'>
                    <Table.Body>
                        {
                            match.url === "/kinship/create" ?  printTableForm() : (match.url.includes("/kinship/update") ?  update() : printTableForm("disabled")) 
                        }
                    </Table.Body>
                </Table>
                {
                    match.url === "/kinship/create" ?  <CreateButtonsForm isPersonForm={false} handleSubmit={handleSubmit}/> : (match.url.includes("/kinship/update") ?  <UpdateButtonsForm updateButtonHandler={updateButtonHandler}/> : inspectButtons() )
                }   
            </form>
        </div>
    );

}

export default KinshipForm;