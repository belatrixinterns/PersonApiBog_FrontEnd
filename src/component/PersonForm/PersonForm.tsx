import React, { FunctionComponent, useState, useEffect } from 'react';
import {Input, Table, Button, Select, Confirm} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';
import { createBrowserHistory } from 'history';
import { toast } from 'react-toastify';
import PersonApi from '../../api/personApi';
import { IPerson } from '../../interfaces/IPerson';
import contactValidation from '../shared/contactValidation';
import nameValidation from '../shared/nameValidation';
import documentValidation from '../shared/documentValidation';
import { Link, Redirect } from 'react-router-dom';
import GoBackButton from '../shared/GoBackButton';
import MESSAGES from '../shared/Messages';


type PersonFormProps = {
    type: string,
}

const PersonForm: FunctionComponent<PersonFormProps> = (props) => {
    
    const [localState, setLocalState] = useState({name: '',lastName: '',documentType: '',document: '', dateOfBirth: "",gender: '',nationality: '',contact: ''});

    const history = createBrowserHistory();

    const [listState, setListState] = useState({nationalityList:[{}], 
        genderList: [{key:'0', value:'0', text:'Female'}, {key:'1', value:'1', text:'Male'}],
        documentTypeList: [{key:'1', value:'CC', text:'Citizenship Card',}, {key:'2', value:'CE', text:'Foreign Card'}, {key:'3', value:'TI', text:'Identity Card'}]});

    const [confirmOpen, setConfirmOpen] = useState({confirmState:false});

    const getFormCreateContent= () =>{ return([
        {name: "Name:", input: <Input id="name" fluid required maxLength="25" placeholder='Name' className="input-form" type="text" value={localState.name} onChange={handleNameChange} />},
        {name: "Last Name:", input: <Input id="lantName" fluid required maxLength="25" placeholder='Last Name' className="input-form" type="text" value={localState.lastName} onChange={handleLastNameChange} />},
        {name: "Document Type:", input:<Select fluid required id="documentType" placeholder='Document Type' className="input-form" options={listState.documentTypeList} type="text" value={localState.documentType} onChange={handleDocumentTypeChange} />},
        {name: "Document:", input:<Input id="document" fluid placeholder='Document' maxLength={localState.documentType === "CE"? 20:10} className="input-form" type="text" value={localState.document} onChange={handleDocumentChange} />},
        {name: "Date of Birth:", input: datePicker()},
        {name: "Gender:", input: <Select id="gender" fluid placeholder='Gender' className="input-form" options={listState.genderList} type="text" value={localState.gender} onChange={handleGenderChange} />},
        {name: "Nationality", input: <Select id="nationality" fluid search placeholder='Nationality' value={localState.nationality} className="input-form" options={listState.nationalityList} onChange={handleNationalityChange} />},
        {name: "Contact:", input:<Input id="contact" fluid maxLength="30" placeholder='Contact' className="input-form" type="text" value={localState.contact} onChange={handleContactChange} />},
    ])};

    useEffect(() => {
        chargeCountries();
        inspect();
    },[])
    
    function chargeCountries(){
        fetch('https://restcountries.eu/rest/v2/all?fields=name;numericCode')
        .then(response => response.json())
        .then(json => setListState({...listState, "nationalityList":(json.map((value:any) => {
            return {"text": value.name, "value": (value.numericCode + ""), "key": (value.numericCode + "")}
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
    function handleNationalityChange(event: any, { name, value }: any) {
        setLocalState({ ...localState, nationality: value });
    }
    function handleContactChange (event:any, {name, value}:any) {
        setLocalState({...localState,contact: value});
    }

    function handleSubmit(event: any) {
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

    function datePicker(){
        return(
            <DateInput id="dateOfBirth" fluid className="date-form" name="date"
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
                <Table.Row>
                    <Table.Cell width={2}>{formElement.name}</Table.Cell>
                    <Table.Cell className={status} width={10}>
                        {formElement.input}
                    </Table.Cell>
                </Table.Row>
            );
        })
    }

    function inspect () { 
        if(!props.type.includes("/person/create")){
            const url = (props.type.split("/"));
            const id = url[url.length - 1];

            
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
            .catch(err => {
                if (err.response && err.response.data.message){
                    toast.error(err.response.data.message);
                    history.goBack();
                }
                else{
                    toast.error("Error on charge person");
                    history.goBack();
                }
            });

        }
    }
    function update() {
        return(
            printTableForm()
        );
    }

    function updateButtonHandler(event:any){
        event.preventDefault();

        const url = (props.type.split("/"));
        const id = url[url.length - 1];

        console.log(id);
        
        var splitDate = localState.dateOfBirth.split("-");
        var formatDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
        const newPerson:IPerson = JSON.parse('{"id":"'+ id + '", "name":"' + localState.name + '","last_name":"'  + localState.lastName + '","date_of_birth":"'+ formatDate + '","document_type":"'+
            localState.documentType + '","document_id":"'+ localState.document +'","gender":"'+ localState.gender+ '","nationality":"'+ localState.nationality + 
            '","contact":"'+ localState.contact +'"}');
        console.log(newPerson);
        
        PersonApi.updatePerson(newPerson)
        .then(()=>{
            history.goBack();
            toast.info("Person updated succesfully");
        })
        .catch( err => {
            if (err.response && err.response.data.message){
                toast.error(err.response.data.message);
                history.goBack();
            }
            else{
                toast.error("Error on charge person");
                history.goBack();
            }
        });
    }

    
    function setStateShowConfirmComponent(state: boolean) {
        setConfirmOpen({confirmState:state})
      }


    function deleteButtonHandler(event:any){
        setStateShowConfirmComponent(true);
    }

    function createbuttons(){
        return(
            <div>
                <Button className="submit_button" floated='right' type="submit" content="Add" icon="add" />
                <GoBackButton></GoBackButton>
            </div>
        );
    }

    function updateButtons(){
        return(
            <div>               
                <Button className="submit_button"  floated='right' onClick={updateButtonHandler} type="submit" >
                    <i className="icon settings" /> Update
                </Button>
                <GoBackButton></GoBackButton>
                                    
            </div>
        );
    }

    function inspectButtons(){
        const url = (props.type.split("/"));
        const id = url[url.length - 1];
        return(
            <div>
                <Link to={`/person/update/${id}`} replace >
                    <Button className="submit_button" type="button" floated='right'>
                        <i className="icon settings" /> Update
                    </Button>
                </Link> 
                <Confirm
                    content={`${localState ? "Are you sure to delete " + localState.name.toLocaleUpperCase() + "?" : MESSAGES.DELETE_A_NON_EXIST_PERSON}`}
                    open={confirmOpen.confirmState}
                    onCancel={() => setStateShowConfirmComponent(false)}
                    onConfirm={() => {
                        PersonApi.deletePerson(parseInt(id)).then(()=>{
                            window.location.href = "/persons";
                        });
                        setStateShowConfirmComponent(false);
                    }} 
                />
                 <Button className="submit_button" type="button" onClick={deleteButtonHandler} floated='right'>
                    <i className="icon trash" /> Delete
                </Button>
                <GoBackButton></GoBackButton>
            </div>
        );
    }

    return (
        <div className="person_form_container">
            <form className="person_form" onSubmit={handleSubmit}>
                {
                    props.type === "/person/create" ?  <h1>Add person</h1> : (props.type.includes("/person/update") ?  <h1>Update person</h1> : <h1>Inspect person</h1>) 
                }
                <Table basic='very'>
                    <Table.Body>
                        {
                            props.type === "/person/create" ?  printTableForm() : (props.type.includes("/person/update") ?  update() : printTableForm("disabled")) 
                        }
                    </Table.Body>
                </Table>
                {
                    props.type === "/person/create" ?  createbuttons() : (props.type.includes("/person/update") ?  updateButtons() : inspectButtons() )
                }
            </form>
        </div>
    );
}

export default PersonForm;