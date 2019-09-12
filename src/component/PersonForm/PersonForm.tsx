import React, { FunctionComponent, useState, useEffect } from 'react';
import {Input, Table, Button, Select, Confirm, Grid, GridRow, GridColumn, List, ListItem, Dropdown} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';
import { createBrowserHistory } from 'history';
import { toast } from 'react-toastify';
import PersonApi from '../../api/personApi';
import { IPerson } from '../../interfaces/IPerson';
import { Link } from 'react-router-dom';
import GoBackButton from '../shared/GoBackButton';
import MESSAGES from '../shared/Messages';
import UpdateButtonsForm from '../shared/updateButtonsForm';
import CreateButtonsForm from '../shared/createButtonsForm';
import ConfirmComponent from '../shared/ConfirmComponent';
import validatePersonFields from '../shared/Validators/PersonValidator/PersonValidator';
import AsyncPaginate from "react-select-async-paginate";
import { INationality } from '../shared/INationality';


const PersonForm: FunctionComponent = ({match}:any) => {
    const [localState, setLocalState] = useState({name: '',lastName: '',documentType: '',document: '', dateOfBirth: "",gender: '',nationality: '',contact: ''});

    const history = createBrowserHistory();

    const url = (match.url.split("/"));
    const id = url[url.length - 1];

    const [listState, setListState] = useState({nationalityList: Array<INationality>(), 
        genderList: [{key:'0', value:'0', text:'Female'}, {key:'1', value:'1', text:'Male'}],
        documentTypeList: [{key:'1', value:'CC', text:'CC',}, {key:'2', value:'CE', text:'CE'}, {key:'3', value:'TI', text:'TI'}]});

    const [confirmOpen, setConfirmOpen] = useState({confirmState:false});

    const [updateConfirmState, setUpdateConfirmState] = useState(false);
  
    const [goBackConfirmState, setGoBackConfirmState] = useState(false);


    const loadOptions = async (search: any, prevOptions: INationality[]) => {
      
        let filteredOptions;
        if (!search) {
          filteredOptions = listState.nationalityList;
        } else {
          const searchLower = search.toLowerCase();
      
          filteredOptions = listState.nationalityList.filter( (nationality: INationality) => nationality.text.toLowerCase().includes(searchLower));
        }
      
        const hasMore = filteredOptions.length > prevOptions.length + 10;
        const slicedOptions = filteredOptions.slice(
          prevOptions.length,
          prevOptions.length + 10
        );
      
        return {
          options: slicedOptions,
          hasMore
        };
      };
    
    const getFormCreateContent= () =>{ return([
        {name: "Name:*", input: <Input key="name" fluid required maxLength="25" placeholder='Name' className="input-form" type="text" value={localState.name} onChange={handleNameChange} />},
        {name: "Last Name:*", input: <Input key="lantName" fluid required maxLength="25" placeholder='Last Name' className="input-form" type="text" value={localState.lastName} onChange={handleLastNameChange} />},
        {name: "Document Type:*", input:<Select fluid key="documentType" placeholder='Document Type' className="input-form" options={listState.documentTypeList} type="text" value={localState.documentType} onChange={handleDocumentTypeChange} />},
        {name: "Document:*", input:<Input key="document" required fluid placeholder='Document' maxLength={localState.documentType === "CE"? 20:10} className="input-form" type="text" value={localState.document} onChange={handleDocumentChange} />},
        {name: "Date of Birth:*", input: datePicker()},
        {name: "Gender:*", input: <Select key="gender" fluid placeholder='Gender' className="input-form" options={listState.genderList} type="text" value={localState.gender} onChange={handleGenderChange} />},
        {name: "Nationality:*", input: <Select key="nationality" fluid search placeholder='Nationality' value={localState.nationality} className="input-form" options={listState.nationalityList} onChange={handleNationalityChange} />},
        {name: "Contact:", input:<Input key="contact" fluid maxLength="30" placeholder='Contact' className="input-form" type="text" value={localState.contact} onChange={handleContactChange} />},
    ])};

    useEffect(() => {
        chargeCountries();
        inspect();
    },[])
    
    
    function chargeCountries(){
        fetch('https://restcountries.eu/rest/v2/all?fields=name;numericCode')
        .then(response => response.json())
        .then(json => setListState({...listState, "nationalityList":(json.map((value:any) => {
            return {"text": value.name, "value": (value.numericCode + ""), "key": (value.numericCode + ""), "label" : value.name}
         }))}));
    }

    function handleNameChange(event: any) {
        setLocalState({ ...localState, name: event.target.value });
    }
    function handleLastNameChange(event: any) {
        setLocalState({ ...localState, lastName: event.target.value });
    }
    function handleDocumentTypeChange(event: any, { name, value }: any) {
        setLocalState({ ...localState, documentType: value });
    }
    function handleDocumentChange(event: any) {
        setLocalState({ ...localState, document: event.target.value });
    }
    function handleDateOfBirthChange(event: any, { name, value }: any) {
        setLocalState({ ...localState, dateOfBirth: value });
    }
    function handleGenderChange(event: any, { name, value }: any) {
        setLocalState({ ...localState, gender: value });
    }
    function handleNationalityChange(data: any) {
        setLocalState({ ...localState, nationality: data.value });
        
    }
    function handleContactChange (event:any, {name, value}:any) {
        setLocalState({...localState,contact: value});
    }

    function goBack(event: any) {
        event.preventDefault();
        history.goBack();
    }

    function handleCancelGoBackPerson(){
        setGoBackConfirmState(false);
    }

    function handleCreateButton(event: any) {
        event.preventDefault();
        var splitDate = localState.dateOfBirth.split("-");
        var formatDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
        const newPerson:IPerson = JSON.parse('{"name":"' + localState.name + '","last_name":"'  + localState.lastName + '","date_of_birth":"'+ formatDate + '","document_type":"'+
            localState.documentType + '","document_id":"'+ localState.document +'","gender":"'+ localState.gender+ '","nationality":"'+ localState.nationality + 
            '","contact":"'+ localState.contact +'"}');

        if(validatePersonFields(localState)){
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
    }

    function datePicker(){
        return(
            <DateInput key="dateOfBirth" fluid className="date-form" name="date"
                placeholder="Date of Birth"
                iconPosition="right"
                onChange={handleDateOfBirthChange} 
                value={localState.dateOfBirth} 
            />
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

    function inspect () { 
        if(!match.url.includes("/person/create")){

            if(isNaN(id)){
                toast.error("Invalid Id");
                history.push("/persons"); history.push("/persons");
                history.go(-1);
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
                    }                )
                .catch((err:any) => {
                    if (err.response && err.response.data.message){
                        toast.error(err.response.data.message);
                        history.push("/persons"); history.push("/persons");
                        history.go(-1);
                    }
                    else{
                        toast.error("Error on charge person");
                        history.push("/persons"); history.push("/persons");
                        history.go(-1);
                    }
                });

            }

        }
    }
    function update() {
        return(
            printTableForm()
        );
    }

    function updateButtonHandler(event:any){
        event.preventDefault();

        var splitDate = localState.dateOfBirth.split("-");
        var formatDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
        const newPerson:IPerson = JSON.parse('{"id":"'+ id + '", "name":"' + localState.name + '","last_name":"'  + localState.lastName + '","date_of_birth":"'+ formatDate + '","document_type":"'+
            localState.documentType + '","document_id":"'+ localState.document +'","gender":"'+ localState.gender+ '","nationality":"'+ localState.nationality + 
            '","contact":"'+ localState.contact +'"}');
        
          if(validatePersonFields(localState)){
              PersonApi.updatePerson(newPerson)
              .then(()=>{
                  history.goBack();
                  toast.info("Person updated succesfully");
              })
              .catch( (err:any) => {
                  if (err.response && err.response.data.message){
                     toast.error(err.response.data.message);
                     history.push("/persons"); history.push("/persons");
                     history.go(-1);  
                  }
                  else{
                      toast.error("Error on charge person");
                      history.push("/persons"); history.push("/persons");
                      history.go(-1);
                  }
              });
          }
    }

    function updatePersonOnConfirm(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
        event.preventDefault();
        updateButtonHandler(event);
        handleCancelUpdatePerson();
    }

    function handleCancelUpdatePerson(){
        setUpdateConfirmState(false);
    }

    const goBackToComponent = () => {
        return(
            <div className="confirmation-component">
                <p className="confirmation-text">¿Desea salir sin completar los cambios?</p>
            </div>
        );
    }

    const personToComponent = () =>{
        const currentNationality: any = listState.nationalityList.find((nationality:any ) => nationality.value === localState.nationality);
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
                                <b>Gender: </b> {localState.gender === "1" ? "Male": "Female"}
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

    function validateRequiredFields(){
        const personEntries = Object.entries(localState);
        const isValidPersonForm = personEntries.every(([personEntryKey, personEntryValue]) => personEntryValue !== "" || personEntryKey == "contact");
        return isValidPersonForm;
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
                <GoBackButton />
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
                    <Table.Body key={"table_body_form"}>
                        {
                            match.url === "/person/create" ?  printTableForm() : (match.url.includes("/person/update") ?  update() : printTableForm("disabled")) 
                        }
                    </Table.Body>
                </Table>
                {
                    match.url === "/person/create" ?  <CreateButtonsForm disabled={!validateRequiredFields()} isPersonForm={true} handleSubmit={handleCreateButton}/>  : (match.url.includes("/person/update") ?  <UpdateButtonsForm disabled={!validateRequiredFields()} isPersonForm={true} updateButtonHandler={() => setUpdateConfirmState(true)} goBackButtonHandler={() => setGoBackConfirmState(true)}/>  : inspectButtons() )
                }
            </form>
            <ConfirmComponent confirmMessageContent={personToComponent()} confirmOpenState={updateConfirmState} functionToExecuteOnConfirm={updatePersonOnConfirm} handleCancelEvent={handleCancelUpdatePerson}></ConfirmComponent>
            <ConfirmComponent confirmMessageContent={goBackToComponent()} confirmOpenState={goBackConfirmState} functionToExecuteOnConfirm={goBack} handleCancelEvent={handleCancelGoBackPerson}></ConfirmComponent>
        </div>    
    );
}

export default PersonForm;