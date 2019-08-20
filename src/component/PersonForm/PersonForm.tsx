import React, { Component } from 'react';
import {Input, Select, Form, Label} from 'semantic-ui-react';
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
                    <Form.Field className="form_field">
                        <Label className="label_field">Name:</Label>
                        <Input className="input-form" type="text" value={this.state.name} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field className="form_field">
                        <Label className="label_field">Last Name:</Label>
                        <Input className="input-form" type="text" value={this.state.name} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field className="form_field">
                        <Label className="label_field">Document Type:</Label>
                        <Select className="input-form" options={this.state.documentTypeList} type="text" value={this.state.name} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field className="form_field">
                        <Label className="label_field">Document:</Label>
                        <Input className="input-form" type="text" value={this.state.name} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field className="form_field">
                        <Label className="label_field">Date of Bith:</Label>
                        <Label className="label_date ">
                        <DateInput className="date-form" name="date"
                            placeholder="Date of Bith"
                            iconPosition="right"
                            onChange={this.handleChange} 
                            value={this.state.dateOfBirth} />
                        </Label>
                    </Form.Field>
                    <Form.Field className="form_field">
                        <Label className="label_field">Gender:</Label>
                        <Select className="input-form" options={this.state.genderList} type="text" value={this.state.name} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field className="form_field">
                        <Label className="label_field">Nationality: </Label>
                        <Select className="input-form" options={this.state.nationalityList} type="text" value={this.state.name} onChange={this.handleChange} />
                    </Form.Field>
                    <Input type="submit" value="Add" />
                </form>
            </div>
        );
    }
}

export default PersonForm;