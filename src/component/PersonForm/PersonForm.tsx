import React from 'react';
import {Input, Select, Table, Button} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';
import { appFetch } from '../utils/appFetch';

type PersonFormProps = {
    findAllItems: any
}
type PersonFormStatus = {
    name: any,
    lantName: any,
    documentType: any,
    document: any,
    dateOfBirth: any,
    gender: any,
    nationality: any,
    genderList: any,
    nationalityList: any,
    documentTypeList: any,
    request: any,
}

class PersonForm extends React.Component<PersonFormProps, PersonFormStatus> {
    
    chargeCountries = () =>{
        fetch('https://restcountries.eu/rest/v2/all?fields=name;numericCode')
        .then(response => response.json())
        .then(json => this.setState({"nationalityList":(json.map((value:any) => {
            return {"text": value.name, "value": value.numericCode, "key": value.numericCode}
         }))}));
    }
    create = () => {
        const call = appFetch({url: "http://localhost:8080/person/", body: '{"name": "andres", "last_name": "arias", "date_of_birth": "1998-06-06", "document_type": "CC", "document_id": "12343123", "gender": "1", "nationality": "057"}', method: "POST"})
        .then((request => JSON.stringify(request)));
        console.log("request", call);
   
    }

    constructor(props: PersonFormProps){
        super(props);
        this.state = {request: {},name: '',lantName: '',documentType: '',document: '', dateOfBirth: "",gender: '',nationality: '',
                        genderList: [{key:'0', value:'0', text:'Female'}, {key:'1', value:'1', text:'Male'}],nationalityList: [{}],documentTypeList: [{key:'1', value:'CC', text:'Citizenship Card'}, {key:'2', value:'CE', text:'Foreign Card'}, {key:'3', value:'TI', text:'Identity Card'}]};

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleDocumentTypeChange = this.handleDocumentTypeChange.bind(this);
        this.handleDocumentChange = this.handleDocumentChange.bind(this);
        this.handleDateOfBirthChange = this.handleDateOfBirthChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleNationalityChange = this.handleNationalityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.chargeCountries();

        this.create();
    }


    handleNameChange = (event:any) =>{
        this.setState({name: event.target.value});
    }
    handleLastNameChange = (event:any) =>{
        this.setState({lantName: event.target.value});
    }
    handleDocumentTypeChange = (event:any, {name, value}:any) => {
        this.setState({documentType: value});
    }
    handleDocumentChange = (event:any) =>{
        this.setState({document: event.target.value});
    }
    handleDateOfBirthChange = (event:any, {name, value}:any) => {
        this.setState({dateOfBirth: value});
    }
    handleGenderChange = (event:any, {name, value}:any) => {
        this.setState({gender: value});
    }
    handleNationalityChange = (event:any, {name, value}:any) => {
        this.setState({nationality: value});
    }

    handleSubmit(event:any){
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
    }
    
    onAddClick = (event: any) => {

    }

    render(){
        return(
            <div className="person_form_container">
                <form className="person_form" onSubmit={this.handleSubmit}>
                    <h2>Add Person</h2>
                    <Table basic='very'>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell width={2}> Name:</Table.Cell>
                                <Table.Cell width={10}> <Input id="name" fluid placeholder='Name' className="input-form" type="text" value={this.state.name} onChange={this.handleNameChange} /></Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell width={2}>Last Name:</Table.Cell>
                                <Table.Cell width={10}> <Input id="lantName" fluid placeholder='Last Name' className="input-form" type="text" value={this.state.lantName} onChange={this.handleLastNameChange} /></Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell width={2}>Document Type:</Table.Cell>
                                <Table.Cell width={10}>
                                    <Select fluid id="documentType" placeholder='Document Type' className="input-form" options={this.state.documentTypeList} type="text" value={this.state.documentType} onChange={this.handleDocumentTypeChange} />
                                </Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell width={2}>Document:</Table.Cell>
                                <Table.Cell width={10}><Input id="document" fluid placeholder='Document' className="input-form" type="text" value={this.state.document} onChange={this.handleDocumentChange} /></Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell width={2}>Date of Birth:</Table.Cell>
                                <Table.Cell width={10}>
                                    <DateInput id="dateOfBirth" fluid className="date-form" name="date"
                                        placeholder="Date of Birth"
                                        iconPosition="right"
                                        onChange={this.handleDateOfBirthChange} 
                                        value={this.state.dateOfBirth} 
                                    />
                                </Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell width={2}>Gender:</Table.Cell>
                                <Table.Cell width={10}>
                                    <Select id="gender" fluid placeholder='Gender' className="input-form" options={this.state.genderList} type="text" value={this.state.gender} onChange={this.handleGenderChange} />
                                </Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell width={2}>Nationality:</Table.Cell>
                                <Table.Cell width={10}>
                                    <Select id="nationality" fluid search placeholder='Nationality' className="input-form" options={this.state.nationalityList} value={this.state.nationality} onChange={this.handleNationalityChange} />
                                </Table.Cell>
                            </Table.Row>
                            
                        </Table.Body>
                    </Table>
                    <Button className="submit_button" basic floated='right' type="submit" content="Add" onClick={this.onAddClick}/>
                </form>
            </div>
        );
    }
}

export default PersonForm;