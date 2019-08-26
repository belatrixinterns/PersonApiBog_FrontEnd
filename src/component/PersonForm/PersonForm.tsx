import React, { FunctionComponent, useState, useEffect } from 'react';
import {Input, Table, Button, Select, Dropdown} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { toast } from 'react-toastify';


type PersonFormProps = {
    type: string,
}
type PersonFormStatus = {
    name: string,
    lastName: string,
    documentType: string,
    document: string,
    dateOfBirth: string,
    gender: string,
    nationality: string,
    contact: string,
    genderList: Object[],
    documentTypeList: Object[],
    request: Object,
}

const PersonForm: FunctionComponent<PersonFormProps> = (props) => {
    
    const [localState, setLocalState] = useState({request: {},name: '',lastName: '',documentType: '',document: '', dateOfBirth: "",gender: '',nationality: '',contact: '',
    genderList: [{key:'0', value:'0', text:'Female'}, {key:'1', value:'1', text:'Male'}],
    documentTypeList: [{key:'1', value:'CC', text:'Citizenship Card'}, {key:'2', value:'CE', text:'Foreign Card'}, {key:'3', value:'TI', text:'Identity Card'}]});

    const history = createBrowserHistory();

    const [listState, setListState] = useState({nationalityList:[{}]});
    const getFormCreateContent= () =>{ return([
        {name: "Name:", input: <Input id="name" fluid required placeholder='Name' className="input-form" type="text" value={localState.name} onChange={handleNameChange} />},
        {name: "Last Name:", input: <Input id="lantName" fluid required placeholder='Last Name' className="input-form" type="text" value={localState.lastName} onChange={handleLastNameChange} />},
        {name: "Document Type:", input:<Select fluid required id="documentType" placeholder='Document Type' className="input-form" options={localState.documentTypeList} type="text" value={localState.documentType} onChange={handleDocumentTypeChange} />},
        {name: "Document:", input:<Input id="document" fluid placeholder='Document' className="input-form" type="text" value={localState.document} onChange={handleDocumentChange} />},
        {name: "Date of Birth:", input: datePicker()},
        {name: "Gender:", input: <Select id="gender" fluid placeholder='Gender' className="input-form" options={localState.genderList} type="text" value={localState.gender} onChange={handleGenderChange} />},
        {name: "Nationality", input: <Select id="nationality" fluid search placeholder='Nationality' value={localState.nationality} className="input-form" options={listState.nationalityList} onChange={handleNationalityChange} />},
        {name: "Contact:", input:<Input id="contact" fluid placeholder='Contact' className="input-form" type="text" value={localState.contact} onChange={handleContactChange} />},
    ])};

    useEffect(() => {
        chargeCountries();
        inspect();
    },[])
    
    function chargeCountries(){
        fetch('https://restcountries.eu/rest/v2/all?fields=name;numericCode')
        .then(response => response.json())
        .then(json => setListState({"nationalityList":(json.map((value:any) => {
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
        const newPerson = '{"name":"' + localState.name + '","last_name":"'  + localState.lastName + '","date_of_birth":"'+ formatDate + '","document_type":"'+
            localState.documentType + '","document_id":"'+ localState.document +'","gender":"'+ localState.gender+ '","nationality":"'+ localState.nationality + 
            '","contact":"'+ localState.contact +'"}';
            
        axios.post(`https://personapibogbackend.herokuapp.com/person/`, JSON.parse(newPerson))
        .catch( err => {
            if(err.response.data.message)
                alert(err.response.data.message);
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
        if(!props.type.includes("/person/update") && !props.type.includes("/person/create")){
            const url = (props.type.split("/"));
            const id = url[url.length - 1];
            axios.get(`https://personapibogbackend.herokuapp.com/person/${id}`)
            .then(response => response.data)
            .then((data) => {
                setLocalState({... localState, "name": data.name, "lastName": data.last_name, "documentType": data.document_type, "document": data.document_id, 
                    "dateOfBirth": data.date_of_birth, "gender": data.gender, "nationality": data.nationality, "contact": data.contact});
                }
            )
            .catch(err => {
                if (err.response.data && err.response.data.message){
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

    function cancelButtonHandler(event:any){
        history.goBack();
    }

    function createbuttons(){
        return(
            <div>
                <Button className="submit_button" basic floated='right' type="submit" content="Add" />
                <Button className="submit_button" type="button" onClick={cancelButtonHandler} basic floated='right' content="Cancel" />
            </div>
        );

    }

    function updateButtons(){
        return(
            <Button className="submit_button" basic floated='right' type="submit" content="Add" />
        );
    }

    function inspectButtons(){
        return(
            <Button className="submit_button" type="button" onClick={cancelButtonHandler} basic floated='right' content="Cancel" />
        );
    }

    function update() {
        return(
            "update"
        );
    }

    return (
        <div className="person_form_container">
            <form className="person_form" onSubmit={handleSubmit}>
                <h2>Add Person</h2>
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