import React, { FunctionComponent, useState, useEffect } from 'react';
import { Table, Button, Input, Select } from 'semantic-ui-react';
import GoBackButton from '../shared/GoBackButton';
import PersonApi from '../../api/personApi';
import { IKinship } from '../../interfaces/IKinship';
import KinshipApi from '../../api/kinshipApi';
import { toast } from 'react-toastify';
import { createBrowserHistory } from 'history';
import createButtonsForm from '../shared/createButtonsForm';
import UpdateButtonsForm from '../shared/updateButtonsForm';
import { listKinshipType } from '../shared/listKinshipType';


const KinshipForm : FunctionComponent = ({match}:any) => {

    const history = createBrowserHistory();

    const [localState, setLocalState] = useState({personOne:'', personTwo: '', kinship:''});

    const [listState, setListState] = useState({peopleList:[{}], kinshipList: listKinshipType});

    const getFormCreateContent= () =>{ return([
        {name: "Person 1:", input: <Select id="personO" fluid search placeholder='Person 1' className="input-form" value={localState.personOne} options={listState.peopleList} onChange={handlePersonOneChange}/>  },
        {name: "Relation:", input: <Select id="kinship" fluid placeholder='Kinship' className="input-form" options={listState.kinshipList} type="text" value={localState.kinship} onChange={handleKinshipChange}/>  },
        {name: "Person 2:", input: <Select id="personT" fluid search placeholder='Person 2' className="input-form" value={localState.personTwo} options={listState.peopleList} onChange={handlePersonTwoChange}/>  },
    ])};

    useEffect(() => {
        chargePeople();
        charheKinship();
    },[])

    function chargePeople(){
        PersonApi.getPeople()
        .then(response => {
            setListState({...listState, "peopleList":(response.map((value:any) => {
                return {"text": (value.name + " " + value.last_name), "value": (value.id + ""), "key": (value.id + "")}
             }))});
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
        setLocalState({ ...localState, personOne: value });        
    }

    function handleKinshipChange(event: any, { name, value }: any) {
        setLocalState({ ...localState, kinship: value });
    }

    function handlePersonTwoChange(event: any, { name, value }: any) {
        setLocalState({ ...localState, personTwo: value });
    }

    function handleSubmit(event: any) {
        event.preventDefault();
        const newKinship: IKinship = JSON.parse(`{"idFirstPerson":"${localState.personOne}", "idSecondPerson":"${localState.personTwo}", "idRelationType":"${localState.kinship}"}`);
        KinshipApi.createKinship(newKinship)
        .then(()=>{
            //history.goBack();
            toast.info("Kinship created succesfully");
        })
        .catch( err => {
            if(err.response.data.message)
            toast.error(err.response.data.message);
        });
    }
    
    function updateButtonHandler(event:any){
        const url = (match.url.split("/"));
        const id = url[url.length - 1];

        const newKinship: IKinship = JSON.parse(`{"id": "${id}" ,"idFirstPerson":${localState.personOne}, "idSecondPerson":${localState.personTwo}, "idRelationType":${localState.kinship}}`);
        
        KinshipApi.updateKinship(newKinship)
        .then(()=>{
            //history.goBack();
            toast.info("Person kinship succesfully");
        })
        .catch( (err:any) => {
            if (err.response && err.response.data.message){
                toast.error(err.response.data.message);
                //history.goBack();
            }
            else{
                toast.error("Error on change kinship");
                //history.goBack();
            }
        });
        
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
            <form onSubmit={handleSubmit}>
                <h2>Add Kinship</h2>
                <Table basic='very'>
                    <Table.Body>
                        {
                            match.url === "/kinship/create" ?  printTableForm() : (match.url.includes("/kinship/update") ?  update() : printTableForm("disabled")) 
                        }
                    </Table.Body>
                </Table>
                {
                    match.url === "/kinship/create" ?  createButtonsForm() : (match.url.includes("/kinship/update") ?  <UpdateButtonsForm updateButtonHandler={updateButtonHandler}/> : inspectButtons() )
                }                
            </form>
        </div>
    );

}

export default KinshipForm;