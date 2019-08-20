import React, { Component } from 'react';
import {Input, Select, Form, Label, Table, Button} from 'semantic-ui-react';
import {DateInput} from 'semantic-ui-calendar-react';

type PersonFormProps = {
    findAllItems: any
}
type PersonFormStatus = {
    name: any,
    lantName: any,
    documentType: any,
    document: any,
    documentId: any,
    dateOfBirth: any,
    gender: any,
    nationality: any,
    genderList: any,
    nationalityList: any,
    documentTypeList: any,
}

class PersonForm extends React.Component<PersonFormProps, PersonFormStatus> {
    constructor(props: PersonFormProps){
        super(props);
        this.state = {name: '',lantName: '',documentType: '',document: '',documentId: '',dateOfBirth: "",gender: '',nationality: '',
                        genderList: [{}],nationalityList: [{}],documentTypeList: [{}],};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event:any){
        this.setState({name: event.target.value});

    }

    handleSubmit(event:any){
        alert('A name was submitted: ' + this.state.name);
        event.preventDefault();
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
                                <Table.Cell width={10}> <Input fluid className="input-form" type="text" value={this.state.name} onChange={this.handleChange} /></Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell width={2}>Last Name:</Table.Cell>
                                <Table.Cell width={10}> <Input fluid className="input-form" type="text" value={this.state.name} onChange={this.handleChange} /></Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell width={2}>Document Type:</Table.Cell>
                                <Table.Cell width={10}><Select fluid className="input-form" options={this.state.documentTypeList} type="text" value={this.state.name} onChange={this.handleChange} /></Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell width={2}>Document:</Table.Cell>
                                <Table.Cell width={10}><Input fluid className="input-form" type="text" value={this.state.name} onChange={this.handleChange} /></Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell width={2}>Date of Birth:</Table.Cell>
                                <Table.Cell width={10}><DateInput fluid className="date-form" name="date"
                                    placeholder="Date of Birth"
                                    iconPosition="right"
                                    onChange={this.handleChange} 
                                    value={this.state.dateOfBirth} />
                                </Table.Cell>
                            </Table.Row>
                            
                            <Table.Row>
                                <Table.Cell width={2}>Gender:</Table.Cell>
                                <Table.Cell width={10}><Select fluid className="input-form" options={this.state.genderList} type="text" value={this.state.name} onChange={this.handleChange} /></Table.Cell>
                            </Table.Row>

                            <Table.Row>
                                <Table.Cell width={2}>Nationality:</Table.Cell>
                                <Table.Cell width={10}><Select fluid className="input-form" options={this.state.nationalityList} type="text" value={this.state.name} onChange={this.handleChange} /></Table.Cell>
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