import React from 'react';
import {Input, Select, Table, Button} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';
import { appFetch } from '../utils/appFetch';
import axios from 'axios';

type PersonFormProps = {
    findAllItems: any
}
type PersonFormStatus = {
    name: any,
    lastName: any,
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
    
    constructor(props: PersonFormProps){
        super(props);
        this.state = {request: {},name: '',lastName: '',documentType: '',document: '', dateOfBirth: "",gender: '',nationality: '',
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
    }


    handleNameChange = (event:any) =>{
        this.setState({name: event.target.value});
    }
    handleLastNameChange = (event:any) =>{
        this.setState({lastName: event.target.value});
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
        event.preventDefault();
        try {
            var splitDate = this.state.dateOfBirth.split("-");
            var formatDate = splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0];
            const newPerson = '{"name":"' + this.state.name + '", "last_name":"'  + this.state.lastName + '","date_of_birth":"'+ formatDate + '","document_type":"'+
                this.state.documentType + '","document_id":"'+ this.state.document +'","gender":"'+ this.state.gender+ '","nationality":"'+ this.state.nationality+ '"}';
            axios.post(`http://localhost:8080/person/`, { newPerson })
            .then(res => {
                console.log(res);
                console.log(res.data);
            }).catch( err => {
                if(err.response.data.message)
                    alert(err.response.data.message);
            });
            
        } catch (error) {
            alert(error);

        }
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
                                <Table.Cell width={10}> <Input id="lantName" fluid placeholder='Last Name' className="input-form" type="text" value={this.state.lastName} onChange={this.handleLastNameChange} /></Table.Cell>
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
                    <Button className="submit_button" basic floated='right' type="submit" content="Add" />
                </form>
            </div>
        );
    }
}

export default PersonForm;