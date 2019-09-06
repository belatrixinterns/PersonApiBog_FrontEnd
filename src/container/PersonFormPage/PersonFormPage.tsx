import React, { FunctionComponent, useState, useEffect } from 'react';
import {Input, Table, Button, Select, Confirm, Grid, GridRow, GridColumn, List, ListItem} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';
import { createBrowserHistory } from 'history';
import { toast } from 'react-toastify';
import PersonApi from '../../api/personApi';
import { IPerson } from '../../interfaces/IPerson';
import contactValidation from '../../component/shared/contactValidation';
import nameValidation from '../../component/shared/nameValidation';
import documentValidation from '../../component/shared/documentValidation';
import { Link } from 'react-router-dom';
import GoBackButton from '../../component/shared/GoBackButton';
import MESSAGES from '../../component/shared/Messages';
import UpdateButtonsForm from '../../component/shared/updateButtonsForm';
import CreateButtonsForm from '../../component/shared/createButtonsForm';
import ConfirmComponent from '../../component/shared/ConfirmComponent';
import PersonForm from '../../component/PersonForm/PersonForm';


const PersonFormPage:FunctionComponent = ({match}:any) => {
    const [localState, setLocalState] = useState({name: '',lastName: '',documentType: '',document: '', dateOfBirth: "",gender: '',nationality: '',contact: ''});

    const history = createBrowserHistory();

    const url = (match.url.split("/"));
    const id = url[url.length - 1];

    
    const [confirmOpen, setConfirmOpen] = useState({confirmState:false});
    const [updateConfirmState, setUpdateConfirmState] = useState(false);    

    useEffect(() => {
        inspect();
    },[])
    

    function handleCreateButton(event: any) {
        event.preventDefault();
        var splitDate = localState.dateOfBirth.split("-");
        var formatDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
        const newPerson:IPerson = JSON.parse('{"name":"' + localState.name + '","last_name":"'  + localState.lastName + '","date_of_birth":"'+ formatDate + '","document_type":"'+
            localState.documentType + '","document_id":"'+ localState.document +'","gender":"'+ localState.gender+ '","nationality":"'+ localState.nationality + 
            '","contact":"'+ localState.contact +'"}');

        var validation:{mssg:string, request:boolean} = contactValidation(newPerson.contact);
        
        if(!validation.request && validation.mssg){
            toast.error(validation.mssg);
            return;
        }
        validation = nameValidation(newPerson.name, newPerson.last_name);
        if(!validation.request && validation.mssg){
            toast.error(validation.mssg);
            return;
        }
        validation = documentValidation(newPerson.document_id, newPerson.document_type);
        if(!validation.request && validation.mssg){
            toast.error(validation.mssg);
            return;
        }

        PersonApi.createPerson(newPerson)
        .then(()=>{
            history.goBack();
            toast.info("Person created succesfully");
        })
        .catch( err => {
            if(err.response.data.message)
            toast.error(err.response.data.message);
        });
    }

    function inspect () { 
        if(!match.url.includes("/person/create")){

            if(isNaN(id)){
                toast.error("Id not valid");
                history.goBack();
            }
            else{
                PersonApi.getPerson(id)
                .then((data:any) => {
                    var splitDate = data.date_of_birth.split("-");
                    var formatDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
                
                    while(data.nationality.split("").length < 3){
                        data.nationality = "0" + data.nationality;
                    }

                    setLocalState({...localState, "name": data.name, "lastName": data.last_name, "documentType": data.document_type, "document": data.document_id, 
                        "dateOfBirth": formatDate, "gender": data.gender, "nationality": data.nationality, "contact": data.contact});
                    }
                )
                .catch((err:any) => {
                    if (err.response && err.response.data.message){
                        history.push("/persons");
                        history.go(0);
                        toast.error(err.response.data.message);
                    }
                    else{
                        history.push("/persons");
                        history.go(0);
                        toast.error("Error on charge person");
                    }
                });

            }

        }
    }
    function update() {
        return(
            <PersonForm localState={localState} setLocalState={setLocalState}/>
        );
    }

    function updateButtonHandler(event:any){
        event.preventDefault();

        var splitDate = localState.dateOfBirth.split("-");
        var formatDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
        const newPerson:IPerson = JSON.parse('{"id":"'+ id + '", "name":"' + localState.name + '","last_name":"'  + localState.lastName + '","date_of_birth":"'+ formatDate + '","document_type":"'+
            localState.documentType + '","document_id":"'+ localState.document +'","gender":"'+ localState.gender+ '","nationality":"'+ localState.nationality + 
            '","contact":"'+ localState.contact +'"}');
            var validation:{mssg:string, request:boolean} = contactValidation(newPerson.contact);

        if(!validation.request && validation.mssg){
            toast.error(validation.mssg);
            return;
        }
        validation = nameValidation(newPerson.name, newPerson.last_name);
        if(!validation.request && validation.mssg){
            toast.error(validation.mssg);
            return;
        }
        validation = documentValidation(newPerson.document_id, newPerson.document_type);
        if(!validation.request && validation.mssg){
            toast.error(validation.mssg);
            return;
        }
        PersonApi.updatePerson(newPerson)
        .then(()=>{
            history.goBack();
            toast.info("Person updated succesfully");
        })
        .catch( (err:any) => {
            console.log("upsi");
            if (err.response && err.response.data.message){
                toast.error(err.response.data.message);
                history.push("/persons");
                //history.go(0);
            }
            else{
                toast.error("Error on charge person");
                history.push("/persons");
                //history.go(0);
            }
        });
    }

    function updatePersonOnConfirm(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        event.preventDefault();
        updateButtonHandler(event);
        handleCancelUpdatePerson();
    }

    function handleCancelUpdatePerson(){
        setUpdateConfirmState(false);
    }

    const personToComponent = () =>{
        //const currentNationality: any = listState.nationalityList.find((nationality:any ) => nationality.value == localState.nationality);
        const currentNationality: any = "ARREGLAR TRAER CIUDAD";//TODO:
        return(<div className="confirmation-component">
            <Grid>
                <GridRow>
                    <GridColumn>
                        <p className="confirmation-text">Are you sure to update the current person with the following information?</p>
                    </GridColumn>
                </GridRow>
                <GridRow>
                    <GridColumn>
                        <List>
                            <ListItem>
                                <b>Name: </b> {localState.name}
                            </ListItem>
                            <ListItem>
                                <b>Last name: </b> {localState.lastName}
                            </ListItem>
                            <ListItem>
                                <b>Document type: </b> {localState.documentType}
                            </ListItem>
                            <ListItem>
                                <b>Document: </b> {localState.document}
                            </ListItem>
                            <ListItem>
                                <b>Gender: </b> {localState.gender == "1" ? "Male": "Female"}
                            </ListItem>
                            <ListItem>
                                <b>Date of birth: </b> {localState.dateOfBirth}
                            </ListItem>
                            <ListItem>
                                <b>Nationality: </b> {currentNationality? currentNationality.text : ""}
                            </ListItem>
                            <ListItem>
                                <b>Contact: </b> {localState.contact}
                            </ListItem>
                        </List>
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>);
    }
    
    function setStateShowConfirmComponent(state: boolean) {
        setConfirmOpen({confirmState:state})
      }


    function deleteButtonHandler(event:any){
        setStateShowConfirmComponent(true);
    }

    function inspectButtons(){
        return(
            <div>
                <Confirm
                    content={`${localState ? "Are you sure to delete " + localState.name.toLocaleUpperCase() + "?" : MESSAGES.DELETE_A_NON_EXIST_PERSON}`}
                    open={confirmOpen.confirmState}
                    onCancel={() => setStateShowConfirmComponent(false)}
                    onConfirm={() => {
                        PersonApi.deletePerson(parseInt(id)).then(()=>{
                            history.push("/persons");
                            history.go(0);
                        });
                        setStateShowConfirmComponent(false);
                    }} 
                />
                 <Button className="submit_button delete_button" type="button" onClick={deleteButtonHandler} floated='right'>
                    <i className="icon trash" /> Delete
                </Button>
                <GoBackButton/>
            </div>
        );
    }

    return (
        <div className="person_form_container">
            <form className="person_form">
                {
                    match.url === "/person/create" ?  <h2>Add Person</h2> : (match.url.includes("/person/update") ?  <h2>Modify Person</h2> : <h2>Inspect Person</h2>) 
                }
                {
                    match.url.includes("/person/inspect") ?  
                        (<Link to={`/person/update/${id}`} replace >
                            <Button className="submit_button update_button" type="button" floated='right'>
                                <i className="icon settings" /> Modify
                            </Button>
                        </Link>) :  ""
                }
                
                <Table key={"table_form"} basic='very'>
                    {
                        match.url === "/person/create" ?  <PersonForm localState={localState} setLocalState={setLocalState}/> : (match.url.includes("/person/update") ?  update() : <PersonForm localState={localState} setLocalState={setLocalState}/>) 
                    }
                </Table>
                {
                    match.url === "/person/create" ?  <CreateButtonsForm  isPersonForm={true} handleSubmit={handleCreateButton}/>  : (match.url.includes("/person/update") ?  <UpdateButtonsForm isPersonForm={true} updateButtonHandler={() => setUpdateConfirmState(true)}/>  : inspectButtons() )
                }
            </form>
            <ConfirmComponent confirmMessageContent={personToComponent()} confirmOpenState={updateConfirmState} functionToExecuteOnConfirm={updatePersonOnConfirm} handleCancelEvent={handleCancelUpdatePerson}></ConfirmComponent>
        </div>
    );
}

export default PersonFormPage;