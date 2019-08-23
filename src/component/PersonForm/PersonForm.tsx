import React, { FunctionComponent, useState, useEffect } from 'react';
import {Input, Select, Table, Button} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';
import axios from 'axios';

type PersonFormProps = {
    findAllItems: any
}
type PersonFormStatus = {
    name: string,
    lastName: string,
    documentType: string,
    document: string,
    dateOfBirth: string,
    gender: string,
    nationality: string,
    genderList: Object[],
    nationalityList: Object[],
    documentTypeList: Object[],
    request: Object,
}

const PersonForm: FunctionComponent<PersonFormProps> = () => {
    
    const [localState, setLocalState] = useState({request: {},name: '',lastName: '',documentType: '',document: '', dateOfBirth: "",gender: '',nationality: '',
    genderList: [{key:'0', value:'0', text:'Female'}, {key:'1', value:'1', text:'Male'}],nationalityList: [{}],
    documentTypeList: [{key:'1', value:'CC', text:'Citizenship Card'}, {key:'2', value:'CE', text:'Foreign Card'}, {key:'3', value:'TI', text:'Identity Card'}]});


    useEffect(()=>{
        chargeCountries();
    },[])
    

    function chargeCountries(){
        fetch('https://restcountries.eu/rest/v2/all?fields=name;numericCode')
        .then(response => response.json())
        .then(json => setLocalState({...localState, "nationalityList":(json.map((value:any) => {
            return {"text": value.name, "value": value.numericCode, "key": value.numericCode}
         }))}));
    }

    function handleNameChange (event:any) {
        setLocalState({...localState,name: event.target.value});
    }
    function handleLastNameChange(event:any) {
        setLocalState({...localState,lastName: event.target.value});
    }
    function handleDocumentTypeChange (event:any, {name, value}:any) {
        setLocalState({...localState,documentType: value});
    }
    function handleDocumentChange (event:any) {
        setLocalState({...localState,document: event.target.value});
    }
    function handleDateOfBirthChange (event:any, {name, value}:any) {
        setLocalState({...localState,dateOfBirth: value});
    }
    function handleGenderChange (event:any, {name, value}:any) {
        setLocalState({...localState,gender: value});
    }
    function handleNationalityChange (event:any, {name, value}:any) {
        setLocalState({...localState,nationality: value});
    }

    function handleSubmit(event:any){
        event.preventDefault();
            var splitDate = localState.dateOfBirth.split("-");
            var formatDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
            const newPerson = '{"name":"' + localState.name + '","last_name":"'  + localState.lastName + '","date_of_birth":"'+ formatDate + '","document_type":"'+
                localState.documentType + '","document_id":"'+ localState.document +'","gender":"'+ localState.gender+ '","nationality":"'+ localState.nationality+ '"}';
                
            axios.post(`https://personapibogbackend.herokuapp.com/person/`, JSON.parse(newPerson))
            .then(res => {
                console.log(res);
                console.log(res.data);
            }).catch( err => {
                if(err.response.data.message)
                    alert(err.response.data.message);
            });
    }

    return(
        <div className="person_form_container">
            <form className="person_form" onSubmit={handleSubmit}>
                <h2>Add Person</h2>
                <Table basic='very'>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell width={2}> Name:</Table.Cell>
                            <Table.Cell width={10}> <Input id="name" fluid placeholder='Name' className="input-form" type="text" value={localState.name} onChange={handleNameChange} /></Table.Cell>
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell width={2}>Last Name:</Table.Cell>
                            <Table.Cell width={10}> <Input id="lantName" fluid placeholder='Last Name' className="input-form" type="text" value={localState.lastName} onChange={handleLastNameChange} /></Table.Cell>
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell width={2}>Document Type:</Table.Cell>
                            <Table.Cell width={10}>
                                <Select fluid id="documentType" placeholder='Document Type' className="input-form" options={localState.documentTypeList} type="text" value={localState.documentType} onChange={handleDocumentTypeChange} />
                            </Table.Cell>
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell width={2}>Document:</Table.Cell>
                            <Table.Cell width={10}><Input id="document" fluid placeholder='Document' className="input-form" type="text" value={localState.document} onChange={handleDocumentChange} /></Table.Cell>
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell width={2}>Date of Birth:</Table.Cell>
                            <Table.Cell width={10}>
                                <DateInput id="dateOfBirth" fluid className="date-form" name="date"
                                    placeholder="Date of Birth"
                                    iconPosition="right"
                                    onChange={handleDateOfBirthChange} 
                                    value={localState.dateOfBirth} 
                                />
                            </Table.Cell>
                        </Table.Row>
                        
                        <Table.Row>
                            <Table.Cell width={2}>Gender:</Table.Cell>
                            <Table.Cell width={10}>
                                <Select id="gender" fluid placeholder='Gender' className="input-form" options={localState.genderList} type="text" value={localState.gender} onChange={handleGenderChange} />
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                            <Table.Cell width={2}>Nationality:</Table.Cell>
                            <Table.Cell width={10}>
                                <Select id="nationality" fluid search placeholder='Nationality' className="input-form" options={localState.nationalityList} value={localState.nationality} onChange={handleNationalityChange} />
                            </Table.Cell>
                        </Table.Row>
                        
                    </Table.Body>
                </Table>
                <Button className="submit_button" basic floated='right' type="submit" content="Add" />
            </form>
        </div>
    );
    
}

export default PersonForm;